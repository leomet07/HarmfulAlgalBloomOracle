import { getLakes, getSpatialPredictionMaps } from "$lib/db/db_utils.server";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
    const [lakes, spatialPredictions] = await Promise.all([getLakes(), getSpatialPredictionMaps()]);

    let simpleRasterDates: Date[] = []
    for (const spatialPredictionMap of spatialPredictions) {
        simpleRasterDates.push(spatialPredictionMap.date);
    }

    // make dates unique
    simpleRasterDates = Array.from(new Set(simpleRasterDates));
    simpleRasterDates.sort();
    return {
        lakes,
        spatialPredictions,
        simpleRasterDates
    }
};
