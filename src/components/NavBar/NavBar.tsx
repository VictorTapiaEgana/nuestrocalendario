import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled  } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { NavBarProps } from "../../types/type";
import { useThemeStore } from "../../store/useThemeStore";

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

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
  return (
    <AppBar position="fixed" open={open} sx={{borderRadius:'0'}}>
        <Toolbar>
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
        <Box sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
            <Typography variant="h6" noWrap component="div">
                <Diversity3Icon sx={{position:'relative',top:'4px',marginRight:'5px'}}/> 
                Nuestro Calendario
            </Typography>

            <Button onClick={()=>toggleTheme()}> 
                { darkMode ? <DarkModeOutlinedIcon sx={{color:'white'}}/> : <LightModeOutlinedIcon  sx={{color:'white'}}/> } 
            </Button>

        </Box>   
        </Toolbar>
  </AppBar>
  )
}

export default NavBar