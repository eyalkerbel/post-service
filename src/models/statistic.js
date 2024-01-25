import mongoose from "mongoose";


const StatisticSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    call_times: {
        type: Number,
        default: 0
    },
    total_time: {
        type: Number,
        default: 0
    }
});

const StatisticModel = mongoose.model("Statistic", StatisticSchema);

export default StatisticModel;