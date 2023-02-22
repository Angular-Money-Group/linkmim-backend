import express from "express";
import dotenv from "dotenv";
import { connection } from "./app/db/database";
import authRouter from "./app/routes/auth.routes";
import swaggerUI from "swagger-ui-express";
import {docs} from "./app/docs/index";


dotenv.config();

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.swagger();
    this.middleware();
    this.router();
    this.connectDB();
  }

  private middleware() {
    this.server.use(express.json());
  }

  private connectDB() {
    // Connect to database
    connection()
  }

  private router() {
    this.server.use(authRouter)
  }

  private swagger() {
    this.server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs))
  }
}
