// BottomDrawer.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Button, Typography, Box, TextField, Checkbox, FormGroup, FormControlLabel, Paper, useMediaQuery, useTheme, Autocomplete } from '@mui/material';
import { useBottomDrawerStore } from '../../store/useBottomDrawerStore' 

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "dayjs/locale/es";
import dayjs, { Dayjs } from "dayjs";

import './BottomDrawer.css'

import { useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

dayjs.locale("es");

type FormData = {
    nomEvento: string;
    descEvento: string;
    cateEvento: string;
    
};

const BottomDrawer: React.FC = () => {

  const { openBottomDrawer, closeBottomDrawer } = useBottomDrawerStore(); 

  const { register, handleSubmit, formState:{ errors}} = useForm();
  const [ selectDate, setSelectDate ] =useState<Dayjs | null>(dayjs());
  const [ allday, setallday ] = useState<boolean>(false)
  const [ categorias, setCategorias ] = useState<string[]>([])
  const [ tipos, setTipos ] = useState<string[]>([])

  const theme = useTheme(); 
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const elevation = isXs || isSm ? 0 : 20;


  const fetchTipoEvento = async() =>{

    const resp = await fetch(`http://${import.meta.env.VITE_SERVERNAME}/eventos/gettipos/`)
    const data = await resp.json()

    setTipos(data.data)

  }

  const fetchCategoriasEvento = async() =>{

    const resp = await fetch(`http://${import.meta.env.VITE_SERVERNAME}/eventos/getcategorias/`)
    const data = await resp.json()

    setCategorias(data.data)

  }

  useEffect(()=>{

    const fetchCateg = async() =>{

        return await fetchCategoriasEvento()
    }

    const fetchTipo = async() =>{

        return await fetchTipoEvento()
    }

    fetchCateg()   
    fetchTipo()
  
  },[])  
  
  const handleAddEvento = (data:FormData) =>{
    console.log(data)
    closeBottomDrawer()
  }




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Drawer
            anchor="bottom"
            open={openBottomDrawer}
            onClose={closeBottomDrawer} 
            sx={{
                '& .MuiDrawer-paper': {
                    height: '95%',
                },
            }}>

        
           <Box p={3}>
           <Paper sx={{padding:'15px'}} elevation={elevation}>
            <Typography variant="h3" mb={2} textAlign={'center'} fontWeight={800}>
            Agregar Evento
            </Typography>
            
            <form onSubmit={ handleSubmit(handleAddEvento) }>

                <Box sx={{ display:'flex', flexDirection:{xs:'column',sm:'row'},gap: '20px', justifyContent:'center'}}> 
                    {/*PRIMERA LINEA  */}
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Typography sx={{fontWeight:'600'}}>Nombre evento</Typography>    
                        <TextField className='textfiledDrawer'                                
                                    variant='outlined'
                                    error={ !!errors.nomEvento }
                                    helperText={ errors.nomEvento ? String(errors.nomEvento?.message) : '' }
                                    {...register('nomEvento', { required: 'Ingrese nombre del evento'})}/>
                                    
                    </Box>        

                    <Box sx={{ display:'flex', flexDirection:'column'}}>
                        <Typography sx={{fontWeight:'600'}}>Descripción</Typography>    
                        <TextField className='textfiledDrawer'                                
                                    variant='outlined'
                                    error={ !!errors.descEvento }
                                    helperText={ errors.descEvento ? String(errors.descEvento?.message) : '' }
                                    {...register('descEvento')}/>

                    </Box>    

                    <Box sx={{ display:'flex', flexDirection:'column'}}>
                        <Typography sx={{fontWeight:'600'}}>Fecha evento</Typography>    
                        <DatePicker format="DD/MM/YYYY"                                    
                                    value={selectDate}                                     
                                    // sx={{maxWidth:'350px'}}                                   
                                    onChange={(newValue) => setSelectDate(newValue)}/>
                    </Box>

                </Box>   

                <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                {/* SEGUNDA LINEA */}
                    <Box sx={{ display:'flex', flexDirection:{xs:'column',sm:'row'}, justifyContent:'center', width:'100%',maxWidth: '740px', gap:'20px'}} mt={2}> 
                        
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'10px',width:'100%'}}>
                            
                            <Typography sx={{fontWeight:'600'}} textAlign={'start'}>Categoria</Typography>   

                            <Autocomplete                                
                                disablePortal
                                options={categorias}
                                getOptionLabel={(option) => String(option.categoria) || ""}
                                 sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params}  
                                                          fullWidth 
                                                          placeholder='Laboral, educación, salud . . . '
                                                          error= { !! errors.cateEvento }
                                                          helperText = { errors.cateEvento ? String(errors.cateEvento.message) : '' }  
                                                          {...register('cateEvento',{required:'seleccione categoria'})}
                                                          /> }
                            />                                               
                            
                        </Box>

                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'10px',width:'100%'}}>
                            
                            <Typography sx={{fontWeight:'600'}} textAlign={'start'}>Tipo evento</Typography>   

                            <Autocomplete                                
                                disablePortal
                                options={tipos}
                                getOptionLabel={(option) => String(option.nombre) || ""}
                                 sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} 
                                                         fullWidth 
                                                         placeholder='Tarea, trabajo, reunión'
                                                         error={!!errors.tipoEvento}
                                                         helperText = { errors.tipoEvento ? String(errors.tipoEvento.message) : "" } 
                                                         {...register('tipoEvento',{required:'Seleccione tipo'})} />
                                            }
                            />                                               
                            
                        </Box>
                        
                    </Box>

                    {/* TERCERA LINEA */}
                    
                    <Box sx={{ display:'flex', flexDirection:{xs:'column',sm:'row',gap:'20px'}, justifyContent:'center'}} mt={2}> 
                            
                            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'10px'}}>
                                
                                <Typography sx={{fontWeight:'600'}}>Duracion</Typography>    
                                
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox value={allday} onChange={()=>{setallday(!allday)}}/>} label="Todo el dia" />
                                </FormGroup>
                                
                            </Box>

                            {
                                    !allday && (
                                        <Box sx={{ display:'flex', justifyContent:'center',gap:'10px'}}>
                                            <Box textAlign={'center'}>
                                                <Typography sx={{fontWeight:'600'}}> Hora inicio</Typography>    
                                                <TextField type='time' value={'08:00:00'}/>
                                            </Box>
                                            
                                            <Box textAlign={'center'}>
                                                <Typography sx={{fontWeight:'600'}}>Hora termino</Typography>    
                                                <TextField type='time' value={'15:30:00'}/>
                                            </Box>                                                        
                                        </Box>
                                    )
                            }
                        
                    </Box>

                </Box>             
                    
               <Box textAlign={'center'}>                     
                    <Button variant="contained" color="primary" type='submit' sx={{margin:'30px 0', width:'270px'}} >
                        + Agregar evento
                    </Button>
               </Box>
                

            </form>
            </Paper>
           </Box>
      
        </Drawer>
    </LocalizationProvider>
  );
};

export default BottomDrawer;
