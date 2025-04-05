import express from "express";
import {
  Login,
  logout,
  refreshToken,
  Register,
} from "../Controller/authController.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
