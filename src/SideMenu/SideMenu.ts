import { sideMenuProps } from "../types/type"

import HomeIcon from '@mui/icons-material/Home';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';
// import EventBusyIcon from '@mui/icons-material/EventBusy';
import LogoutIcon from '@mui/icons-material/Logout';
import EventNoteIcon from '@mui/icons-material/EventNote';

import Divider from '@mui/material/Divider';

const sideMenu:sideMenuProps[] = [
                                    {
                                        nombre: 'Inicio',
                                        icono : HomeIcon,
                                        link:'/inicio'
                                    },
                                    {
                                        nombre:'Calendario',
                                        icono:EventNoteIcon,
                                        link:'/calendario'
                                    },

                                    // {
                                    //     nombre:'Eliminar Evento',
                                    //     icono:EventBusyIcon,
                                    //     link:'/delevento'
                                    // }

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