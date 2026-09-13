export type PokemonSpeciesType = {
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
  id: number;
  name: string;
  base_happiness: number | null;
  capture_rate: number;
  egg_groups: {
    name: string;
    url: string;
  }[];
  gender_rate: number;
  hatch_counter: number | null;
  growth_rate: {
    name: string;
    url: string;
  };

  habitat: {
    name: string;
    url: string;
  } | null;
  color: {
    name: string;
    url: string;
  } | null;
  shape: {
    name: string;
    url: string;
  } | null;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];

  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};
