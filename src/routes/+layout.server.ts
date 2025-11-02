import { getLakes, getUniqueRasterDateStrings } from "$lib/db/db_utils.server";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
    let [lakes, uniqueRasterDateStrings] = await Promise.all([getLakes(), getUniqueRasterDateStrings()]);

    return {
        lakes: lakes,
        spatialPredictions: [],
        uniqueRasterDateStrings: uniqueRasterDateStrings
    }
};
