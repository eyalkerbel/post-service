import express from 'express'
import {getRuntimeController, getTopCreator} from "../controllers/statistic.js";

const router = express.Router();

router.get("/topcreators", getTopCreator)
router.get("/runtimes", getRuntimeController)

export default router