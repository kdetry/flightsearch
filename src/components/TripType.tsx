import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material';
import {
  CompareArrows,
  ArrowRightAlt,
} from '@mui/icons-material';
import { FlightSearch } from '../store/atoms';

interface TripTypeOption {
  value: FlightSearch['tripType'];
  label: string;
  icon: JSX.Element;
}

const tripTypeOptions: TripTypeOption[] = [
  {
    value: 'roundTrip',
    label: 'Round trip',
    icon: <CompareArrows sx={{ fontSize: 20 }} />,
  },
  {
    value: 'oneWay',
    label: 'One way',
    icon: <ArrowRightAlt sx={{ fontSize: 20 }} />,
  },
];

interface TripTypeProps {
  value: FlightSearch['tripType'];
  onChange: (value: FlightSearch['tripType']) => void;
  className?: string;
}

export default function TripType({ value, onChange, className }: TripTypeProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as FlightSearch['tripType']);
  };

  const selectedOption = tripTypeOptions.find((option) => option.value === value);

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
          pl: 0,
          border: 0,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
          borderRadius: 0,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1a73e8',
          borderBottom: '2px solid #1a73e8',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          backgroundColor: '#f8f9fa',
        },
      }}
      renderValue={() => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, zIndex: 2 }}>
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
    >
      {tripTypeOptions.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minHeight: 'auto',
            py: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
            }}
          >
            {option.label}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
