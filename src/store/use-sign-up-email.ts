import { create } from "zustand";

type SignUpEmailState = {
  email: string;
  setEmail: (email: string) => void;
};

export const useSignUpEmail = create<SignUpEmailState>((set) => ({
  email: "",
  setEmail: (email: string) => set({ email }),
}));
