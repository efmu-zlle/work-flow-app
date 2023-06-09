import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/svg/logo.svg';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import deepOrange from '@mui/material/colors/deepOrange';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import { User } from '../interfaces/user';

function Header() {
  const [{ email, username }, _] = useLocalStorage<User>('currentUser', null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundImage:
          'linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)',
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
              <CardMedia component="img" src={logo}></CardMedia>
            </IconButton>
          </Box>
          <Box
            component="nav"
            sx={{ flexGrow: 1.2, display: { xs: 'none', sm: 'block' } }}>
            {['home', 'team'].map((text, index) => (
              <MuiLink
                key={index}
                component={RouterLink}
                to={`/${text}`}
                color="text.primary"
                variant="button"
                sx={{
                  my: 1,
                  mx: 2,
                  fontWeight: 600,
                  textDecoration: 'none',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '0%',
                    height: 2,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    transition: 'all 0.3s ease-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                    right: 'initial',
                    left: 0,
                  },
                }}>
                {text}
              </MuiLink>
            ))}
          </Box>
          <Box>
            <Tooltip title={`${email}`}>
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  sx={{ bgcolor: deepOrange[500], textTransform: 'uppercase' }}>
                  {username[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
