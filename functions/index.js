// import express from "express";
// import morgan from "morgan";
// import createError from "http-errors";
// import dotenv from "dotenv";
// import connectDB from "./helpers/init_mongodb.js";
// import UserRouter from "./router/User.js";
// import ProductRouter from "./router/Product.js";
// import cors from 'cors'
// const defaultroute = express.Router();
// import serverless from 'serverless-http';
// dotenv.config();
// const PORT = process.env.PORT;


// const app = express();
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, preflightContinue: true }));
// //Router:
// app.get("/", async (req, res) => {
//     res.send("Hello Mai Tu");
// });
// app.use('/.netlify/functions/api', defaultroute)
// app.use('/user', UserRouter);
// app.use('/product', ProductRouter);

// app.use(async (req, res, next) => {
//     next(createError.NotFound());
// })


// // app.use((err, req, res, next) => {
// //     res.status(err.status || 500);
// //     res.send({
// //         error: {
// //             status: err.status || 500,
// //             message: err.message,
// //         }
// //     });
// // });

// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server running on port ${PORT}`);
// })
// export const handler = serverless(app);

const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

let records = [];


router.get('/', (req, res) => {
    res.send('App is running..');
});

router.post('/add', (req, res) => {
    res.send('New record added.');
});

router.delete('/', (req, res) => {
    res.send('Deleted existing record');
});

router.put('/', (req, res) => {
    res.send('Updating existing record');
});


router.get('/demo', (req, res) => {
    res.json([
        {
            id: '001',
            name: 'Aayush',
        },
        {
            id: '002',
            name: 'rohit',
        },
        {
            id: '003',
            name: 'Mohit',
        },
    ]);
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);