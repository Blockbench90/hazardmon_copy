import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Empty from "antd/lib/empty";

import HistoricalHeader from "./components/HistoricalHeader";
import SearchBlock from "./components/SearchBlock";
import DashboardAlert from "../Alerts/dachboard";
import {LoadingStatus} from "../../store/status";
import Preloader from "../Preloader";
import HistoricalTable from "./components/HistoricalTable";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectSensorsState} from "../../store/selectors";
import {useParams} from "react-router-dom";

export interface TableDataItem {
    id: string
    key: string
    date: string
    time: string
    alarmed: string
}

const Historical: React.FC = () => {
        const dispatch = useDispatch();

        const {times}: any = useParams();
        const initTime = times?.split("&");

        const [pagination, setPagination] = useState({page: 1, pageSize: 60});
        const [currentTime, setCurrentTime] = useState<{ date: string, time: string }>(null);

        const {historical_data, status} = useSelector(selectSensorsState);
        const {device} = useCurrentSelection();

        const onPageChange = (page: number, pageSize: number) => {
            setPagination({page, pageSize});
            const payload = {
                date: currentTime ? currentTime?.date : initTime[0],
                time: currentTime ? currentTime?.time : initTime[1],
                device_id: device?.id,
                limit: pageSize,
                offset: pageSize * (page - 1),
            };
            dispatch(sensorsAC.fetchHistoricalGraphs(payload));
        };

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
                    <SearchBlock limit={pagination.pageSize}
                                 offset={pagination.pageSize * (pagination.page - 1)}
                                 setCurrentTime={setCurrentTime}
                                 setPagination={setPagination}
                    />

                    {
                        historical_data
                            ?
                            <HistoricalTable historical_data={historical_data}
                                             pagination={pagination}
                                             onPageChange={onPageChange}

                            />
                            :
                            <Empty description="Historical list is empty!"/>
                    }

                </React.Fragment>
            </Preloader>
        );
    }
;

export default Historical;
