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
// export type CharacterResponse = {
//     id              String
//   name            String
//   description     String
//   post            String
//   slogen          String
//   vision          String // 神之眼
//   quality         String
//   characterVoice  String[]
//   voice           String[]
//   avatar          String
//   weapon          String
//   tags            String[]
//   profile         Profile?
//   region          Region
//   regionId        String
// };
