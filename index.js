import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import connectDB from "./functions/helpers/init_mongodb.js";
import UserRouter from "./functions/router/User.js";
import ProductRouter from "./functions/router/Product.js";
import cors from 'cors'
const defaultroute = express.Router();
import serverless from 'serverless-http';
dotenv.config();
const PORT = process.env.PORT;


const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, preflightContinue: true }));
//Router:
app.get("/", async (req, res) => {
    res.send("Hello Mai Tu");
});
app.use('/', defaultroute)
app.use('/user', UserRouter);
app.use('/product', ProductRouter);

app.use(async (req, res, next) => {
    next(createError.NotFound());
})


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
export const handler = serverless(app);
