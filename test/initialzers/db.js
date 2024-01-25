import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";


let mongod = null

export async function connectFakeDB() {
    try {
        mongod = await MongoMemoryServer.create();
        const dbUrl = mongod.getUri();
        await mongoose.connect(dbUrl, {});
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

export async function disconnectFakeDB() {
    try {
        await mongod.stop();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export async function clearFakeDB() {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
}