import { Types } from "mongoose";

export interface JwtPayload {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: string; // user | owner
}