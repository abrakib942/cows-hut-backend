import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
const app: Application = express();

// Application routes

// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

// app.get("/", (req, res) => {
//   res.send("app is running");
// });

//global error handler
app.use(globalErrorHandler);

export default app;
