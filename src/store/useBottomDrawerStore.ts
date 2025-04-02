// store.ts
import {create} from 'zustand';

interface BottomDrawerStore {
  openBottomDrawer: boolean;
  toggleBottomDrawer: () => void;
  closeBottomDrawer: () => void;
  openBottomDrawerManually: () => void;
}

export const useBottomDrawerStore = create<BottomDrawerStore>((set) => ({
  openBottomDrawer: false,
  toggleBottomDrawer: () => set((state) => ({ openBottomDrawer: !state.openBottomDrawer })),
  closeBottomDrawer: () => set({ openBottomDrawer: false }),
  openBottomDrawerManually: () => set({ openBottomDrawer: true }),
}));
