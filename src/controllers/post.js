import {createService, getAllService, totalService} from "../services/post.js";


export async function getAll(req, res) {
    const {start = 0, limit = 10} = req.query;
    try {
        const posts = await getAllService({start, limit});
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(error.message).send(error.status);
    }
}

export async function create(req, res) {
    try {
        const {owner, title, body} = req.body
        const data = await createService({owner, title, body})
        res.status(200).send(data)
    } catch (error) {
        console.error(error);
        res.status(error.status).send(error.error)
    }
}

export async function total(req, res) {
    try {
        const posts = await totalService();
        res.json({amount: posts});
    } catch (error) {
        console.error(error);
        res.status(error.message).send(error.status);
    }
}