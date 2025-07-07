import { getDB } from "$lib/db/mongo.server";
import type { SpatialPredictionExported, LakeExported } from "$lib/types";
import type { Bounds, LatLngBounds } from "leaflet";


export async function getLakes() {
    const lakes = await getDB().collection("lakes").find({}).project<LakeExported>({ _id: 0 }).toArray();
    return lakes;
}

export async function getSpatialPredictionMaps(query: any = {}) {
    let spatial_prediction_maps = await getDB().collection("spatial_predictions").find(query).project<SpatialPredictionExported>({ _id: 0, lake: 0 }).limit(50000).toArray();
    return spatial_prediction_maps;
}

export function getSpatialPredictionMapsByCorners(BBoxString: string) {
    // return getSpatialPredictionMaps({
    //     "corner1longitude": {
    //         "gt": corners.getWest()
    //     },
    //     "corner2longitude": {
    //         "lt": corners.getEast()
    //     },
    //     "corner2latitude": {
    //         "gt": corners.getSouth()
    //     },
    //     "corner1latitude": {
    //         "lt": corners.getNorth()
    //     },
    // });
    // southwest_lng,southwest_lat,northeast_lng,northeast_lat
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

