import {getRuntimeService, getTopCreatorService} from "../services/statistic.js";


export async function getTopCreator(req, res) {
    try {
        const topCreators = await getTopCreatorService()
        res.status(200).json(topCreators)
    } catch (error) {
        console.error(error)
        res.status(error.status).send(error.message)
    }
}

export async function getRuntime(req, res) {
    try {
        const statisticRuntimes = await getRuntimeService()
        res.status(200).json(statisticRuntimes)
    } catch (error) {
        console.error(error)
        res.status(error.status).send(error.message)
    }
}
