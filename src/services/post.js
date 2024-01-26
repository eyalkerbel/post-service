import PostModel from "../models/post.js";
import UserModel from "../models/user.js";


export async function createService(post) {
    const {title, user: userName, body} = post
    const user = await UserModel.findOneAndUpdate(
        {name: userName},
        {},
        {new: true, upsert: true}
    ).exec()

    const newPost = new PostModel({title, body, user: user._id})
    await newPost.save()
    return newPost
}

export async function getAllService({start, limit}) {
    return PostModel.find()
        .sort([['_id', -1]])
        .skip(start)
        .limit(limit)
        .populate('user', 'name postsCounts -_id')
        .exec()
}

export async function totalService() {
    return PostModel.countDocuments().exec()
}
