import { getSpatialPredictionMapsByCorners } from "$lib/db/db_utils.server.js";
import { json } from '@sveltejs/kit';

export async function POST({ request }): Promise<Response> {
    let { BBoxString } = await request.json()

    let new_spatial_predictions = await getSpatialPredictionMapsByCorners(BBoxString);

    return json({
        spatialPredictions: new_spatial_predictions
    });
}
