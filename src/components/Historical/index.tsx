import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Empty from "antd/lib/empty";

import HistoricalHeader from "./components/HistoricalHeader";
import SearchBlock from "./components/SearchBlock";
import DashboardAlert from "../Alerts/dachboard";
import {LoadingStatus} from "../../store/status";
import Preloader from "../Preloader";
import HistoricalTable from "./components/HistoricalTable";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {selectSensorsState} from "../../store/selectors";
import {useParams} from "react-router-dom";

export interface TableDataItem {
    id: string;
    key: string;
    date: string;
    time: string;
    alarmed: string;
    record_id: string;
}

const Historical: React.FC = () => {
        const dispatch = useDispatch();

        const {times}: any = useParams();
        const initTime = times?.split("&");
        const {historical_data, status} = useSelector(selectSensorsState);

        useEffect(() => {
            if (!initTime) {
                dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_HISTORICAL_DATE));
                return;
            }
        }, [dispatch, initTime]);

        return (
            <Preloader isLoaded={status === LoadingStatus.LOADING}>
                <React.Fragment>
                    <DashboardAlert/>
                    <HistoricalHeader/>
                    <SearchBlock/>

                    {
                        historical_data
                            ?
                            <HistoricalTable historical_data={historical_data}/>
                            :
                            <Empty description="Historical list is empty!"/>
                    }

                </React.Fragment>
            </Preloader>
        );
    }
;

export default Historical;
