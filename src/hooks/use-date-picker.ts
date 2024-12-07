import { create } from "zustand";

type State = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const useDatePicker = create<State>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
