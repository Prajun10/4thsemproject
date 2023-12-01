import express from "express"
import { getAllProducts,createProduct, updateProduct, deleteProduct, productDetails, createReview, getReview, deleteReview } from "../controller/productController.js"
import { isAuthenticateUser,authorizedRoles } from "../middleware/auth.js"
const router = express.Router()

router.get("/products",getAllProducts,)
router.post("/admin/product/new",isAuthenticateUser,authorizedRoles("admin"),createProduct)
router.put("/admin/product/:id",isAuthenticateUser,authorizedRoles("admin"),updateProduct)
router.delete("/admin/product/:id",isAuthenticateUser,authorizedRoles("admin"),deleteProduct)
router.get("/product/:id",productDetails)
router.put("/review",isAuthenticateUser,createReview)
router.get("/reviews",getReview)
router.delete("/reviews",isAuthenticateUser,deleteReview)

export default router

