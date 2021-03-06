import express from "express"
import mongoose from "mongoose"
import routes from "./routes"
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

try {
  if (mode === "development") {
    mongoose
      .connect(process.env.DEVELOPMENT_DB, { useNewUrlParser: true })
      .then(() => {
        console.log("DEV DB CONNECTED");
      });
  } else if (mode === "test") {
    mongoose
      .connect(process.env.TEST_DB, { useNewUrlParser: true })
      .then(() => {
        console.log("TEST DB CONNECTED");
      });
  } else if (mode === "production") {
    mongoose
      .connect(process.env.PRODUCTION_DB, { useNewUrlParser: true })
      .then(() => {
        console.log("PRODUCTION DB CONNECTED");
      });
  }
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());
  app.use(morgan("dev"));

  app.use("/api/v1/", routes);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("*", (req, res, next) => {
    res.status(404).json({
      error: "NOT FOUND",
    });
  });

  app.listen(port, () => {
    console.log(`The server is in ${mode} and running on port ${port}`);
  });
} catch (error) {
  console.log(error);
}

export default app;
