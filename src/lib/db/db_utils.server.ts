import { getDB } from "$lib/db/mongo.server";
import type { SpatialPredictionExported, LakeExported } from "$lib/types";

export async function getLakes() {
    const lakes = await getDB().collection("lakes").find<LakeExported>({}).toArray();
    console.log("Lakes: ", lakes);
    return lakes;
}

export async function getSpatialPredictionMaps() {
    const spatial_prediction_maps = await getDB().collection("spatial_predictions").find<SpatialPredictionExported>({}).toArray();
    return spatial_prediction_maps;
}