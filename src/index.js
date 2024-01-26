import dotenv from 'dotenv'
import {connectDB} from "./initializers/db.js";
import express from "express";
import postRoutes from "./routes/post.js";
import statisticRoutes from "./routes/statistic.js";
import {errors} from 'celebrate'

const app = express();

app.use(express.json())
app.use('', postRoutes)
app.use('/statistics', statisticRoutes)
app.use(errors())

dotenv.config()
connectDB()
const server = app.listen(process.env.PORT, () => {
    console.log(`The server on port ${process.env.PORT}`);
})

export {app, server}

