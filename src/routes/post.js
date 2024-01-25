import express from 'express'
import {createPostController, getPostController, getPostsAmountController} from "../controllers/post.js";
import {updateStatisticMiddleware} from "../middleware/middleware.js";
import {createPostSchema, getPostsSchema} from "./schema.js";

const router = express.Router();

router.get("/posts", updateStatisticMiddleware, getPostsSchema, getPostController)
router.post("/posts", updateStatisticMiddleware, createPostSchema, createPostController)
router.get("/postsnumber", getPostsAmountController)

export default router