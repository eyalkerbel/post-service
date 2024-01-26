import {getRuntimeService, getTopCreatorService} from "../services/statistic.js";


export async function getTopCreator(req, res) {
    try {
        const topCreators = await getTopCreatorService();
        res.json(topCreators);
    } catch (error) {
        console.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function getRuntimeController(req, res) {
    try {
        const statisticRuntimes = await getRuntimeService();
        res.json(statisticRuntimes);
    } catch (error) {
        console.error(error);
        res.status(error.status).send(error.message);
    }
}
