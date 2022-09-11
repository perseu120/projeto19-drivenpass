import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import authRouter from "./routers/authRouter";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);
app.use(errorHandler)

const PORT = Number(process.env.PORT) ;

app.listen(PORT, () => {
  console.log(`Server com TS rodando na porta: ${PORT}`);
});

