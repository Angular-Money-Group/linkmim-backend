import express from "express";
import dotenv from "dotenv";

import { connection } from "./app/db/database";
import {docs} from "./app/docs/index";

import swaggerUI from "swagger-ui-express";

import authRouter from "./app/routes/auth.routes";
import userRouter from "./app/routes/user.routes";
import linksRouter from "./app/routes/links.routes";
import cors from "cors";


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
    const corsOptions = {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    this.server.use(express.json());
    this.server.use(cors(corsOptions));
  }

  private connectDB() {
    // Connect to database
    connection()
  }

  private router() {
    this.server.use(authRouter)
    this.server.use(userRouter)
    this.server.use(linksRouter)
  }

  private swagger() {
    this.server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs))
  }
}
