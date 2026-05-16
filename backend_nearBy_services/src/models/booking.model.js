import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Service } from "./service.model.js";

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },
    status: {
        type: String,
        enum: ["pending", "accept", "complete"],
        default: "pending"
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps: true })

export const Booking = mongoose.model("Booking",bookingSchema)
