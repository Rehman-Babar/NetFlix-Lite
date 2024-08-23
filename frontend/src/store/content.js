import { create } from "zustand";

export const contentStore = create((set) => ({
    contentType:"movie",
    setContentType:(type) => set({contentType:type})
}))
