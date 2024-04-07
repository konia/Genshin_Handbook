import { z } from 'zod';

import {
  CharactersFormSchema,
  FilterFormSchema,
  LanguageFormSchema,
  SignInFormSchema,
  SignUpFormSchema
} from './form-definition';

export * from './form-definition';

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
export type LanguageFormValues = z.infer<typeof LanguageFormSchema>;
export type FilterFormValues = z.infer<typeof FilterFormSchema>;
export type CharactersFormValues = z.infer<typeof CharactersFormSchema>;

export type UserResponse = {
  id: string;
  name: string;
  email: boolean;
  role: string;
};

export type CharactersResponse = {
  id: string;
  name: { locale: string; value: string }[];
  star: string;
  characterVoice: string[];
  weapon: string;
  region: string;
  constellation: string;
  vision: string;
  affiliation: string;
  title: string;
  birthday: string;
};

export const REGION = {
  MONDSTADT: 'Mondstadt',
  LIYUE: 'Liyue Harbor',
  INAZUMA: 'Inazuma City',
  SNEZHNAYA: 'Snezhnaya',
  SUMERU: 'Sumeru',
  FONTAINE: 'Fontaine',
  NATLAN: 'Natlan'
};
export const WEAPONS = {
  SWORD: 'sword',
  CLAYMORE: 'claymore',
  BOW: 'bow',
  CATALYST: 'catalyst',
  POLEARM: 'polearm'
};
export const VISION = {
  PYRO: 'pyro',
  HYDRO: 'hydro',
  DENDRO: 'DENDRO',
  ELECTRO: 'electro',
  ANEMO: 'anemo',
  CRYO: 'cryo',
  GEO: 'geo'
};
