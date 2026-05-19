import mongoose from "mongoose";
import { User } from "./user.model.js";

const serviceSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

}, { timestamps: true })

serviceSchema.index({ location: "2dsphere" });

export const Service = mongoose.model("Service", serviceSchema)

