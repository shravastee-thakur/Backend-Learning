import express from "express";
import {
  Login,
  Logout,
  Refresh,
  Register,
} from "../controllers/authController.js";

import verifyAccessToken from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/refresh", Refresh);
router.post("/logout", Logout);

router.get(
  "/user-protected",
  verifyAccessToken,
  allowRoles("user", "admin"),
  (req, res) => {
    res.json({ message: "Hello User/Admin", user: req.user });
  }
);
router.get(
  "/admin-protected",
  verifyAccessToken,
  allowRoles("admin"),
  (req, res) => {
    res.json({ message: "Hello Admin", user: req.user });
  }
);

export default router;
