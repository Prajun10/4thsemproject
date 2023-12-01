import express from "express"
import { isAuthenticateUser,authorizedRoles } from "../middleware/auth.js"
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder,updateOrder } from "../controller/orderController.js"

const router = express.Router()

router.post("/order/new",isAuthenticateUser,newOrder)
router.put("/order/:id",isAuthenticateUser,getSingleOrder)
router.get("/orders/me",isAuthenticateUser,myOrders)
router.get("/admin/orders",isAuthenticateUser,authorizedRoles("admin"),getAllOrders)
router.put("/admin/order/:id",isAuthenticateUser,authorizedRoles("admin"),updateOrder)
router.delete("/admin/order/:id",isAuthenticateUser,authorizedRoles("admin"),deleteOrder)


export default router