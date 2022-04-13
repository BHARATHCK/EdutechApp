import express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import cookieParser from "cookie-parser";
require("dotenv").config();
import cors from "cors";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    const oneDay = 1000 * 60 * 60 * 24;

    // Redis Client
    const redis = new Redis({
      host: process.env.REDIS_DB_HOST,
      password: process.env.REDIS_DB_PASSWORD || "",
      port: parseInt(
        process.env.REDIS_DB_PORT ? process.env.REDIS_DB_PORT : ""
      ),
    });

    // Redis store
    const redisStore = connectRedis(session);

    app.set("trust proxy", 1);

    // cors
    const corsOptions = {
      origin: [process.env.WEB_APP_URL || ""],
      credentials: true,
    };

    // set cors
    app.use(cors(corsOptions));

    // Redis session
    app.use(
      session({
        name: process.env.COOKIE_NAME,
        // eslint-disable-next-line new-cap
        store: new redisStore({
          client: redis,
          disableTouch: true,
        }),
        cookie: {
          maxAge: oneDay,
          httpOnly: true,
          secure: false, //cookie only in https
          sameSite: "none",
        },
        saveUninitialized: false,
        secret: process.env.REDIS_SESSION_SECRET || "",
        resave: false,
      })
    );

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(3000);

    console.log("port 3000. http://localhost:3000/users");
  })
  .catch((error) => console.log(error));
