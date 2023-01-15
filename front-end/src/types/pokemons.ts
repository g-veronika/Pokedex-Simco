export interface Pokemon {
  generation: number;
  id: number;
  pokedex_creature: number;
  img?: string;
  legendary: boolean;
  name: string;
  ref_number: number;
  type_1: string;
  type_2: string;
  nickname?: string;
  level?: number;
  experience?: number;
}
