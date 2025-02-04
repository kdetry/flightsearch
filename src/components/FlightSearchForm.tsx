import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Box, Button, Grid2 as Grid, Stack, useTheme } from '@mui/material';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { searchAirports, searchFlights, Airport } from '../services/api';
import {
    fromAtom,
    toAtom,
    tripTypeAtom,
    departureDateAtom,
    returnDateAtom,
    passengersAtom,
    seatTypeAtom,
    LocationValue,
} from '../store/atoms';
import PassengerSelect from './PassengerSelect';
import SeatTypeSelect from './SeatTypeSelect';
import TripTypeSelect from './TripTypeSelect';
import { format } from 'date-fns';
import { flightsAtom } from '../store/flightsAtom';

export default function FlightSearchForm() {
    const theme = useTheme();
    const navigate = useNavigate();
    const tripType = useAtomValue(tripTypeAtom);
    const [from, setFrom] = useAtom(fromAtom);
    const [to, setTo] = useAtom(toAtom);
    const [departureDate, setDepartureDate] = useAtom(departureDateAtom);
    const [returnDate, setReturnDate] = useAtom(returnDateAtom);
    const passengers = useAtomValue(passengersAtom);
    const seatType = useAtomValue(seatTypeAtom);
    const setFlights = useSetAtom(flightsAtom);

    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [fromOptions, setFromOptions] = useState<Airport[]>([]);
    const [toOptions, setToOptions] = useState<Airport[]>([]);
    const [fromLoading, setFromLoading] = useState(false);
    const [toLoading, setToLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedFromInput = useDebounce(fromInput, 300);
    const debouncedToInput = useDebounce(toInput, 300);

    useEffect(() => {
        const fetchFromAirports = async () => {
            if (debouncedFromInput.length >= 2) {
                setFromLoading(true);
                try {
                    const response = await searchAirports(debouncedFromInput);
                    setFromOptions(response.data);
                } catch (error) {
                    console.error('Error fetching departure airports:', error);
                    setFromOptions([]);
                }
                setFromLoading(false);
            } else {
                setFromOptions([]);
            }
        };

        fetchFromAirports();
    }, [debouncedFromInput]);

    useEffect(() => {
        const fetchToAirports = async () => {
            if (debouncedToInput.length >= 2) {
                setToLoading(true);
                try {
                    const response = await searchAirports(debouncedToInput);
                    setToOptions(response.data);
                } catch (error) {
                    console.error('Error fetching arrival airports:', error);
                    setToOptions([]);
                }
                setToLoading(false);
            } else {
                setToOptions([]);
            }
        };

        fetchToAirports();
    }, [debouncedToInput]);

    const handleFromChange = (_event: any, value: Airport | null) => {
        if (value) {
            setFrom({ code: value.code, skyId: value.skyId });
            setFromInput(value.name);
        } else {
            setFrom({ code: '', skyId: '' });
            setFromInput('');
        }
    };

    const handleToChange = (_event: any, value: Airport | null) => {
        if (value) {
            setTo({ code: value.code, skyId: value.skyId });
            setToInput(value.name);
        } else {
            setTo({ code: '', skyId: '' });
            setToInput('');
        }
    };

    const handleSwapLocations = () => {
        const tempFrom = { ...from };
        const tempFromInput = fromInput;
        setFrom(to);
        setFromInput(toInput);
        setTo(tempFrom);
        setToInput(tempFromInput);
    };

    const handleSearch = async () => {
        if (!from.code || !to.code || !departureDate || (tripType === 'roundTrip' && !returnDate)) {
            return;
        }

        setIsSearching(true);
        try {
            const response = await searchFlights({
                originSkyId: from.skyId,
                destinationSkyId: to.skyId,
                originEntityId: from.code,
                destinationEntityId: to.code,
                date: format(departureDate, 'yyyy-MM-dd'),
                ...(returnDate && { returnDate: format(returnDate, 'yyyy-MM-dd') }),
                cabinClass: seatType,
                adults: passengers.adults,
                ...(passengers.children > 0 && { children: passengers.children }),
                ...(passengers.infantsInSeat > 0 && { infantsInSeat: passengers.infantsInSeat }),
                sortBy: 'best',
                currency: 'USD',
                market: 'en-US',
                countryCode: 'US'
            });

            if (response.status) {
                setFlights(response.data);
                navigate(`/search`);
            } else {
                // Handle error case
                console.error('Failed to search flights:', response.message);
            }
        } catch (error) {
            console.error('Error searching flights:', error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <Box component="form" noValidate sx={{ mt: 3, boxShadow: theme.shadows[2], borderRadius: 3, p: 2, pb: 3 }}>
            <Stack spacing={2}>
                <Grid container spacing={0}>
                    <Grid  size={{xs: 12, md:4, lg:2}}>
                        <PassengerSelect />
                    </Grid>
                    <Grid  size={{xs: 12, md:4, lg:2}}>
                        <SeatTypeSelect />
                    </Grid>
                    <Grid size={{xs: 12, md:4, lg:2}}>
                        <TripTypeSelect />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid container  size={{xs: 12, md:12, lg:7}}>
                        <Grid size={6} style={{ display: 'flex', flex: 1 }}>
                            <Autocomplete
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                }}
                                value={fromOptions.find((option) => option.code === from.code) || null}
                                onChange={handleFromChange}
                                inputValue={fromInput}
                                onInputChange={(event, newInputValue, reason) => {
                                    if (reason === 'input') {
                                        setFromInput(newInputValue);
                                    }
                                }}
                                options={fromOptions}
                                getOptionLabel={(option) => option.name}
                                loading={fromLoading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="From"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {fromLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <Button
                                onClick={handleSwapLocations}>⇄</Button>
                            <Autocomplete
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                }}
                                value={toOptions.find((option) => option.code === to.code) || null}
                                onChange={handleToChange}
                                inputValue={toInput}
                                onInputChange={(event, newInputValue, reason) => {
                                    if (reason === 'input') {
                                        setToInput(newInputValue);
                                    }
                                }}
                                options={toOptions}
                                getOptionLabel={(option) => option.name}
                                loading={toLoading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="To"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {toLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container size={{xs: 12, md:12, lg:5}}>


                        <Grid size={6}>
                            <DatePicker
                                label="Departure"
                                value={departureDate}
                                onChange={(newValue) => setDepartureDate(newValue)}
                                format="MM/dd/yyyy"
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={6}>
                            <DatePicker
                                label="Return"
                                value={returnDate}
                                onChange={(newValue) => setReturnDate(newValue)}
                                format="MM/dd/yyyy"
                                disabled={tripType === 'oneWay'}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </Stack>
            <Button
                variant="contained"
                onClick={handleSearch}
                disabled={!from.code || !to.code || !departureDate || (tripType === 'roundTrip' && !returnDate) || isSearching}
                sx={{ position: 'absolute', margin: "auto",right: 0, left: 0, width: 100, mt:1 }}
            >
                {isSearching ? (
                    <>
                        Searching
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    </>
                ) : (
                    'Search'
                )}
            </Button>
        </Box>
    );
} 