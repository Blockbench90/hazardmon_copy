import {LoadingStatus} from "../../types";

export enum GraphsDate {
    hour = "hour",
    day = "day",
    week = "week",
    month = "month"

}

export interface FetchGraphs {
    device_id: number
    timescale: string
    sensor_id?: number
}

export interface FetchCustomGraphs {
    date: string
    time: string
    id: number
}

export interface Graphs {
    device: string
    device_name: string
    device_type: string
    graphs: {}
}

export interface GraphsState {
    graphsData: Graphs
    status: LoadingStatus
    status_operation: LoadingStatus
}
