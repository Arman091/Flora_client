// src/validation/signupSchema.js
import { z } from "zod";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import {
  EMAIL_REGEX,
  INTERNATIONAL_PHONE_REGEX,
  PASSWORD_REGEX,
} from "../constants/regex.js";
import FORM_KEYS from "../constants/constants.js";


export const signupSchema = z.object({
  [FORM_KEYS.FIRST_NAME]: z
    .string()
    .trim()
    .min(1, "First name is required"),

  [FORM_KEYS.LAST_NAME]: z
    .string()
    .trim()
    .min(1, "Last name is required"),

  [FORM_KEYS.USER_NAME]: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters"),

  [FORM_KEYS.EMAIL]: z
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(EMAIL_REGEX, "Invalid email format"),

  [FORM_KEYS.PHONE]: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1, "Phone number is required")
    .refine(isPossiblePhoneNumber, { message: "Invalid phone number format" }),

  [FORM_KEYS.PASSWORD]: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters, contain one uppercase letter and one number"
    )
    .regex(
      PASSWORD_REGEX,
      "Password must be at least 8 characters, contain one uppercase letter and one number"
    ),

  [FORM_KEYS.ROLE]: z
    .string({ required_error: "Role is required" })
    .min(1, "Please select a role")
    .refine((val) => ["Admin", "regular"].includes(val)),
});