import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';

interface Destination {
  id: number;
  city: string;
  country: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    city: 'Istanbul',
    country: 'Turkey',
    image: 'https://source.unsplash.com/featured/?istanbul,city',
  },
  {
    id: 2,
    city: 'Brussels',
    country: 'Belgium',
    image: 'https://source.unsplash.com/featured/?brussels,city',
  },
  {
    id: 3,
    city: 'Paris',
    country: 'France',
    image: 'https://source.unsplash.com/featured/?paris,city',
  },
  {
    id: 4,
    city: 'Ankara',
    country: 'Turkey',
    image: 'https://source.unsplash.com/featured/?ankara,city',
  },
];

export default function PopularDestinations() {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          mb: 3,
          color: '#202124',
          fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
        }}
      >
        Popular destinations
      </Typography>
      <Grid container spacing={2}>
        {destinations.map((destination) => (
          <Grid item xs={12} sm={6} md={3} key={destination.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: 3,
                border: '1px solid #dadce0',
                boxShadow: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={destination.image}
                alt={destination.city}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#202124',
                    mb: 0.5,
                  }}
                >
                  {destination.city}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#5f6368', fontSize: '0.875rem' }}
                >
                  {destination.country}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 