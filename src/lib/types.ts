type StrictRecordModel = {
    id: string;
    created: string;
    updated: string;
    collectionId: string;
    collectionName: string;
}; // Same as pocketbase's record model, without the [key: string] : any

export type Lake = {
    name: string;
    latitude: number,
    longitude: number,
    lagoslakeid: number,
    expand?: {
        spatialPredictions: SpatialPredictionExported[],
        timeSeriesItem: TimeSeriesExported
    },
};

export type LakeExported = Lake & StrictRecordModel;

type SpatialPrediction = {
    raster_image: string;
    display_image: string;
    date: string; // pocketbase returns dates as strings
    scale: number;
    corner1latitude: number;
    corner1longitude: number;
    corner2latitude: number;
    corner2longitude: number;
    session_uuid: string;
    lagoslakeid: number;
    lake: string;
    satellite: string;
}

export type SpatialPredictionExported = SpatialPrediction & StrictRecordModel;

type TimeSeriesEntry = {
    graph: string;
}

export type TimeSeriesExported = TimeSeriesEntry & StrictRecordModel;