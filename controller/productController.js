import Product from "../models/productModels.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Features from "../utils/Features.js";

// creating product --Admin
export const createProduct = catchAsyncError(
  async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(
      req.body
    );
    res
      .status(200)
      .json({ success: true, product });
  }
);
// Get all products
export const getAllProducts = catchAsyncError(
  async (req, res, next) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const feature = new Features(
      Product.find(),
      req.query
    )
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await feature.query;
    res
      .status(200)
      .json({ success: true, products,productCount,resultPerPage });
  }
);

// update product --Admin
export const updateProduct = catchAsyncError(
  async (req, res, next) => {
    let product = await Product.findById(
      req.params.id
    );
    if (!product) {
      return next(
        new ErrorHandler("product not found", 404)
      );
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, product });
  }
);

// delete Product --Admin
export const deleteProduct = catchAsyncError(
  async (req, res, next) => {
    let product = await Product.findById(
      req.params.id
    );
    if (!product) {
      return next(
        new ErrorHandler("product not found", 404)
      );
    }
    product = await Product.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message:
        "Product has been deleted successfully",
    });
  }
);
// get single product Details
export const productDetails = catchAsyncError(
  async (req, res, next) => {
    let product = await Product.findById(
      req.params.id
    );
    if (!product) {
      return next(
        new ErrorHandler("product not found", 404)
      );
    }
    res
      .status(200)
      .json({ success: true, product });
  }
);

// creating review or updating the existing one
export const createReview = catchAsyncError(async(req,res,next)=>{
  const {rating,comment,productId} = req.body
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  const product = await Product.findById(productId)
  const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

  if(isReviewed){ 
    product.reviews.forEach((rev)=>{
      if(rev.user.toString() === req.user._id.toString())
        (rev.rating = rating),(rev.comment = comment)
    })
  }else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  let avg = 0
  product.reviews.forEach((rev)=>{
    avg+=rev.rating
  })
  product.ratings = avg/product.reviews.length
  
  await product.save({validateBeforeSave:false})
  res.status(200).json({success:true})
})

// getting all reviews of a product 
export const getReview = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.id)
  if(!product){
    return next(new ErrorHandler("Product not found",404))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })

})

// deleting the review 
export const deleteReview = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId)
  if(!product){
    return next(new ErrorHandler("Product not found",404))
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  )
  let avg = 0
  reviews.forEach((rev)=>{
    avg+=rev.rating
  })
  const ratings = avg / reviews.length
  const numOfReviews = reviews.length
  await product.findByIdAndUpdate()
  res.status(200).json({success:true})
})