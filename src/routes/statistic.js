import express from 'express'
import {getRuntime, getTopCreator} from "../controllers/statistic.js";

const router = express.Router();

router.get("/topcreators", getTopCreator)
router.get("/runtimes", getRuntime)

export default router