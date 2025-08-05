import express from "express";
import { createUser } from "../controller/user/create-user";
import { getUsers } from "../controller/user/get-users";
import { getUsersWithProfile } from "../controller/user/get-user-with-profile";
import { UpdateUser } from "../controller/user/put-userUpdate";
import { SignIn } from "../controller/user/sign-in";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);

userRouter.get("/get-users", getUsers);

userRouter.get("/get-users-with-profile", getUsersWithProfile);

userRouter.put("/update-user/:id", UpdateUser);

userRouter.post("/sign-in", SignIn);

export default userRouter;
