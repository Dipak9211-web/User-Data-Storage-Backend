import express from "express";
const router = express.Router();

import {requireSignin} from '../middlewares/auth.js'
import {Register, Login} from '../controllers/auth.js'

router.post("/register", Register);
router.post("/login", Login);
router.get("/auth-check", requireSignin, (req, res) => {
    res.json({ ok: true });
  });

export default router