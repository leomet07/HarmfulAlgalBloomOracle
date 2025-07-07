import { MONGO_URI } from '$env/static/private';
import { MongoClient, type Db } from 'mongodb';

const client: MongoClient = new MongoClient(MONGO_URI);

// connect to the database
export async function connect(): Promise<void> {
    await client.connect();
}

// get the database
export function getDB(): Db {
    return client.db();
}