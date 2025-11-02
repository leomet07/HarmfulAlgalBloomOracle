import { getLakes, getSpatialPredictionMaps } from "$lib/db/db_utils.server";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
    // const [lakes, spatialPredictions] = await Promise.all([getLakes(), getSpatialPredictionMaps()]);

    // let simpleRasterDates: Date[] = []
    // for (const spatialPredictionMap of spatialPredictions) {
    //     simpleRasterDates.push(spatialPredictionMap.date);
    // }

    // // make dates unique
    // simpleRasterDates = [...new Set(simpleRasterDates.map(r => r.getTime()))].map((r: number) => (new Date(r)));
    // simpleRasterDates.sort();
    return {
        lakes: [],
        spatialPredictions: [],
        simpleRasterDates: []
    }
};
