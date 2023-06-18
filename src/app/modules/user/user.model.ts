import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import ApiError from "../../../errors/ApiError";

const userSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["seller", "buyer"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: false,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  const isExistByName = await User.findOne({
    name: {
      firstName: this.name.firstName,
      lastName: this.name.lastName,
    },
  });
  const isExistByPhoneNumber = await User.findOne({
    phoneNumber: this.phoneNumber,
  });

  if (isExistByName) {
    throw new ApiError(
      400,
      "User with name `" + this.name + "` already exist !"
    );
  } else if (isExistByPhoneNumber) {
    throw new ApiError(
      400,
      "User with phone number `" + this.phoneNumber + "` already exist !"
    );
  }

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
