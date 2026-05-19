import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getIO } from "../server.js";


const createBooking = asyncHandler(async (req, res) => {
    console.log("Controller hit");
    const { ServiceId } = req.body
    const io = getIO();

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

    io.to(service.provider.toString()).emit("booking created", {
        booking: Book
    })

    return res
        .status(200)
        .json(new ApiResponse(200, Book, "Booking created succesfully"))

})

const acceptBooking = asyncHandler(async (req, res) => {
    if (req.user.role !== "provider") {
        throw new ApiError(404, "Only provider can accept the booking")
    }

    const io = getIO();
    const accept = await Booking.findById(req.params._id)

    if (!accept) {
        throw new ApiError(400, "Accept not found")
    }

    if (accept.provider.toString() !== req.user._id.toString()) {
        throw new ApiError(400, "only created provider can accept the booking")
    }

    accept.status = "accept"
    await accept.save()

    const service_cat = await Service.findById(accept.service)

    if (!service_cat) {
        throw new ApiError(400, "Service not found ")
    }

    io.to(accept.user.toString()).emit("accept booking", {
        user: accept.user,
        service: accept.service,
        provider: accept.provider,
        category: service_cat.category
    })
    return res
        .status(200)
        .json(new ApiResponse(200, accept, "Accept succesfully"))

})

const compleate_service = asyncHandler(async (req, res) => {
    if (req.user.role != "provider") {
        throw new ApiError(400, "Only provider can change the status to compleate")
    }

    const io = getIO();
    const compleate = await Booking.findById(req.params._id)

    if (!compleate) {
        throw new ApiError(400, "Booking not found")
    }

    if (compleate.provider.toString() !== req.user._id.toString()) {
        throw new ApiError(400, "only service owner can change the status")
    }

    compleate.status = "complete"
    await compleate.save()

    const cat = await Service.findById(compleate.service)
    if (!cat) {
        throw new ApiError(400, "Service is not found")
    }

    io.to(compleate.user.toString()).emit("compleated", {
        user: compleate.user,
        service: compleate.service,
        provider: compleate.provider,
        category: cat.category
    })

    return res
        .status(200)
        .json(new ApiResponse(200, compleate, "Compleated succesfully"))

})
export { createBooking, acceptBooking, compleate_service }