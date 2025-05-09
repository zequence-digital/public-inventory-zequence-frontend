import { create } from "zustand";

type UserModalState = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useInviteUserModalAction = create<UserModalState>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
