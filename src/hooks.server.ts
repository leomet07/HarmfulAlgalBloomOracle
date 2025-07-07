import { getLakes } from "$lib/db/db_utils.server";
import { connect } from '$lib/db/mongo.server';

// Connect to MongoDB before starting the server
connect().then((): void => {
    console.log("MongoDB started");

    getLakes()
}).catch((e: Error) => {
    console.log("MongoDB failed to start");
    console.log(e);
});