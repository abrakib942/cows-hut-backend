"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const userSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExistByName = yield exports.User.findOne({
            name: {
                firstName: this.name.firstName,
                lastName: this.name.lastName,
            },
        });
        const isExistByPhoneNumber = yield exports.User.findOne({
            phoneNumber: this.phoneNumber,
        });
        if (isExistByName) {
            throw new ApiError_1.default(400, "User with name `" + this.name + "` already exist !");
        }
        else if (isExistByPhoneNumber) {
            throw new ApiError_1.default(400, "User with phone number `" + this.phoneNumber + "` already exist !");
        }
        if (this.role === "seller") {
            this.budget = 0;
        }
        else if (this.role === "buyer") {
            this.income = 0;
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);
