import { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Popover,
    Stack,
} from '@mui/material';
import {
    Person,
    Add as AddIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import { PassengerCounts } from '../store/atoms';

interface PassengerTypeConfig {
    key: keyof PassengerCounts;
    label: string;
    description?: string;
    min: number;
    max: number;
}

const passengerTypes: PassengerTypeConfig[] = [
    { key: 'adults', label: 'Adults', min: 1, max: 9 },
    {
        key: 'children',
        label: 'Children',
        description: 'Aged 2-11',
        min: 0,
        max: 9,
    },
    {
        key: 'infantsInSeat',
        label: 'Infants',
        description: 'In seat',
        min: 0,
        max: 9,
    },
];

interface PassengerCountProps {
    value: PassengerCounts;
    onChange: (value: PassengerCounts) => void;
    className?: string;
}

export default function PassengerCount({
    value,
    onChange,
}: PassengerCountProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getTotalPassengers = () => {
        return value.adults + value.children + value.infantsInSeat;
    };

    const handlePassengerChange = (
        type: keyof PassengerCounts,
        increment: boolean,
    ) => {
        const newValue = { ...value };
        if (increment) {
            const config = passengerTypes.find((pt) => pt.key === type);
            if (config && newValue[type] < config.max) {
                newValue[type]++;
            }
        } else {
            const config = passengerTypes.find((pt) => pt.key === type);
            if (config && newValue[type] > config.min) {
                newValue[type]--;
            }
        }
        onChange(newValue);
    };

    return (
        <Box>
            <Box
                onClick={handleOpen}
                sx={{
                    cursor: 'pointer',
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    borderRadius: 0,
                    border: 'none',
                    borderColor: open ? '#1a73e8' : 'transparent',
                    borderBottom: open ? '2px solid #1a73e8' : 'none',
                    '&:hover': {
                        borderColor: '#dadce0',
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
                }}
            >
                <Person sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
                <Typography
                    sx={{
                        fontSize: '0.875rem',
                        color: 'text.primary',
                    }}
                >
                    {getTotalPassengers()} passenger{getTotalPassengers() !== 1 && 's'}
                </Typography>
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        width: 300,
                        mt: 1,
                        p: 2,
                    },
                }}
            >
                <Stack spacing={2}>
                    {passengerTypes.map((type) => (
                        <Box
                            key={type.key}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography variant="body1">{type.label}</Typography>
                                {type.description && (
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        {type.description}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => handlePassengerChange(type.key, false)}
                                    disabled={value[type.key] <= type.min}
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={{ minWidth: 20, textAlign: 'center' }}>
                                    {value[type.key]}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => handlePassengerChange(type.key, true)}
                                    disabled={value[type.key] >= type.max}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Popover>
        </Box>
    );
}
