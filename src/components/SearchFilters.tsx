import React from 'react';
import {
  Paper,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Avatar,
} from '@mui/material';
import { SearchResponse } from '../store/flightsAtom';

interface FiltersState {
  stops: {
    direct: boolean;
    oneStop: boolean;
    twoOrMore: boolean;
  };
  priceRange: [number, number];
  airlines: Record<string, boolean>;
}

interface SearchFiltersProps {
  filters: FiltersState;
  flightResults: SearchResponse;
  onStopFilterChange: (type: keyof FiltersState['stops']) => void;
  onAirlineFilterChange: (airline: string) => void;
  onPriceRangeChange: (event: Event, newValue: number | number[]) => void;
}

const SearchFilters = React.memo(({
  filters,
  flightResults,
  onStopFilterChange,
  onAirlineFilterChange,
  onPriceRangeChange,
}: SearchFiltersProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Stops</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={filters.stops.direct} onChange={() => onStopFilterChange('direct')} />}
            label={`Direct ${flightResults.filterStats.stopPrices.direct.formattedPrice}`}
          />
          <FormControlLabel
            control={<Checkbox checked={filters.stops.oneStop} onChange={() => onStopFilterChange('oneStop')} />}
            label={`1 Stop ${flightResults.filterStats.stopPrices.one.formattedPrice}`}
          />
          <FormControlLabel
            control={<Checkbox checked={filters.stops.twoOrMore} onChange={() => onStopFilterChange('twoOrMore')} />}
            label={`2+ Stops ${flightResults.filterStats.stopPrices.twoOrMore.formattedPrice}`}
          />
        </FormGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={onPriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={50}
        />
        <Typography variant="body2" color="text.secondary">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>Airlines</Typography>
        <FormGroup>
          {flightResults.filterStats.carriers.map((carrier) => (
            <FormControlLabel
              key={carrier.id}
              control={
                <Checkbox
                  checked={filters.airlines[carrier.name]}
                  onChange={() => onAirlineFilterChange(carrier.name)}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={carrier.logoUrl}
                    alt={carrier.name}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="body2">{carrier.name}</Typography>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Paper>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters; 