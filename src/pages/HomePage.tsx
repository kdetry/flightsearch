import { Box, Container, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import FlightSearchForm from '../components/FlightSearchForm';
import PopularDestinations from '../components/PopularDestinations';
import { useAtom } from 'jotai';
import { themeModeAtom } from '../store/atoms';

export default function HomePage() {
  const [mode, setMode] = useAtom(themeModeAtom);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'light'
          ? '#ffffff'
          : 'linear-gradient(180deg, #1a1a1a 0%, #121212 100%)',
        pb: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          component="img"
          src={mode === 'light' ? '/flights_light.svg' : '/flights_dark.svg'}
          alt="Flights hero banner"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 0,
            opacity: 0.7,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            Flights
          </Typography>
          <IconButton
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            color="inherit"
            sx={{ 
              ml: 2,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Box>

        <FlightSearchForm />
        {/* <PopularDestinations /> */}
      </Container>
    </Box>
  );
} 