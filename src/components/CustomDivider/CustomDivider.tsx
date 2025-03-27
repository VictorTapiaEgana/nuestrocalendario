import React from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const CustomDivider: React.FC = () => {
  const theme = useTheme();

  return (
    <Divider
      sx={{
        backgroundColor: theme.palette.text.primary, // Cambia el color según el tema
        opacity: theme.palette.mode === 'dark' ? 0.5 : 0.8, // Ajusta la opacidad según el modo
        height: "5px", // Establece el grosor de la línea
      }}
    />
  );
};

export default CustomDivider;
