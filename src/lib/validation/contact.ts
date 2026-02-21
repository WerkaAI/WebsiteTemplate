import { z } from "zod";

export const SHOP_OPTIONS = ["1", "2-3", "4-5", "5+"] as const;
export const SHOP_OPTION_LABELS: Record<typeof SHOP_OPTIONS[number], string> = {
  "1": "1 lokalizacja",
  "2-3": "2-3 lokalizacje",
  "4-5": "4-5 lokalizacji",
  "5+": "Więcej niż 5",
};

const optionalString = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, z.literal("")]).transform((val) => {
    if (typeof val === "string" && val.trim() === "") {
      return undefined;
    }
    return val as z.infer<T>;
  });

const phoneSchema = optionalString(
  z
    .string()
    .trim()
    .max(20, "Numer telefonu jest za długi")
);

const shopsSchema = optionalString(
  z.enum(SHOP_OPTIONS, {
    errorMap: () => ({ message: "Wybierz liczbę lokalizacji" })
  })
);

const tokenSchema = optionalString(
  z.string().min(1, "Błąd weryfikacji CAPTCHA")
);

export const contactBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Imię musi mieć co najmniej 2 znaki")
    .max(50, "Imię jest za długie"),
  email: z
    .string()
    .trim()
    .email("Nieprawidłowy adres email")
    .max(100, "Email jest za długi"),
  phone: phoneSchema.optional(),
  shops: shopsSchema.optional(),
  message: z
    .string()
    .trim()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków")
    .max(2000, "Wiadomość jest za długa"),
  consent: z
    .boolean()
    .refine((val) => val === true, "Musisz wyrazić zgodę na przetwarzanie danych"),
  token: tokenSchema.optional(),
  company: optionalString(z.string().trim()).optional(),
});

export type ContactPayload = z.infer<typeof contactBaseSchema>;

export interface ContactSchemaOptions {
  requireShops?: boolean;
  requireToken?: boolean;
}

export const createContactSchema = (options: ContactSchemaOptions = {}) =>
  contactBaseSchema.superRefine((data, ctx) => {
    if (options.requireShops && !data.shops) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["shops"],
        message: "Wybierz liczbę lokalizacji",
      });
    }

    if (options.requireToken && !data.token) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["token"],
        message: "Błąd weryfikacji CAPTCHA",
      });
    }
  });

export const contactSchema = createContactSchema();
