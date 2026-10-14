import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PrayerKind = "petition" | "thanksgiving" | "church";

export type Prayer = {
  id: string;
  name: string;
  text: string;
  kind: PrayerKind;
  createdAt: string;
  prayed: boolean;
};

type State = {
  prayers: Prayer[];
  savedSermonIds: string[];
  addPrayer: (input: { name: string; text: string; kind: PrayerKind }) => void;
  togglePrayed: (id: string) => void;
  removePrayer: (id: string) => void;
  toggleSaved: (sermonId: string) => void;
};

const memoryStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useLocalChurch = create<State>()(
  persist(
    (set) => ({
      prayers: [],
      savedSermonIds: [],
      addPrayer: ({ name, text, kind }) =>
        set((state) => ({
          prayers: [
            {
              id: crypto.randomUUID(),
              name: name.trim(),
              text: text.trim(),
              kind,
              createdAt: new Date().toISOString(),
              prayed: false,
            },
            ...state.prayers,
          ],
        })),
      togglePrayed: (id) =>
        set((state) => ({
          prayers: state.prayers.map((prayer) =>
            prayer.id === id ? { ...prayer, prayed: !prayer.prayed } : prayer,
          ),
        })),
      removePrayer: (id) =>
        set((state) => ({
          prayers: state.prayers.filter((prayer) => prayer.id !== id),
        })),
      toggleSaved: (sermonId) =>
        set((state) => ({
          savedSermonIds: state.savedSermonIds.includes(sermonId)
            ? state.savedSermonIds.filter((id) => id !== sermonId)
            : [sermonId, ...state.savedSermonIds],
        })),
    }),
    {
      name: "watkins-rd-local",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : localStorage,
      ),
      skipHydration: true,
      partialize: (state) => ({
        prayers: state.prayers,
        savedSermonIds: state.savedSermonIds,
      }),
    },
  ),
);
