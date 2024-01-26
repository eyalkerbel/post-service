import mongoose from "mongoose";
import UserModel from "./user.js";


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {versionKey: false})

PostSchema.index({user: 1})

PostSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            await UserModel.updateOne({_id: this.user}, {$inc: {postsCounts: 1}}).exec()
            next()
        } catch (err) {
            next(err)
        }
    } else {
        next()
    }
});


const PostModel = mongoose.model("Post", PostSchema)

export default PostModel