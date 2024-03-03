import { z } from 'zod';

import { SignInFormSchema, SignUpFormSchema } from './form-definition';

export * from './form-definition';

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
