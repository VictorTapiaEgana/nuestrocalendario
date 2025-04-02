import { Box, Button, Divider, Drawer, Paper, Typography } from "@mui/material"
import { useState } from "react";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const AddEvento = () => {
  
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 'auto', 
                 height:'600px',
                 display:'flex',
                 justifyContent:'center',
                 alignItems:'center',
                 flexDirection:'column' }} 
            role="presentation" 
          //  onClick={toggleDrawer(false)}
           >        
      
        <Box > 

          <Paper elevation={6} sx={{width:'360px',padding:'10px',height:'350px'}}>

               <Box sx={{display:'flex'}}>
                  <EventAvailableIcon/>
                  <Typography variant="h5">Agregar Evento</Typography>
               </Box>            

          </Paper>

        </Box>       
        
        <Divider/>

        <Button onClick={toggleDrawer(!toggleDrawer)} >Cerrar</Button>

      </Box>
    );
  
    return (
      <Box>

        <Button onClick={toggleDrawer(true)}>Open drawer</Button>

        <Drawer open={open} onClose={toggleDrawer(false)}  anchor="bottom">
          {DrawerList}
        </Drawer>

      </Box>
    );
  
}

export default AddEvento