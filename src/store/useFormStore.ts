import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Element } from "../types/form";

interface FormState {
    elements: Element[];
    addElement: (element: Element) => void;
    resetElements: () => void;
}

export const useFormStore = create<FormState>()(
    persist(
        (set) => ({
            elements: [],
            addElement: (element) =>
                set((state) => ({ elements: [...state.elements, element] })),
            // Reset the elements array to empty
            resetElements: () => set({ elements: [] }),
        }),
        {
            name: "elements-storage", // key in localStorage
        }
    )
);
