import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  answers: Record<string, string>;
  completed: string[];
  name: string;
  setName: (name: string) => void;
  setAnswer: (key: string, value: string) => void;
  toggleComplete: (slug: string) => void;
};

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useWelcomeStudy = create<State>()(
  persist(
    (set) => ({
      answers: {},
      completed: [],
      name: "",
      setName: (name) => set({ name }),
      setAnswer: (key, value) => set((state) => ({ answers: { ...state.answers, [key]: value } })),
      toggleComplete: (slug) =>
        set((state) => ({
          completed: state.completed.includes(slug)
            ? state.completed.filter((s) => s !== slug)
            : [...state.completed, slug],
        })),
    }),
    {
      name: "watkins-rd-welcome-study",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : localStorage,
      ),
      skipHydration: true,
      partialize: (state) => ({
        answers: state.answers,
        completed: state.completed,
        name: state.name,
      }),
    },
  ),
);
