import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GraphsDate} from "../../store/branches/graphs/stateTypes";

import HeaderSensorGraphs from "./components/HeaderSensorGraphs";
import SensorGraph from "../../components/GraphsChart/SensorGraph";
import GraphsAlert from "../../components/Alerts/graphs";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectGraphsState} from "../../store/selectors";
import {graphsAC} from "../../store/branches/graphs/actionCreators";

import classes from "./SensorGraphs.module.scss";


const SensorGraphsPage: React.FC = () => {
    const dispatch = useDispatch();

    const {graphsData, liveData, status, isLivePage} = useSelector(selectGraphsState);
    const {device} = useCurrentSelection();


    useEffect(() => {
        device && dispatch(graphsAC.fetchGraphsData({device_id: +device?.id, timescale: GraphsDate.day}));

        return () => {
            dispatch(graphsAC.clearGraphsState());
        };
    }, [dispatch, device]);


    return (
        <div className={classes.SensorGraphsWrap}>
            <GraphsAlert/>
            <HeaderSensorGraphs/>

            <div className={classes.mapBlock}>
                <SensorGraph sensorsGraphData={graphsData}
                             liveData={liveData}
                             sensorsGraphDataLoading={status}
                             isLivePage={isLivePage}
                             device={device}
                />
            </div>
        </div>
    );
};

export default SensorGraphsPage;
