import linksController from "../controller/links.controller";
import { Router } from "express";

const linksRouter = Router();

linksRouter.get("/links/:id", linksController.getLinks);
linksRouter.post("/links/:id", linksController.createLink);
linksRouter.put("/links/:id", linksController.updateLink);
linksRouter.delete("/links/:id", linksController.deleteLink);

export default linksRouter;