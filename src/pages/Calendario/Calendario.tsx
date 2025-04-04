import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid' 
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'


import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import esLocale from '@fullcalendar/core/locales/es';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { EventInput } from '@fullcalendar/core/index.js';

//extraccion del Tipo de fullcalendar
type DateClickArg = Parameters<NonNullable<React.ComponentProps<typeof FullCalendar>['dateClick']>>[0];

const Calendario = () => {

    const [ eventlist, setEventList ] = useState<EventInput[]>([]);

   useEffect(()=>{

    const  newArray:EventInput[] = []

    newArray.push({ title: 'event 1', date: '2025-04-01' })

    // const Hinicio = String('2025-04-01T12:30:00Z')



    newArray.push({ title: 'event 2', 
                    date: '2025-04-02',
                    start: '2025-04-01T12:30:00',
                    end: '2025-04-01T13:30:00' })    

    setEventList(newArray)

   },[])

  
    const handleDateClick = (arg:DateClickArg) => {
        alert(arg.dateStr)
    }

  return (

     <>
            <Typography variant='h1' fontWeight={800} textAlign={'center'} >Mis eventos</Typography>

            <FullCalendar
                        plugins={[ dayGridPlugin,listPlugin,timeGridPlugin, interactionPlugin ]}
                        weekends= {true}
                        initialView="dayGridMonth"     
                        timeZone="local"                   
                        locale={esLocale}                        
                        headerToolbar={{ 
                                        left: 'prev,next today',
                                        center: 'title',
                                        right: 'dayGridMonth,timeGridWeek,timeGridDay' 
                                      }}
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

     </>

  )

}

export default Calendario