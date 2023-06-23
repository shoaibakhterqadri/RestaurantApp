import express from "express";
import {
    GetAllAdmin,
    GetAllUser,
    Login,
    Logout,
    Signup,
    UpdatePass,
    checkEmail,
    // getDashboardData,
    // getUserDetail,
} from "../controllers/User.js";
// import singleUpload from "../middleware/Multer.js";
import Authentication from "../middleware/Authentication.js";
const router = express.Router();
router.post("/login", Login);
router.post("/signup", Signup);
// router.post("/signup", singleUpload, Signup);
router.get("/allUser", GetAllUser);
router.get("/allAdmin", GetAllAdmin);
// router.get("/dashboardData", getDashboardData);
// router.get("/currentUser", getUserDetail);
router.post("/logout", Authentication, Logout);
router.put("/updatePass", UpdatePass);
router.post("/checkEmail", checkEmail);
export default router;
