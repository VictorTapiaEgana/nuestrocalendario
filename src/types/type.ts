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