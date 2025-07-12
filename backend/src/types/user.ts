import { Document } from 'mongoose';export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  first_name: string;
  last_name: string;
  confirmPassword: string;
}
