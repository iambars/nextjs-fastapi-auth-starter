export type AuthErrors = {
  form?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export type AuthState = {
  success: boolean;
  redirect: string | null;
  errors?: AuthErrors;
};
