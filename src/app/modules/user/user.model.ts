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
      required: false,
      default: 0,
    },
    income: {
      type: Number,
      required: false,
      default: 0,
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

  if (this.role === "seller") {
    this.budget = 0;
  } else if (this.role === "buyer") {
    this.income = 0;
  }

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
