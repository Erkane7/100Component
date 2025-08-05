import express from "express";
import { createProfile } from "../controller/profile.controller/create-profile";
import { getUserProfile } from "../controller/profile.controller/get-view-userName.controller";
import { getProfileExplore } from "../controller/profile.controller/get-explore-user";
import { updateProfile } from "../controller/profile.controller/update.controller";
import { getCurrentProfile } from "../controller/profile.controller/get-current-user";

const profileRouter = express.Router();

profileRouter.post("/:userId", createProfile);

profileRouter.get("/view/:username", getUserProfile);

profileRouter.get("/explore", getProfileExplore);

profileRouter.put("/:profileId", updateProfile);

profileRouter.get("/current-user", getCurrentProfile);

export default profileRouter;
