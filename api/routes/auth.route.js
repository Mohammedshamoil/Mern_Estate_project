import express from "express";
import {
  google,
  signin,
  signup,
  singOut,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/singout", singOut);
export default router;
