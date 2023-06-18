import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "password is required",
    }),
    role: z.string({
      required_error: "role is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
      middleName: z.string().optional(),
    }),
    phoneNumber: z.string({
      required_error: "phone number is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    budget: z
      .number({
        required_error: "budget is required",
      })
      .optional(),
    income: z
      .number({
        required_error: "income is required",
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
