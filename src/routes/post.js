import express from 'express'
import {create, getAll, total} from "../controllers/post.js";
import {updateStatisticMiddleware} from "../middleware/updateStatistic.js";
import {createPostSchema, getPostsSchema} from "./schema.js";

const router = express.Router();

router.get("/posts", updateStatisticMiddleware, getPostsSchema, getAll);
router.post("/posts", updateStatisticMiddleware, createPostSchema, create)
router.get("/postsnumber", total)

export default router