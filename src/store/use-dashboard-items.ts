import { create } from "zustand";

type State = {
  item: "ALL" | "PRODUCT" | "STOCK";
  setItem: (item: "ALL" | "PRODUCT" | "STOCK") => void;
};

export const useDashboardItemsStore = create<State>((set) => ({
  item: "ALL",
  setItem: (item) => set({ item }),
}));
