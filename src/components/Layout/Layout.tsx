import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import Diversity3Icon from '@mui/icons-material/Diversity3';

import {  Link, useLocation } from 'react-router-dom'
import { WrapperProps } from '../../types/type';
import NavBar from '../NavBar/NavBar';
import sideMenu  from '../../SideMenu/SideMenu'
import { ListItemText, Typography } from '@mui/material';
import { useThemeStore } from '../../store/useThemeStore';
import BottomDrawer from '../BottomDrawer/BottomDrawer';
import { useBottomDrawerStore } from '../../store/useBottomDrawerStore';

const drawerWidth = 240;
const miniDrawerWidth = 60; // Ancho cuando está cerrado

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  width: `calc(100% - ${open ? drawerWidth : miniDrawerWidth}px)`, // Ajusta ancho en vez de usar margin
}));

const DrawerStyled = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : miniDrawerWidth,
  flexShrink: 0,    
  whiteSpace: 'nowrap',
  overflowX: 'hidden',  
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : miniDrawerWidth,    
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    borderRight: 'none',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',  
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Layout: React.FC<WrapperProps> = ({ children }) => {

  const theme = useTheme();
  const { darkMode } = useThemeStore()
  const location = useLocation();
  const { openBottomDrawerManually, closeBottomDrawer } = useBottomDrawerStore(); 

  const [open, setOpen] = React.useState(false);



  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };


  React.useEffect(() => {
    if (location.pathname === '/addevento') {
      openBottomDrawerManually(); // Abre el Drawer de Bottom
    } else {
      closeBottomDrawer(); // Cierra el Drawer si estamos en otra ruta
    }
  }, [location, openBottomDrawerManually, closeBottomDrawer]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar handleDrawerOpen={handleDrawerToggle} open={open} />
      
      {/* Drawer ajustado */}
      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader> 
              <Typography variant="h6" noWrap component="div">
                  <Diversity3Icon sx={{position:'relative',top:'4px',marginRight:'5px', opacity: open ? 1 : 0}}/> 
                  Nuestro Calendario
              </Typography>

             <IconButton onClick={handleDrawerToggle}>
                {open ? <ChevronLeftIcon sx={{ color: theme.palette.text.primary }} /> : <ChevronRightIcon sx={{ color: theme.palette.text.primary }} />}
              </IconButton>

        </DrawerHeader>

        {
          darkMode 
          ? <Divider />
          : <br/>
        }

        <List>
          {sideMenu.map((menu, index) => {
            const IconComponent = menu.icono;
            return (
              <React.Fragment key={index + menu.nombre}>
                  { 
                   menu.nombre ==='Divider' 
                   ? darkMode ? <Divider key={index + menu.nombre}/> : <br key={index + menu.nombre}/>
                   : <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        component={Link}
                        to={menu.link}
                        sx={{
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          color: theme.palette.text.primary,                          
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: theme.palette.text.primary }}>
                          <IconComponent />
                        </ListItemIcon>
                        <ListItemText primary={menu.nombre} sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap', color: theme.palette.text.primary, fontSize:'30px'}} />
                      </ListItemButton>
                     </ListItem>
                   }

              </React.Fragment>
              

            );
          })}
        </List>
      </DrawerStyled>

      {/* Contenido principal ajustado */}
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      <BottomDrawer />
    </Box>
  );
};

export default Layout;