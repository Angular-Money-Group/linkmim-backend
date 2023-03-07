import { Router } from "express";
import AuthController from "../controller/auth.controller";
import { generateTokens } from "../utils/autenticateToken.utils";
import cors from "cors";

const router = Router();

router.post("/login", cors(), AuthController.login);
router.post("/signup", cors(),AuthController.register);
router.post("/refresh",cors(), AuthController.refreshAccessToken);
router.post("/logout", cors(),generateTokens, AuthController.logout);

export default router;