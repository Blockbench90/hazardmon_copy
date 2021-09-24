import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import SearchBlock from "./components/SearchBlock";
import GraphsAlert from "../Alerts/graphs";
import SensorGraph from "../GraphsChart/SensorGraph";
import HeaderSensorGraphs from "../../pages/SensorGraphs/components/HeaderSensorGraphs";
import {selectGraphsState} from "../../store/selectors";

import classes from "./CustomHistoricalGraphs.module.scss";
import {useParams} from "react-router-dom";
import {graphsAC} from "../../store/branches/graphs/actionCreators";
import {LoadingStatus} from "../../store/status";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import moment from "moment";


const CustomHistoricalGraphs: React.FC = () => {
    const dispatch = useDispatch();

    const {device} = useCurrentSelection();
    const {graphsData, status} = useSelector(selectGraphsState);
    const {times}: any = useParams();

    const date = times?.split("&")[0];
    const time = times?.split("&")[1].split(":").slice(0, 2).join(":");

    const startMonth = moment().startOf("month").format("YYYY-MM-DD");
    const today = moment().format("HH:MM");

    useEffect(() => {
        if (!device) {
            dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.WITHOUT_SELECTED_DEVICE_GRAPHS_ERROR));
            return;
        }
        const payload = {
            date: date ? date : startMonth,
            time: time ? time : today,
            id: device?.id,
        };

        dispatch(graphsAC.fetchCustomGraphsData(payload));

        return () => {
            dispatch(graphsAC.clearGraphsState());
        };
    }, [dispatch, device, date, time, startMonth, today]);

    return (
        <React.Fragment>
            <GraphsAlert/>
            <HeaderSensorGraphs/>
            <SearchBlock/>

            <div className={classes.graphsWrap}>
                <SensorGraph sensorsGraphData={graphsData} sensorsGraphDataLoading={status}/>
            </div>

        </React.Fragment>
    );
};

export default CustomHistoricalGraphs;
