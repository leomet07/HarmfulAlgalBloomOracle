import type { ServerInit } from '@sveltejs/kit';
import { connect } from '$lib/db/mongo.server';

export const init: ServerInit = async () => {
    connect().then((): void => {
        console.log("Connected to MongoDB!");
    }).catch((e: Error) => {
        console.log("Failed to connect to mongodb.");
        console.log(e);
    });
};