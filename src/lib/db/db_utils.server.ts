import { getDB } from "$lib/db/mongo.server";
import type { SpatialPredictionExported, LakeExported } from "$lib/types";

export async function getLakes() {
    const lakes = await getDB().collection("lakes").find({}).project<LakeExported>({ _id: 0 }).toArray();
    return lakes;
}

export async function getSpatialPredictionMaps() {
    let spatial_prediction_maps = await getDB().collection("spatial_predictions").find({}).project<SpatialPredictionExported>({ _id: 0, lake: 0 }).limit(50000).toArray();
    return spatial_prediction_maps;
}