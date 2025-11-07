import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Button, 
  Menu, 
  MenuItem, 
  Box,
  Typography
} from '@mui/material';
import NavRoutes from './routes/router';
// import { useAuthStore } from './stores/auth';

export const App: React.FC = () => {
  const location = useLocation();
  // const { getName, logout } = useAuthStore();
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  // const isLogged = getName() !== '';
  const isLogged = false; // Temporário até implementar o store
  const isHomePage = location.pathname === '/';

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    // logout();
    handleMenuClose();
  };

  return (
    <Box className={isHomePage ? 'homeBackgroundEffect' : ''}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'transparent', 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
        elevation={4}
      >
        <Toolbar sx={{ 
          marginLeft: { xs: '20px', lg: '240px' },
          marginRight: { xs: '20px', lg: '240px' },
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'primary.main',
                fontFamily: '"Radio Canada", serif',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              SouJunior: Stars
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {isLogged && (
              <Button color="inherit" href="/onboarding">
                Onboarding
              </Button>
            )}
            
            <Button color="inherit" href="/registry">
              Registro
            </Button>
            
            <Button color="inherit" href="/search">
              Pesquise
            </Button>

            {isLogged && (
              <>
                <Button 
                  color="inherit" 
                  onClick={handleMenuOpen}
                  sx={{ fontWeight: 'semibold' }}
                >
                  {/* {getName()} */}
                  Usuário
                  <span style={{ marginLeft: 4 }}>▼</span>
                </Button>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => window.location.href = '/profile'}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ marginTop: '64px', flexGrow: 1 }}>
        <NavRoutes />
      </Box>
    </Box>
  );
};
