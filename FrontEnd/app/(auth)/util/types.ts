export type LoginState = {
  errors?: { email?: string; password?: string; general?: string };
  success?: boolean;
};

export type RegisterState = {
  errors?: {
    userName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
  success?: boolean;
};
