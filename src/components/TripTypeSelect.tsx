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
import { useAtom } from 'jotai';
import { tripTypeAtom, FlightSearch } from '../store/atoms';

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

export default function TripTypeSelect() {
  const [tripType, setTripType] = useAtom(tripTypeAtom);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTripType(event.target.value as FlightSearch['tripType']);
  };

  const selectedOption = tripTypeOptions.find((option) => option.value === tripType);

  return (
    <Select
      value={tripType}
      onChange={handleChange}
      sx={{
        height: 42,
        width: '100%',
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
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1a73e8',
          borderBottom: '2px solid #1a73e8',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          backgroundColor: '#f8f9fa',
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
          {option.icon}
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