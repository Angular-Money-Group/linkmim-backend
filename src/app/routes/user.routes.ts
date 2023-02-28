import { Router } from "express";
import UserController from "../controller/user.controller";


const userRouter = Router();

userRouter.get("/user/:id", UserController.getUserInfo);
userRouter.put("/user/:id", UserController.updateUserInfo);
userRouter.delete("/user/:id", UserController.deleteUser);

export default userRouter;