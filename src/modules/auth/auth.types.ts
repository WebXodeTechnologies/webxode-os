export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  department?: string;
}

export interface Verify2FAPayload {
  userId: string;
  code: string;
}
