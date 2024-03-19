import { z } from "zod";

export const voterRegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50)
    .trim()
    .toLowerCase(),
  fullname: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50)
    .trim(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must contain at least one lowercase letter, and one special character",
    }),

  dateOfBirth: z.string({
    required_error: "A date of birth is required.",
  }),

  nationality: z.string().optional(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." })
    .max(50)
    .trim(),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters." })
    .max(50)
    .trim(),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters." })
    .max(50)
    .trim(),
});

export const contestantRegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50)
    .trim()
    .toLowerCase(),
  fullname: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50)
    .trim(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must contain at least one lowercase letter, and one special character",
    }),

  dateOfBirth: z.string({
    required_error: "A date of birth is required.",
  }),

  nationality: z.string().optional(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." })
    .max(50)
    .trim(),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters." })
    .max(50)
    .trim(),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters." })
    .max(50)
    .trim(),
  height: z
    .string()
    .min(2, { message: "Height must be at least 2 characters." }),

  weight: z
    .string()
    .min(2, { message: "Height must be at least 2 characters." }),

  eyeColor: z
    .string()
    .min(3, { message: "Eye color must be at least 3 characters." })
    .max(20)
    .trim(),
  hairColor: z
    .string()
    .min(3, { message: "Hair color must be at least 3 characters." })
    .max(20)
    .trim(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must contain at least one lowercase letter, and one special character",
    }),
});
