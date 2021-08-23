import React from "react";
import {useSelector} from "react-redux";

import SearchBlock from "./components/SearchBlock";
import GraphsAlert from "../Alerts/graphs";
import SensorGraph from "../GraphsChart/SensorGraph";
import HeaderSensorGraphs from "../../pages/SensorGraphs/components/HeaderSensorGraphs";
import {selectGraphsState} from "../../store/selectors";

import classes from "./CustomHistoricalGraphs.module.scss";


const CustomHistoricalGraphs: React.FC = () => {
    const {graphsData, status} = useSelector(selectGraphsState);

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
