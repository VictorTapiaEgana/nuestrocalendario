import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid' 
// import listPlugin from '@fullcalendar/list'
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid'

import interactionPlugin from "@fullcalendar/interaction" 
import esLocale from '@fullcalendar/core/locales/es';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore'

import './Calendario.css'
import { EventoBackend, EventoCalendario } from '../../types/type'

type DateClickArg = Parameters<NonNullable<React.ComponentProps<typeof FullCalendar>['dateClick']>>[0];
type DatesSetArg = Parameters<NonNullable<React.ComponentProps<typeof FullCalendar>['datesSet']>>[0];
 
const Calendario = () => {

   //  const [ eventlist, setEventList ] = useState<EventInput[]>([]);
   const [ eventlist, setEventList ] = useState<EventoCalendario[]>([]);
   const [currentTitle, setCurrentTitle] = useState('');
   const [ isMobile , setIsMobile ] = useState<boolean>()  
   const [ showWeekends, setShowWeekends ] = useState<boolean>(false)
   const calendarRef = useRef<FullCalendar>(null);
   const { darkMode } = useThemeStore()
   const { VITE_SERVERNAME  } = import.meta.env

   function transformarEventosParaFullCalendar(eventos:EventoBackend[]) {
      return eventos.map(evento => {
        const fechaBase = evento.fecha.split("T")[0]; 
        const start = `${fechaBase}T${evento.hora_inicio}`;
        const end = `${fechaBase}T${evento.hora_fin}`;
  
        return {
               id: evento.id.toString(),
               title: evento.titulo,
               start,
               end,
               allDay: evento.todoeldia,
               extendedProps: {
                               descripcion: evento.descripcion,
                               ubicacion: evento.ubicacion ?? "",
                               estado: evento.estado,
                               tipo_evento_id: evento.tipo_evento_id,
                               usuario_id: evento.usuario_id,
                               categoria_evento_id: evento.categoria_evento_id,
                               tipo_evento_nombre:evento.tipo_evento_nombre,
                               categoria_nombre:evento.categoria_nombre,
                               color:evento.categoria_color,
                               icono:evento.categoria_icono
          }
        };
      });
   }
   
   function formatearHora(date: Date): string {
      return date.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // formato 24 horas
      });
    }
    

    
   const fecthData  = async (fecha:string) =>{

      const resp = await fetch(`http://${VITE_SERVERNAME}/eventos/${fecha}`,{ method:'GET' })

      const eventos = await resp.json()

      const eventosTransformados = transformarEventosParaFullCalendar(eventos.data);

      setEventList(eventosTransformados);

   }    

   useEffect(()=>{

     // busca los eventos del mes    
     const fechaActual = new Date().toLocaleDateString()

     const buscarEventos = async(fecha:string) =>{
          return await fecthData(fecha)
     }

     buscarEventos(fechaActual)

     //Carga local storge

     const guardado = localStorage.getItem('showWeekends');

     if (guardado ==='true') {
            setShowWeekends(true)
     }
     
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

   useEffect(()=>{

      localStorage.setItem('showWeekends', showWeekends.toString());
      console.log(showWeekends)

   },[showWeekends])

    useEffect(() => {
        const handleResize = () => {

          const mobile = window.innerWidth < 500;
          setIsMobile(mobile);
      
          const newView = mobile ? 'listDay' : 'dayGridMonth';
          calendarRef.current?.getApi().changeView(newView);
          
        };
      
        window.addEventListener("resize", handleResize);
        handleResize();
      
        return () => window.removeEventListener("resize", handleResize);
    }, []);




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

                {/* MOBIL: Oculta los Botones izquierdos */}
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

                {/* MOBIL: Oculta los Botones Derechos */}
                <Box sx={{display:{xs:'none',sm:'flex'},gap:'5px'}}>
                     <Button variant='contained' sx={EstiloBotones} onClick={() => changeView('timeGridDay')} >Día</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={() => changeView('timeGridWeek')} >Semana</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={() => changeView('dayGridMonth')} >Mes</Button>                     
                </Box>

                {/* MOBIL: opciones mobile */}
                <Box sx={{display:{xs:'flex',sm:'none'},gap:'5px'}}>
                     <Button variant='contained' sx={EstiloBotones} onClick={handlePrev} className="">←</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={handleToday} className="">Hoy</Button>
                     <Button variant='contained' sx={EstiloBotones} onClick={handleNext} className="">→</Button>
                </Box>
               
            </Box>              

            <FormGroup>
               <FormControlLabel control={<Checkbox checked={showWeekends} 
                                                    onClick={()=>{setShowWeekends(!showWeekends)}}/>} 
                                                    label="Mostrar Fines de Semana"/>
            </FormGroup>

            <FullCalendar
                        plugins={[ dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin ]}
                        weekends= {showWeekends}
                        hiddenDays={[0]}                              
                        ref={calendarRef}
                        initialView= {isMobile ? 'listDay' : 'dayGridMonth'}                         
                        timeZone="local"                   
                        locale={esLocale}                        
                        datesSet={handleDatesSet}             
                        height={'100vh'}               
                        headerToolbar={{
                                        left:'', 
                                        center: '' ,
                                        right:''           
                                      }}                        
                        dateClick={handleDateClick}
                        events = { eventlist }
                        eventClassNames={(arg) => {
                           return arg.event.allDay ? ['evento-allday'] : [];
                         }}       

                         eventContent={(arg) => {                                                      
                         
                           const categoriaNombre = arg.event.extendedProps.tipo_evento_nombre || 'Sin categoría';                           
                         
                           const container = document.createElement('div');
                                 container.style.width = '100%';
                                 container.style.boxSizing = 'border-box';
                                 container.style.overflow ='hidden';
                                 container.style.padding = '2px';
                                 container.style.fontSize = '12px';
                         
                           // Línea 1: Categoría
                           const categoriaDiv = document.createElement('div');
                                 categoriaDiv.innerText = categoriaNombre;                                 
                                 categoriaDiv.style.backgroundColor = arg.event.extendedProps.color;
                                 categoriaDiv.style.color = '#333';
                                 categoriaDiv.style.fontWeight = 'bold';
                                 categoriaDiv.style.padding = '2px 4px';
                                 categoriaDiv.style.borderBottom = '1px solid #ccc';
                         
                           // Línea 2: Hora + Emoji + Título
                           const infoDiv = document.createElement('div');
                                 infoDiv.style.display = 'flex';
                                 infoDiv.style.alignItems = 'center';
                                 infoDiv.style.gap = '4px';
                                 infoDiv.style.padding = '2px 4px';
                                 infoDiv.innerHTML = `
                                                      <span>${ arg.event.allDay ? '' : formatearHora(arg.event.start) }</span>
                                                      <span>${ arg.event.extendedProps.icono }</span>
                                                      <strong>${ arg.event.title }</strong>
                                                    `;
                         
                           container.appendChild(categoriaDiv);
                           container.appendChild(infoDiv);
                         
                           return { domNodes: [container] };
                         }}
                         
                         
                         
            />

     </Box>

  )

}

export default Calendario