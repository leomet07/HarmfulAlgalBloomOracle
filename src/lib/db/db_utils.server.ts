import { getDB } from "$lib/db/mongo.server";
import type { SpatialPredictionExported, LakeExported } from "$lib/types";

export async function getLakes() {
    const lakes = await getDB().collection("lakes").find({}).project<LakeExported>({ _id: 0 }).toArray();
    return lakes;
}

export async function getUniqueRasterDateStrings() {
    let dates: Date[] = await getDB().collection("spatial_predictions").distinct("date");
    dates.sort((a, b) => a.getTime() - b.getTime());
    return dates.map(v => v.toISOString().slice(0, 10)); // YYYY-MM-DD, removes all timezone and min/hour/sec information
}

export async function getSpatialPredictionMaps(query: any = {}) {
    let spatial_prediction_maps = await getDB().collection("spatial_predictions").find(query).project<SpatialPredictionExported>({ _id: 0, lake: 0 }).limit(50000).toArray();
    return spatial_prediction_maps;
}

export function getSpatialPredictionMapsByCorners(BBoxString: string) {
    let lats_lngs = BBoxString.split(",").map(Number);
    let query = {
        "corner1longitude": {
            "$gt": lats_lngs[0]
        },
        "corner2longitude": {
            "$lt": lats_lngs[2]
        },
        "corner2latitude": {
            "$gt": lats_lngs[1]
        },
        "corner1latitude": {
            "$lt": lats_lngs[3]
        },
    };
    return getSpatialPredictionMaps(query);
}

