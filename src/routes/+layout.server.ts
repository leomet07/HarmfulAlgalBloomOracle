import { getLakes, getUniqueRasterDates } from "$lib/db/db_utils.server";
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
    let [lakes, uniqueRasterDates] = await Promise.all([getLakes(), getUniqueRasterDates()]);

    return {
        lakes: lakes,
        spatialPredictions: [],
        uniqueRasterDates: uniqueRasterDates
    }
};
