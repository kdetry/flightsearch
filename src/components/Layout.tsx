import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { themeModeAtom } from '../store/atoms';

export default function Layout() {
  const [mode] = useAtom(themeModeAtom);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: mode === 'light' ? 'background.default' : 'background.paper',
      }}
    >
      <Outlet />
    </Box>
  );
} 