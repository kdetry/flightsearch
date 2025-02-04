import React, { useState, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Stack,
  Avatar,
} from '@mui/material';
import { format } from 'date-fns';
import { flightSearchAtom } from '../store/atoms';
import { flightsAtom, SearchResponse, FlightItinerary } from '../store/flightsAtom';
import FlightCard from '../components/FlightCard';
import SearchFilters from '../components/SearchFilters';

const SearchResultsPage = () => {
  const searchData = useAtomValue(flightSearchAtom);
  const flightResults = useAtomValue(flightsAtom);

  const [filters, setFilters] = useState({
    stops: {
      direct: true,
      oneStop: true,
      twoOrMore: true,
    },
    priceRange: [0, 2000] as [number, number],
    airlines: {} as Record<string, boolean>,
  });

  if (!flightResults) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">No flights found</Typography>
      </Container>
    );
  }

  const airlines = flightResults.filterStats.carriers.reduce((acc: Record<string, boolean>, carrier) => {
    acc[carrier.name] = true;
    return acc;
  }, {});

  const handleStopFilterChange = useCallback((type: keyof typeof filters.stops) => {
    setFilters(prev => ({
      ...prev,
      stops: {
        ...prev.stops,
        [type]: !prev.stops[type],
      },
    }));
  }, []);

  const handleAirlineFilterChange = useCallback((airline: string) => {
    setFilters(prev => ({
      ...prev,
      airlines: {
        ...prev.airlines,
        [airline]: !prev.airlines[airline],
      },
    }));
  }, []);

  const handlePriceRangeChange = useCallback((_event: Event, newValue: number | number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: newValue as [number, number],
    }));
  }, []);

  const filteredFlights = React.useMemo(() => {
    return flightResults.itineraries.filter((flight: FlightItinerary) => {
      const stopCount = flight.legs[0].stopCount;
      if (stopCount === 0 && !filters.stops.direct) return false;
      if (stopCount === 1 && !filters.stops.oneStop) return false;
      if (stopCount >= 2 && !filters.stops.twoOrMore) return false;

      if (flight.price.raw < filters.priceRange[0] || flight.price.raw > filters.priceRange[1]) return false;

      const airline = flight.legs[0].carriers.marketing[0].name;
      if (Object.keys(filters.airlines).length > 0 && !filters.airlines[airline]) return false;

      return true;
    });
  }, [flightResults.itineraries, filters]);

  const searchSummary = React.useMemo(() => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        {searchData.from.code} → {searchData.to.code}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {format(searchData.departureDate!, 'EEE, MMM d')}
        {searchData.returnDate && ` - ${format(searchData.returnDate, 'EEE, MMM d')}`}
        {' • '}
        {searchData.passengers.adults + searchData.passengers.children + searchData.passengers.infantsInSeat} passengers
        {' • '}
        {searchData.seatType}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {filteredFlights.length} flights found
      </Typography>
    </Box>
  ), [searchData, filteredFlights.length]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <SearchFilters
            filters={filters}
            flightResults={flightResults}
            onStopFilterChange={handleStopFilterChange}
            onAirlineFilterChange={handleAirlineFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          {searchSummary}
          <Stack spacing={2}>
            {filteredFlights.map((flight: FlightItinerary) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResultsPage; 