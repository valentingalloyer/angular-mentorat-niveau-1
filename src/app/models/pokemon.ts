export type PokemonSummary = {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
};

export type TeamMember = PokemonSummary & {
  ko: boolean;
};
