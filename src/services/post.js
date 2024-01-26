import PostModel from "../models/post.js";


export async function createService(createPost) {
    const post = new PostModel(createPost)
    await post.save()
}

export async function getAllService({start, limit}) {
    return PostModel.find().sort([['_id', -1]]).skip(start).limit(limit).exec()
}

export async function totalService() {
    return PostModel.countDocuments().exec();
}
