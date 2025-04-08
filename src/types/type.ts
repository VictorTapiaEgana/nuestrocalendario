import { ReactNode } from "react";

export type WrapperProps = {
    children: ReactNode;
}

export type NavBarProps = {
    handleDrawerOpen: () => void;
    open:boolean
}

export type sideMenuProps = {
  nombre:string,
  icono: React.ElementType
  link:string
}

export type FormData = {
  correo: string;
  contrasena:string
};

export type userLoginProps ={
  correo:string,
  contrasena:string
}

export type DatosUsuario = {
  id:number,
  nombre:string,
  correo:string,
  contrasena:string,
  avatar:string,
  rol:string
}

export type UserState = {
    usuario: DatosUsuario | null;
    setUser: (user: DatosUsuario) => void;
    logout: () => void;
};

export type FormDataEventos = {
      nomEvento: string;
      descEvento: string;
      cateEvento: string;
      tipoEvento:string;
      hInicio:string;
      Htermino:string    
};
  
export type  categoriProps = {
      id:number,
      categoria:string
}
  
export type tipoProps = {
     id:number,
     nombre:string,
     descripcion:string,
     id_categoria:number
}

export type DatosEvento ={
    nombre:string;
    descripcion:string;
    fechaEvento:Date | undefined;
    categoria:string;
    tipo:string;
    allDay:boolean;
    hInicio:string;
    hTermino:string;
    user_id:number    
}

export type EventoBackend = {
   id: number;
   titulo: string;
   descripcion: string;
   fecha: string; 
   hora_inicio: string; 
   hora_fin: string;   
   tipo_evento_id: number;
   usuario_id: number;
   ubicacion: string | null;
   estado: string;
   created_at: string;
   updated_at: string;
   categoria_evento_id: number;
   todoeldia: boolean;
   tipo_evento_nombre:string;
 }
