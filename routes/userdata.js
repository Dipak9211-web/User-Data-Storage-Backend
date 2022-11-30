import express from "express";
const router = express.Router();

import {requireSignin} from '../middlewares/auth.js'
import {Profiles, ProfilesCount, searchProfiles} from '../controllers/userdata.js'

router.get("/profiles/count", requireSignin, ProfilesCount);
router.get("/profiles/:page", requireSignin, Profiles);
router.get("/profiles/search/:keyword", requireSignin, searchProfiles)

export default router;