import { sideMenuProps } from "../types/type"

import HomeIcon from '@mui/icons-material/Home';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';

const sideMenu:sideMenuProps[] =[
                    {
                        nombre: 'Inicio',
                        icono : HomeIcon,
                        link:'/'
                    },
                    {
                        nombre:'Agregar Evento',
                        icono:EventAvailableIcon,
                        link:'/addevento'
                    },
                    {
                        nombre:'Eliminar Evento',
                        icono:EventBusyIcon,
                        link:'/delevento'
                    },
                    {
                        nombre:'Divider',
                        icono:Divider ,
                        link:''
                    },
                    {
                        nombre:'Salir',
                        icono:LogoutIcon,
                        link:'/salir'
                    }
                ]

export default sideMenu