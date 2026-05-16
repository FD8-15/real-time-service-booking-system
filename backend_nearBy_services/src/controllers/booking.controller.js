import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBooking = asyncHandler(async (req, res) => {
    console.log("Controller hit");
    const { ServiceId } = req.body

    if (req.user.role !== "user") {
        throw new ApiError(400, "Only user can book the service")
    }

    const service = await Service.findById(ServiceId)
    if (!service) {
        throw new ApiError(400, "Provider not found")
    }

    const Book = await Booking.create({
        user: req.user._id,
        service: ServiceId,
        provider: service.provider
    })
    return res
        .status(200)
        .json(new ApiResponse(200, Book, "Booking created succesfully"))

})

const acceptBooking = asyncHandler(async (req, res) => {
    if (req.user.role !== "provider") {
        throw new ApiError(404, "Only provider can accept the booking")
    }

    const accept = await Booking.findById(req.params._id)
    
    if (!accept) {
        throw new ApiError(400, "Accept not found")
    }

    if (accept.provider.toString() !== req.user._id.toString()) {

        throw new ApiError(400, "only created provider can accept the booking")
    }

    accept.status = "accept"
    await accept.save()

    return res
        .status(200)
        .json(new ApiResponse(200, accept, "Accept succesfully"))

})
export { createBooking, acceptBooking }