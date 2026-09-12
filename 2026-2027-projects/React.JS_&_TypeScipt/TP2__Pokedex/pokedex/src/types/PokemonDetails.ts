export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

export type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
};

export type PokemonDetails = {
  species: any;
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
};
