import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
