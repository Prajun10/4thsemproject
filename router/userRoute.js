import express from "express"
import {  deleteUser, getAUser, getAllUsers, getUserDetails, loginUser, logoutUser, registerUser, updateProfile, updateRole } from "../controller/userController.js"
const router = express.Router()
import {isAuthenticateUser,authorizedRoles} from "../middleware/auth.js"

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.get("/me",isAuthenticateUser,getUserDetails)
router.put("/me/update",isAuthenticateUser,updateProfile)
router.get("/admin/users",isAuthenticateUser,authorizedRoles("admin"),getAllUsers)
router.get("/admin/user/:id",isAuthenticateUser,authorizedRoles("admin"),getAUser)
router.put("/admin/user/:id",isAuthenticateUser,authorizedRoles("admin"),updateRole)
router.delete("/admin/user/:id",isAuthenticateUser,authorizedRoles("admin"),deleteUser)


export default router