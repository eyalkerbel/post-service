import PostModel from "../models/post.js";
import StatisticModel from "../models/statistic.js";
import UserModel from "../models/user.js";

export async function getTopCreatorService() {
    return UserModel.aggregate([
        {
            $sort: {postsCounts: -1}
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 0,
                name: 1,
                postsCounts: 1
            }
        }
    ])
}

export async function getRuntimeService() {
    return StatisticModel.aggregate([
        {
            $project: {
                _id: 0,
                name: 1,
                average_time: {
                    $ifNull: [
                        {$divide: ['$total_time', '$call_times']},
                        0
                    ]
                },
            }
        }
    ]).exec()
}

export async function updateStatistic(nameStatic, totalTime) {
    StatisticModel.findOneAndUpdate(
        {name: nameStatic},
        {$inc: {call_times: 1}, $set: {total_time: totalTime}},
        {upsert: true, new: true}
    ).exec()
}


