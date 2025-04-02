import { Avatar, Box, Button, IconButton, Toolbar } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled  } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { NavBarProps } from "../../types/type";
import { useThemeStore } from "../../store/useThemeStore";

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useUserStore } from "../../store/useUserStore";
import { useBottomDrawerStore } from "../../store/useBottomDrawerStore";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));
  
const NavBar: React.FC<NavBarProps> = ({ handleDrawerOpen, open }) => {

  const { darkMode, toggleTheme } = useThemeStore();
  const { openBottomDrawerManually } = useBottomDrawerStore();
  const { usuario } = useUserStore()

  return (

    <AppBar position="fixed" open={open} sx={{borderRadius:'0',boxShadow:'none'}}>

        <Toolbar sx={{ backgroundColor: darkMode ? 'default' : 'white' }} >

          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[ { mr: 2 },
                              open && { display: 'none' },
              ]}>
              <MenuIcon />
          </IconButton>

          <Box sx={{display:'flex', justifyContent:'flex-end', width:'100%'}}>

             
              {/* <Typography variant="h6" noWrap component="div">
                  <Diversity3Icon sx={{position:'relative',top:'4px',marginRight:'5px'}}/> 
                  Nuestro Calendario
              </Typography> */}

              {
                usuario?.rol === 'admin' 
                && <Button variant="contained" onClick={openBottomDrawerManually}>+ Nuevo</Button>
                
              }  
              

              <Button onClick={()=>toggleTheme()}> 
                  { darkMode ? <DarkModeOutlinedIcon sx={{color:'white'}}/> : <LightModeOutlinedIcon/> } 
              </Button>

              {
                usuario?.avatar 
                ? <Avatar src={usuario.avatar} alt={usuario.nombre}></Avatar>
                : <Avatar>U</Avatar>
              }
            

          </Box>   

        </Toolbar>

  </AppBar>

  )

}

export default NavBar