import mongoose from "mongoose";


export function connectDB() {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
        console.log(`Database connected`)
    });
    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`)
    });
}

