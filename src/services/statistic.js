import PostModel from "../models/post.js";
import StatisticModel from "../models/statistic.js";

export async function getTopCreatorService() {
    return PostModel.aggregate([
        {$group: {_id: '$owner', owner: {$first: '$owner'}, count: {$sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 10},
        {$project: {_id: 0, owner: 1, count: 1}}
    ]).exec();
}

export async function getStatisticRuntimeService() {
    const data = await StatisticModel.aggregate([
        {
            $project: {
                _id: 0,
                name: 1,
                average_time: {
                    $ifNull: [
                        { $divide: ['$total_time', '$called_amount'] },
                        0
                    ]
                },
            }
        }
    ]).exec()

    return data
}

export async function updateStatical(nameStatic, totalTime) {
         StatisticModel.findOneAndUpdate(
            {name: nameStatic},
            {$inc: {called_amount: 1}, $set: {total_time: totalTime}},
            {upsert: true, new: true}
        ).exec()
}


