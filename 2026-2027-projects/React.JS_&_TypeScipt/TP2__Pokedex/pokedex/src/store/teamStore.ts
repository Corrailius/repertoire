import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pokemon } from "../types/Pokemon";

type TeamStore = {
  team: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (name: string) => void;
  movePokemon: (fromIndex: number, toIndex: number) => void;
};

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      team: [],

      addPokemon: (pokemon) =>
        set((state) => {
          if (state.team.length >= 6) {
            return state;
          }

          if (state.team.some((member) => member.name === pokemon.name)) {
            return state;
          }

          return {
            team: [...state.team, pokemon],
          };
        }),

      removePokemon: (name) =>
        set((state) => ({
          team: state.team.filter((pokemon) => pokemon.name !== name),
        })),

      movePokemon: (fromIndex, toIndex) =>
        set((state) => {
          const team = [...state.team];

          const [movedPokemon] = team.splice(fromIndex, 1);

          team.splice(toIndex, 0, movedPokemon);

          return { team };
        }),
    }),
    {
      name: "pokemon-team",
    },
  ),
);