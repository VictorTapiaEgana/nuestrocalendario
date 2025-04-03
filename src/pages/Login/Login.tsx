import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material"
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useForm } from 'react-hook-form'
import { FormData } from "../../types/type";
// import getUSer from "../../Functions/getUser";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {    

    const { register, handleSubmit, formState:{ errors }} = useForm<FormData>()
    const { setUser } = useUserStore()
    const [ errores, setErrores ] = useState<string>('')

    const { VITE_SERVERNAME } = import.meta.env
    
    const navigate= useNavigate()
    
    const fetchTest = async (correo:string, contrasena:string) =>{

        const resp = await fetch(`http://${VITE_SERVERNAME}/usuarios/getuser`,
                                                                        { method:'POST',
                                                                            headers: {
                                                                            'Content-Type': 'application/json'
                                                                        },
                                                                            body: JSON.stringify({user:correo,
                                                                                                  pass:contrasena
                                                                            })
                                                                        })
        const data = await resp.json();      
        return data        

    }

    const onsubmit = async (data:FormData) =>{

        const correo = data.correo
        const contrasena = data.contrasena

        const resp = await fetchTest(correo, contrasena )      

        if (resp.status === Number(200)) {

            setErrores('')
            setUser(resp.data[0])
            navigate('/inicio') 

        } else {

            setErrores(String(resp.message))

        }     

    }

  return (
    

    <Box sx={{ display:'flex',
               justifyContent:'center',
               alignItems:'center',
               backgroundColor:'#606368', 
               height:'100vh', 
               width:'100vw'}}>

         <Box sx={{display:{xs:'none',sm:'flex',marginRight:'50px' }}}>
            <Diversity3Icon sx={{color:'whitesmoke',fontSize:'300px'}}/>
         </Box>

         <Box sx={{width:'360px', padding:{xs:'20px', sm:'0'}}}>
            <Paper elevation={3} sx={{padding:'0 20px'}}>

                <form  onSubmit={handleSubmit(onsubmit)} style={{display:'flex', flexDirection:'column',gap:'10px'}}>

                    <Typography variant="h5" mt={4} mb={3} textAlign={'center'}>Nuestro Calendario</Typography>

                    <TextField variant="outlined" label='Correo electronico' type="email"
                        error = {!!errors.correo}
                        helperText = { errors.correo && String(errors.correo.message)}
                        {...register('correo',{required:'ingrese correo',
                                               pattern: {
                                                         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                         message: "Email inválido",}
                                                })}/>
                    <br/>
                    <TextField variant="outlined" label='Contraseña' type="password"
                        error = {!!errors.contrasena}
                        helperText = { errors.contrasena && String(errors.contrasena.message)}
                        {...register('contrasena',{required:'ingrese clave'})}/>

                    <Divider />
                    {
                        errores && ( <small style={{color:'tomato', textAlign:'center'}}> {errores}</small>)
                    }

                    <Button type="submit"  variant="contained" color="primary" fullWidth sx={{marginBottom:'40px'}}>Ingresar</Button>

                </form>

            </Paper>
         </Box>
        
    </Box>
        
  )

}

export default Login