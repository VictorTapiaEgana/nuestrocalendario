import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid' 
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'


import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import esLocale from '@fullcalendar/core/locales/es';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { EventInput } from '@fullcalendar/core/index.js';
import { useThemeStore } from '../../store/useThemeStore'

//extraccion del Tipo de fullcalendar
type DateClickArg = Parameters<NonNullable<React.ComponentProps<typeof FullCalendar>['dateClick']>>[0];
type DatesSetArg = Parameters<NonNullable<React.ComponentProps<typeof FullCalendar>['datesSet']>>[0];

const Calendario = () => {

    const [ eventlist, setEventList ] = useState<EventInput[]>([]);
    const [currentTitle, setCurrentTitle] = useState('');
    const [ isMobile , setIsMobile ] = useState<boolean>()  
    const calendarRef = useRef<FullCalendar>(null);

    const { darkMode } = useThemeStore()

    useEffect(() => {
        const handleResize = () => {

          const mobile = window.innerWidth < 500;
          setIsMobile(mobile);
      
          const newView = mobile ? 'timeGridDay' : 'dayGridMonth';
          calendarRef.current?.getApi().changeView(newView);
          
        };
      
        window.addEventListener("resize", handleResize);
        handleResize();
      
        return () => window.removeEventListener("resize", handleResize);
    }, []);


   useEffect(()=>{   

    const  newArray:EventInput[] = []

    newArray.push({ title: 'event 1', date: '2025-04-01' })
    
    newArray.push({ title: 'event 2', 
                    date:  '2025-04-02',
                    start: '2025-04-01T12:30:00',
                    end:   '2025-04-01T13:30:00' })    

    setEventList(newArray)

   },[])

    //BOTONES PERSONALIZADOS
    const handleToday = () => {
      calendarRef.current?.getApi().today();
     };
      
    const handlePrev = () => {
       calendarRef.current?.getApi().prev();
    };
      
    const handleNext = () => {
       calendarRef.current?.getApi().next();
    };
      
    const changeView = (viewName: string) => {
       calendarRef.current?.getApi().changeView(viewName);
    };

    const handleDatesSet = (arg: DatesSetArg) => {
        setCurrentTitle(arg.view.title);
    };

    //CLICK EN LA FECHA  
    const handleDateClick = (arg:DateClickArg) => {
        alert(arg.dateStr)
    }

   const EstiloBotones = {
      color: darkMode ? 'black' : 'white',
      backgroundColor: darkMode  ? '#F5F5F5': 'default'
   }


  return (

     <Box sx={{margin:{xs:'-20px',sm:'0'}}}>
            <Typography variant='h1' fontWeight={800} textAlign={'center'} >Mis eventos</Typography>

            <Box sx={{ display:'flex',
                       justifyContent:'space-between', 
                       alignItems:'center', 
                       flexDirection:{xs:'column',sm:'row'}}}>

                <Box sx={{display:{xs:'none',sm:'flex'},gap:'5px'}}>
                     <Button variant='contained' sx={EstiloBotones} onClick={handlePrev} className="">←</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={handleToday} className="">Hoy</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={handleNext} className="">→</Button>
                </Box>

                <Box> 
                     <Typography sx={{fontWeight:'800'}}>
                        {currentTitle.toUpperCase()}
                     </Typography>
                </Box>

                <Box sx={{display:'flex',gap:'5px'}}>
                     <Button variant='contained' sx={EstiloBotones} onClick={() => changeView('timeGridDay')} >Día</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={() => changeView('timeGridWeek')} >Semana</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={() => changeView('dayGridMonth')} >Mes</Button>
                </Box>

            </Box>

            <FullCalendar
                        plugins={[ dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin ]}
                        weekends= {true}
                        ref={calendarRef}
                        initialView= {isMobile ? 'timeGridDay' : 'dayGridMonth'} 
                        timeZone="local"                   
                        locale={esLocale}    
                        datesSet={handleDatesSet}             
                        height={'100vh'}                                     
                        headerToolbar={{
                                        left:'', 
                                        center: '' ,
                                        right:''           
                                      }}
                        // right: 'dayGridMonth,timeGridWeek,timeGridDay' 
                        dateClick={handleDateClick}
                        events={eventlist}
                        // eventContent={(arg) => {
                        //     return {
                        //       domNodes: [
                        //         // Puedes usar un ícono FontAwesome, SVG o cualquier JSX convertido a DOM
                        //         Object.assign(document.createElement('div'), {
                        //           innerHTML: `<span style="color:green;">🟢</span> <strong>${arg.event.title}</strong>`,
                        //         }),
                        //       ],
                        //     };
                        //   }}
            />

     </Box>

  )

}

export default Calendario