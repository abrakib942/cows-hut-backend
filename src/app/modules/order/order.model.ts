import { Schema, Types, model } from "mongoose";
import { ICow } from "../cow/cow.interface";
import { IUser } from "../user/user.interface";

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: "Cow",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", orderSchema);
