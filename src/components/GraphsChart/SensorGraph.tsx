import React from "react";
import _ from "lodash";
import Empty from "antd/lib/empty";

import {LoadingStatus} from "../../store/types";
import {GraphsState} from "../../store/branches/graphs/stateTypes";

import RenderGraph from "../../pages/SensorGraphs/components/RenderGraph";

import classes from "./SensorGraph.module.scss";
import Spinner from "../Spinner";


interface SensorGraphProps {
    sensorsGraphData?: GraphsState["graphsData"]
    sensorsGraphDataLoading?: string
}

const defaultOptions = {
    chart: {
        animation: false,
    },
    credits: {
        enabled: false,
    },
    legend: {
        enabled: true,
    },
    plotOptions: {
        line: {
            turboThreshold: 10000,
        },
        marker: {
            enabled: false,
        },
        series: {
            showInNavigator: true,
            turboThreshold: 0,
        },
        shadow: false,
    },
    rangeSelector: {
        enabled: false,
        selected: 1,
    },
    scrollbar: {
        liveRedraw: false,
    },
    tooltip: {
        enabled: true,
    },
};


const SensorGraph: React.FC<SensorGraphProps> = ({
                                                     sensorsGraphData,
                                                     sensorsGraphDataLoading,
                                                 }) => {

    const insertEmptySlots = (sensorGraphData: any, maxPeriodParam: number) => {
        return _.map(sensorGraphData, (graphObj: any) => {
            const isBooleanGraph = ["BOOL", "ENUM"].indexOf(graphObj.sensor_type) !== -1;

            const maxPeriod = maxPeriodParam * 60 * 1.15 * 1000;  // To timestamp delta (in ms)
            const newData: any = [];
            graphObj.data.forEach((dataArray: any, index: number) => {
                newData.push(dataArray);
                if (graphObj.data[index + 1] && graphObj.data[index + 1][0] - graphObj.data[index][0] > maxPeriod) {
                    _.times(Math.round(graphObj.data[index + 1][0] / dataArray[0] + 1), (emptyIndex: number) => {
                        const x = dataArray[0] + (maxPeriod - 4000) * (emptyIndex + 1);
                        let emptyDataEntry = [x, null, true];

                        // edit entry for Contact graphs
                        if (isBooleanGraph) {
                            emptyDataEntry = emptyDataEntry.slice(0, -1).concat([false, "Disabled"]);
                        }

                        newData.push(emptyDataEntry);
                    });
                }
            });

            return {
                ...graphObj,
                data: newData,
            };
        });
    };

    const isLostComms = (state: string) => {
        return state === "Lost Communication Between T500 and node" || state === "Sensor Not Scanned by T500" || state === "Disabled";
    };

    if (sensorsGraphDataLoading === LoadingStatus.LOADING) {
        return <Spinner/>
    }

    if (sensorsGraphData && Object.keys(sensorsGraphData?.graphs)?.length === 0) {
        return <Empty description="graphs is empty!"/>;
    }

    return (
        <div className={classes.widget}>
            <div className={classes.widgetBody}>
                {_.map(sensorsGraphData?.graphs, (sensorGraphDataArray: any, index: number) => {
                    return (
                        <div className={classes.deviceBlock} key={`deviceName${index}`}>
                            <RenderGraph sensorGraphDataInitial={sensorGraphDataArray.series}
                                         groupName={sensorGraphDataArray.units}
                                         sensorGraphDataArray={sensorGraphDataArray}
                                         insertEmptySlots={insertEmptySlots}
                                         isLostComms={isLostComms}
                                         defaultOptions={defaultOptions}
                                         sensorId={index}
                            />
                        </div>);
                })}
            </div>
        </div>
    );
};


export default SensorGraph;
