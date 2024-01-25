import PostModel from "../models/post.js";


export async function createPostService(createPost) {
    const post = new PostModel(createPost)
    await post.save()
}

export async function getPostsService({start, limit}) {
    return PostModel.find().sort([['_id', -1]]).skip(start).limit(limit).exec()
}

export async function getPostsAmountService() {
    return PostModel.countDocuments().exec();
}
