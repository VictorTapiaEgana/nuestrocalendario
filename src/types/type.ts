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
