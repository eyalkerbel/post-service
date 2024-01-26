import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postsCounts: {
        type: Number,
        required: true,
        default: 0
    }
}, {versionKey: false})

UserSchema.index({name: 1})
const UserModel = mongoose.model("User", UserSchema)

export default UserModel