import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"
    
    // if wrong mongodb id error occur
    
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

export default errorMiddleware