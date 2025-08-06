import express from "express";
import { createProfile } from "../controller/profile.controller/create-profile";
import { getUserProfile } from "../controller/profile.controller/get-view-userName.controller";
import { getProfileExplore } from "../controller/profile.controller/get-explore-user";
import { updateProfile } from "../controller/profile.controller/update.controller";
import { getCurrentProfile } from "../controller/profile.controller/get-current-user";
import { authenticateToken } from "../middleware/authToken";

const profileRouter = express.Router();

profileRouter.post("/:userId", createProfile);

profileRouter.get("/view/:username", authenticateToken, getUserProfile);

profileRouter.get("/explore", getProfileExplore);

profileRouter.put("/:profileId", updateProfile);

profileRouter.get("/current-user", authenticateToken, getCurrentProfile);

export default profileRouter;
