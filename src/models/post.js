import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },

});

PostSchema.index({owner: 1});
const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;