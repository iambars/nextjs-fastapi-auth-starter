"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { loginSchema } from "@/features/auth/validations/login";
import { AuthError } from "next-auth";

import { AuthState } from "@/features/auth/types";

export async function authenticate(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;

    return {
      success: false,
      redirect: null,
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }
  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    return {
      success: true,
      redirect: "/dashboard",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        redirect: null,
        errors: {
          form:
            error.type === "CredentialsSignin"
              ? "Invalid email or password."
              : "Authentication failed.",
        },
      };
    }

    return {
      success: false,
      redirect: null,
      errors: {
        form: "Something went wrong.",
      },
    };
  }
}
