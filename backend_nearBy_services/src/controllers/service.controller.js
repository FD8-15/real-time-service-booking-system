import mongoose from "mongoose";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createService = asyncHandler(async (req, res) => {
    const { name, category, location } = req.body

    if (req.user.role !== "provider") {
        throw new ApiError(400, "only provider can create the service")
    }
    if (!name && !category) {
        throw new ApiError(400, "Name and category is required")
    }

    const service = await Service.create({
        provider: req.user?._id,
        name,
        category,
        location
    })

    return res
        .status(200)
        .json(new ApiResponse(200, { service }, "service created succesfully"))
})

const getService = asyncHandler(async (req, res) => {
    const { lat, lng, dist = 7000 } = req.body

    const service = await Service.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                $maxDistance: parseFloat(dist)
            }
        }
    })

    return res
        .status(200)
        .json(new ApiResponse(200, { service }, "succesfully fetched all nearby services"))
})

export { createService, getService }