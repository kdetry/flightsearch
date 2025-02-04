import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { FlightItinerary } from '../store/flightsAtom';

interface FlightCardProps {
  flight: FlightItinerary;
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const FlightCard = React.memo(({ flight }: FlightCardProps) => {
  return (
    <Card>
      <CardContent>
        {flight.legs.map((leg, index) => (
          <Box key={leg.id}>
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={leg.carriers.marketing[0].logoUrl}
                    alt={leg.carriers.marketing[0].name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Typography variant="body2">
                    {leg.carriers.marketing[0].name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6">{format(new Date(leg.departure), 'HH:mm')}</Typography>
                    <Typography variant="body2" color="text.secondary">{leg.origin.displayCode}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatDuration(leg.durationInMinutes)}
                    </Typography>
                    <Divider>
                      <Chip
                        label={leg.stopCount === 0 ? 'Direct' : `${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
                        size="small"
                        color={leg.stopCount === 0 ? 'success' : 'default'}
                      />
                    </Divider>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6">{format(new Date(leg.arrival), 'HH:mm')}</Typography>
                    <Typography variant="body2" color="text.secondary">{leg.destination.displayCode}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'right' }}>
                {index === 0 && (
                  <Typography variant="h6" color="primary">
                    {flight.price.formatted}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
});

FlightCard.displayName = 'FlightCard';

export default FlightCard; 