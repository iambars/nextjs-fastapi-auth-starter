"use server";

import { z } from "zod";
import { RegisterErrors, registerSchema } from "@/lib/validations/register";

export type RegisterState = {
  success: boolean;
  redirect: string | null;
  errors: RegisterErrors;
};

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const API_URL = process.env.FASTAPI_URL;
  const parsed = registerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return {
      success: false,
      redirect: null,
      errors: {
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      const errors = await response.json();
      return {
        success: false,
        redirect: null,
        errors,
      };
    }

    return {
      success: true,
      redirect: "/login",
      errors: {},
    };
  } catch {
    return {
      success: false,
      redirect: null,
      errors: {
        form: "Unable to connect. Please try again.",
      },
    };
  }
}
