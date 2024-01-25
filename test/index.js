import express from "express";
import statisticRoutes from './../src/routes/statistic.js'
import postRoutes from './../src/routes/post.js'
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use('', postRoutes)
app.use('/statistics', statisticRoutes)
const server = app.listen(process.env.TEST_PORT, () => {
    console.log(`The server on port ${process.env.TEST_PORT}`);
});


export {app, server}

