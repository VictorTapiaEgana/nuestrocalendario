// BottomDrawer.tsx
import React, { useEffect, useState } from 'react';
import { Drawer, Button, Typography, Box, TextField, Checkbox, FormGroup, FormControlLabel, Paper, useMediaQuery, useTheme, Autocomplete, Snackbar } from '@mui/material';
import { useBottomDrawerStore } from '../../store/useBottomDrawerStore' 

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import "dayjs/locale/es";
import dayjs, { Dayjs } from "dayjs";

import './BottomDrawer.css'

import { useForm,SubmitHandler  } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { categoriProps, DatosEvento, FormDataEventos, tipoProps } from '../../types/type';
import { useUserStore } from '../../store/useUserStore';

dayjs.locale("es");

const BottomDrawer: React.FC = () => {

  const { openBottomDrawer, closeBottomDrawer } = useBottomDrawerStore(); 

  const { register, handleSubmit, watch, reset, setValue, formState:{ errors}} = useForm<FormDataEventos>();
  const [ selectDate, setSelectDate ] =useState<Dayjs | null>(dayjs());
  const [ allday, setallday ] = useState<boolean>(false)
  const [ categorias, setCategorias ] = useState<categoriProps[]>([])
  const [ tipos, setTipos ] = useState<tipoProps[]>([])
  const [ openSnackBar , SetOpenSnackBar ] = useState<boolean>(false)

  
  const selectedCategory = watch("cateEvento");
  const selectedtipo = watch("tipoEvento");

  const theme = useTheme(); 
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const elevation = isXs || isSm ? 0 : 20;

  const { VITE_SERVERNAME } = import.meta.env

  const fetchTipoEvento = async() =>{

    const resp = await fetch(`http://${VITE_SERVERNAME}/eventos/gettipos/`)
    const data = await resp.json()

    setTipos(data.data)

  }

  const fetchCategoriasEvento = async() =>{

    const resp = await fetch(`http://${VITE_SERVERNAME}/eventos/getcategorias/`)
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
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])  
  
  const { usuario } = useUserStore()
  const handleAddEvento:SubmitHandler<FormDataEventos> = async(data) =>{
    
    const DatosEvento:DatosEvento = {
                                     nombre:data.nomEvento,
                                     descripcion:data.descEvento,
                                     fechaEvento:selectDate?.toDate(),
                                     categoria:data.cateEvento,
                                     tipo:data.tipoEvento,
                                     allDay:allday,
                                     hInicio:data.hInicio,
                                     hTermino:data.Htermino,
                                     user_id: Number(usuario?.id)
    }    

    const resp = await fetch(`http://${VITE_SERVERNAME}/eventos/guadarevento`,{ method:'POST',
                                                                                headers:{
                                                                                        'Content-Type': 'application/json'
                                                                                },
                                                                                body:JSON.stringify(DatosEvento)
    })

    const respuesta = await resp.json()    

    console.log(respuesta)

            SetOpenSnackBar(true)

            reset()

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
                                onChange={(event, value) => setValue("cateEvento", value ? String(value.id) : "")}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params}  
                                                          fullWidth 
                                                          placeholder='Laboral, educación, salud . . . '
                                                          error= { !! errors.cateEvento }
                                                          helperText = { errors.cateEvento ? String(errors.cateEvento.message) : '' }  
                                                          value={ selectedCategory}
                                                        //   {...register('cateEvento',{required:'seleccione categoria'})}
                                                          /> }
                            />                                               
                            
                        </Box>

                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'10px',width:'100%'}}>
                            
                            <Typography sx={{fontWeight:'600'}} textAlign={'start'}>Tipo evento</Typography>   

                            <Autocomplete                                
                                disablePortal
                                options={tipos}
                                getOptionLabel={(option) => String(option.nombre) || ""}
                                onChange={(event, value) => setValue("tipoEvento", value ? String(value.id) : "")}
                                sx={{ width: "100%" }}
                                renderInput={(params) => <TextField {...params} 
                                                         fullWidth 
                                                         placeholder='Tarea, trabajo, reunión'
                                                         error={!!errors.tipoEvento}
                                                         helperText = { errors.tipoEvento ? String(errors.tipoEvento.message) : "" } 
                                                         value={selectedtipo}
                                                        //  {...register('tipoEvento',{required:'Seleccione tipo'})} 
                                                         />
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
                                            <TextField type='time' defaultValue={'08:00'}
                                                {...register('hInicio')}
                                            />
                                        </Box>
                                        
                                        <Box textAlign={'center'}>
                                            <Typography sx={{fontWeight:'600'}}>Hora termino</Typography>    
                                            <TextField type='time' defaultValue={'15:30'}
                                                {...register('Htermino')}
                                            />
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
        
        <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={()=>SetOpenSnackBar(false)}
            message="Evento Guardado ❤"
            // action={action}
        />
    </LocalizationProvider>
  );
};

export default BottomDrawer;
