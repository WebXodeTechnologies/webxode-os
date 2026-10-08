import { IUser } from "./user.model";

export type { IUser };

export interface UpdateProfilePayload {
  name?: string;
  bio?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  department?: IUser["department"];
}
