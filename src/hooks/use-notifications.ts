import { create } from "zustand";

type State = {
  readStatus: "READ" | "UNREAD" | "ALL";
  setReadStatus: (readStatus: "READ" | "UNREAD" | "ALL") => void;
};

export const useNotificationStatus = create<State>((set) => ({
  readStatus: "ALL",
  setReadStatus: (readStatus) => set({ readStatus }),
}));
