import React, {useCallback, useEffect, useRef} from "react";
import _ from "lodash";
import {useDispatch} from "react-redux";
import Empty from "antd/lib/empty";

import {LoadingStatus} from "../../store/status";
import {GraphsState} from "../../store/branches/graphs/stateTypes";
import {graphsAC} from "../../store/branches/graphs/actionCreators";

import Spinner from "../Spinner";
import RenderGraph from "../../pages/SensorGraphs/components/RenderGraph";

import classes from "./SensorGraph.module.scss";


interface SensorGraphProps {
    sensorsGraphData?: GraphsState["graphsData"]
    liveData?: GraphsState["graphsData"]
    sensorsGraphDataLoading?: string
    isLivePage?: boolean
    device?: { id: number, title: string, udf_id: string, device_type: string }
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
            animation: false,
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
                                                     liveData,
                                                     sensorsGraphDataLoading,
                                                     isLivePage,
                                                     device,
                                                 }) => {
    const dispatch = useDispatch();
    const intervalId = useRef<NodeJS.Timeout>(null);

    const fetchLiveData = useCallback(() => {
        dispatch(graphsAC.updateLiveGraphsData(device.id));
    }, [dispatch, device?.id]);


    useEffect(() => {
        if (isLivePage) {
            intervalId.current = setInterval(() => {
                fetchLiveData();
            }, 2000);
        } else {
            clearInterval(intervalId.current);
        }

        return () => {
            clearInterval(intervalId.current);
            dispatch(graphsAC.clearLiveData());
        };
    }, [isLivePage, fetchLiveData, dispatch]);


    const isLostComms = (state: string) => {
        return state === "Lost Communication Between T500 and node" || state === "Sensor Not Scanned by T500" || state === "Disabled";
    };

    if (sensorsGraphDataLoading === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    if (sensorsGraphData && Object.keys(sensorsGraphData?.graphs)?.length === 0) {
        return <Empty description="graphs is empty!"/>;
    }


    if (isLivePage) {
        if (liveData) {

            return (
                <div className={classes.widget}>
                    <div className={classes.widgetLiveBody}>
                        {_.map(liveData?.graphs, (sensorGraphDataArray: any, index: number) => {
                            return (
                                <div className={classes.deviceBlock} key={`deviceName{index}`}>
                                    <RenderGraph sensorGraphDataInitial={sensorGraphDataArray.series}
                                                 groupName={sensorGraphDataArray.units}
                                                 sensorGraphDataArray={sensorGraphDataArray}
                                                 isLivePage={isLivePage}
                                                 isLostComms={isLostComms}
                                                 defaultOptions={defaultOptions}
                                                 sensorId={index}
                                    />
                                </div>);
                        })}
                    </div>
                </div>
            );
        } else {
            return <Spinner/>;
        }
    }

    return (
        <div className={classes.widget}>
            <div className={classes.widgetBody}>
                {_.map(sensorsGraphData?.graphs, (sensorGraphDataArray: any, index: number) => {
                    return (
                        <div className={classes.deviceBlock} key={`deviceName{index}`}>
                            <RenderGraph sensorGraphDataInitial={sensorGraphDataArray.series}
                                         groupName={sensorGraphDataArray.units}
                                         sensorGraphDataArray={sensorGraphDataArray}
                                         isLivePage={isLivePage}
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
