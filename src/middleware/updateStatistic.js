import {updateStatistic} from "../services/statistic.js";
import {CREATE_POST_NAME, GET_POSTS_NAME} from "../const.js";
import {performance} from 'perf_hooks'

export function updateStatisticMiddleware(req, res, next) {
    const start = performance.now();
    res.once('finish', () => {
        const diff = performance.now() - start;
        if (req.originalUrl === "/posts") {
            if (req.method === "GET") {
                updateStatistic(GET_POSTS_NAME, diff / 1000);
            }
            if (req.method === 'POST') {
                updateStatistic(CREATE_POST_NAME, diff / 1000);
            }
        }
    });
    next()
}