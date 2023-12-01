import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

export const isAuthenticateUser = catchAsyncError(
  async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler(
          "You need to be logged in first",
          401
        )
      );
    }
    const decodedData = jwt.verify(
      token,
      process.env.JWT_SEC
    );
    req.user = await User.findById(
      decodedData.id
    );
    next();
  }
);

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this`,
          403
        )
      );
    }
    next(); 
  };
};
