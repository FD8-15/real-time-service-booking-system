import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"


const generateAccessAndRefreshTokens = async (user_id) => {
    try {
        const user = await User.findById(user_id)
        const accessToken = user.generateAccessTokens()
        const refreshToken = user.generateRefreshTokens()
        user.refreshToken = refreshToken
        await user.save()
        return { accessToken, refreshToken }
    } catch (error) {
        throw ApiError(404, "Failed to generate Access And RefreshTokens")
    }
}

const userRegister = asyncHandler(async (req, res) => {
    const { fullname, email, password, role } = req.body

    if ([fullname, email, password, role].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required")
    }

    const existUser = await User.findOne({
        $or: [
            { email },
            { fullname }
        ]
    })

    if (existUser) {
        throw new ApiError(402, "User already exist")
    }

    const localPathProfileImg = req.files?.profileImg[0]?.path

    if (!localPathProfileImg) {
        throw new ApiError(400, "profile image is required")
    }

    const profileImg = await uploadOnCloudinary(localPathProfileImg)

    if (!profileImg) {
        throw new ApiError(400, "Failed to upload")
    }

    const user = await User.create({
        fullname,
        email,
        role,
        password,
        profileImg: profileImg?.secure_url || ""
    })

    const createdUser = await User.findById(user._id).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, { createdUser }, "User created succesfully"))


})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!(email || password)) {
        throw new ApiError("400", "All fields are required")
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const isPassword = await user.isPasswordCorrect(password);

    if (!isPassword) {
        throw new ApiError(400, "Email or password is wrong")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            user: loggedInUser,
            accessToken,
            refreshToken
        });

})


const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(400, "Token not found")
        }

        const decodeToken = jwt.verify(token, REFRESH_TOKEN_SECRET)
        if (!decodeToken) {
            throw new ApiError(400, "Token failed to decode")
        }

        const user = await User.findById(decodeToken?._id)

        if (!user) {
            throw new ApiError(401, "User not found")
        }

        if (token !== user?.refreshToken) {
            throw new ApiError(400, "Refresh token expire or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "succesfully refreshAccessToken"))

    } catch (error) {
        throw new ApiError(403, "Failed to refresh accessToken")
    }


})
export { userRegister, login }