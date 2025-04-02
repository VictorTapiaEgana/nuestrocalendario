import { create } from 'zustand'
import { UserState } from '../types/type'
  
export const useUserStore= create<UserState>((set)=>({

    usuario :null,
    setUser: (usuario) => set({ usuario }),    
    logout: () => set({ usuario: null })

}))