import * as z from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string().min(1, { message: 'First name name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  passwordForm: z
    .object({
      password: z.string().min(1, { message: 'Password is required' }),
      // .regex(
      //   /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$/,
      //   {
      //     message: 'The password must be contain uppercase and lowercase letters, numbers, and special symbols.'
      //   }
      // ),
      confirm: z.string().min(1, { message: 'Confirm your password' })
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm']
    }),
  // .superRefine(({ password }, checkPassComplexity) => {
  //   const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  //   const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  //   const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
  //   let countOfUpperCase = 0,
  //     countOfLowerCase = 0,
  //     countOfNumbers = 0,
  //     countOfSpecialChar = 0;

  //   for (let i = 0; i < password.length; i++) {
  //     let ch = password.charAt(i);
  //     if (!isNaN(+ch)) countOfNumbers++;
  //     else if (containsUppercase(ch)) countOfUpperCase++;
  //     else if (containsLowercase(ch)) countOfLowerCase++;
  //     else if (containsSpecialChar(ch)) countOfSpecialChar++;
  //   }

  //   if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfSpecialChar < 1 || countOfNumbers < 1) {
  //     checkPassComplexity.addIssue({
  //       code: 'custom',
  //       path: ['password'],
  //       message: '密码需要包含英文大小写，数字以及特殊字符'
  //     });
  //   }
  // }),
  isAgree: z
    .boolean()
    .default(false)
    .refine((data) => data === true)
});
