import { getDB } from "$lib/db/mongo.server";
import type { SpatialPredictionExported, LakeExported } from "$lib/types";

export async function getLakes() {
    const lakes = await getDB().collection("lakes").find<LakeExported>({}).toArray();
    console.log("Lakes: ", lakes);
    return lakes;
}

export async function getSpatialPredictionMaps() {
    const spatial_prediction_maps = await getDB().collection("spatial_predictions").find<SpatialPredictionExported>({}).toArray();
    // const spatial_prediction_maps = await pb.collection('spatialPredictionMaps').getFullList<SpatialPredictionExported>({ batch: 100000, requestKey: null });
    return []
}