import {
    Select,
    MenuItem,
    SelectChangeEvent,
    Box,
    Typography,
} from '@mui/material';
import {
    AirlineSeatReclineNormal,
    AirlineSeatReclineExtra,
    AirlineSeatFlat,
    AirlineSeatFlatAngled,
} from '@mui/icons-material';
import { SeatType as SeatTypeEnum } from '../store/atoms';

interface SeatTypeOption {
    value: SeatTypeEnum;
    label: string;
    icon: JSX.Element;
    description: string;
}

const seatTypeOptions: SeatTypeOption[] = [
    {
        value: 'economy',
        label: 'Economy',
        icon: <AirlineSeatReclineNormal sx={{ fontSize: 20 }} />,
        description: 'Standard seating with basic amenities',
    },
    {
        value: 'premiumEconomy',
        label: 'Premium Economy',
        icon: <AirlineSeatReclineExtra sx={{ fontSize: 20 }} />,
        description: 'Extra legroom and enhanced service',
    },
    {
        value: 'business',
        label: 'Business',
        icon: <AirlineSeatFlatAngled sx={{ fontSize: 20 }} />,
        description: 'Premium service with lie-flat seats',
    },
    {
        value: 'first',
        label: 'First',
        icon: <AirlineSeatFlat sx={{ fontSize: 20 }} />,
        description: 'Ultimate luxury and personalized service',
    },
];

interface SeatTypeProps {
    value: SeatTypeEnum;
    onChange: (value: SeatTypeEnum) => void;
    className?: string;
}

export default function SeatType({ value, onChange, className }: SeatTypeProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value as SeatTypeEnum);
    };

    const selectedOption = seatTypeOptions.find((option) => option.value === value);

    return (
        <Select
            value={value}
            onChange={handleChange}
            className={className}
            sx={{
                height: 42,
                '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    py: 1,
                    pl: 2,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                    borderRadius: 0,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1a73e8',
                    borderBottom: '2px solid #1a73e8',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1a73e8',
                    borderBottom: '2px solid #1a73e8',
                },
            }}
            renderValue={() => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {selectedOption?.icon}
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            color: 'text.primary',
                        }}
                    >
                        {selectedOption?.label}
                    </Typography>
                </Box>
            )}
            MenuProps={{
                PaperProps: {
                    sx: {
                        maxHeight: 300,
                        mt: 1,
                    },
                },
            }}
        >
            {seatTypeOptions.map((option) => (
                <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 0.5,
                        py: 1.5,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.icon}
                        <Typography sx={{ fontSize: '0.875rem' }}>
                            {option.label}
                        </Typography>
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', pl: 3.5 }}
                    >
                        {option.description}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
    );
}
