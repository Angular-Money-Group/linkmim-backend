import { Router } from "express";
import AuthController from "../controller/auth.controller";
import { generateTokens } from "../utils/autenticateToken.utils";

const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.register);
router.post("/refresh", AuthController.refreshAccessToken);
router.post("/logout", generateTokens, AuthController.logout);

export default router;