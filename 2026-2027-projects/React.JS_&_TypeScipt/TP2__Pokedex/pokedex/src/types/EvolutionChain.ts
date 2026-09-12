export type EvolutionDetail = {
  min_level: number | null;

  trigger: {
    name: string;
  };

  item: {
    name: string;
  } | null;

  held_item: {
    name: string;
  } | null;

  min_happiness: number | null;

  min_beauty: number | null;

  min_affection: number | null;

  time_of_day: string;

  known_move: {
    name: string;
  } | null;

  known_move_type: {
    name: string;
  } | null;

  location: {
    name: string;
  } | null;

  party_species: {
    name: string;
  } | null;

  party_type: {
    name: string;
  } | null;

  relative_physical_stats: number | null;

  trade_species: {
    name: string;
  } | null;

  turn_upside_down: boolean;
};

export type EvolutionNode = {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[];
};

export type EvolutionChain = {
  chain: EvolutionNode;
};
