import Order from "../models/orderModels.js"
import Product from "../models/productModels.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// creating new order
export const newOrder = catchAsyncError(async(req,res,next)=>{
    const {orderItems,paymentInfo,itemsPrice,totalPrice} = req.body
    const order = await Order.create({
        orderItems,
        paymentInfo,
        itemsPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })
    res.status(200).json({
        success:true,
        order
    })
})

// get single order 
export const getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

// get logged in my orders
export const myOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json({
        success:true,
        orders
    })
})

// get all orders
export const getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find()

    let totalAmt = 0
    orders.forEach((order)=>{
        totalAmt += order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmt,
        orders
    })
})

// updating order status --admin
export const updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("This order has been already delivered",400))
    }
    order.orderItems.forEach(async(order)=>{
        await updateStock(order.Product,order.quantity)
    })
    order.orderStatus = req.body.status
    if(req.body.status==="Delivered"){
        order.deliveredAt = Date.now()
    }
    await order.save()
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stocks-=quantity
    await product.save()
}

// delete order --admin
export const deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }
    await order.deleteOne()
    res.status(200).json({
        success:true
    })
})
