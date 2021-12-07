import React from "react";
import {Table} from "antd";

import {mergedColumns} from "./Colums";
import {HistoricalData, HistoricalItem} from "../../../store/branches/sensors/stateTypes";
import {TableDataItem} from "../index";
import {generationDate, generationTime} from "../../../pages/Notifications/components/Colums";

import classes from "../Historical.module.scss";
import {useHistory, useParams} from "react-router-dom";
import { useDispatch } from "react-redux";
import {sensorsAC} from "../../../store/branches/sensors/actionCreators";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";


interface TableProps {
    historical_data: HistoricalData;
}

const HistoricalTable: React.FC<TableProps> = ({ historical_data}) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const {device} = useCurrentSelection()
    const {times}: any = useParams();
    const initTime = times?.split("&");

    const tableData1: TableDataItem[] = [];
    const tableData2: TableDataItem[] = [];
    const tableData3: TableDataItem[] = [];

    const tableSize = Math.floor(historical_data?.count / 3);
    const tableSize2 = tableSize * 2;
    const tableSize3 = tableSize * 3;

    historical_data?.results?.forEach((item: HistoricalItem, index: number) => {
        if (index < tableSize) {
            const tableItem: TableDataItem = {
                id: `id${index}`,
                key: item.timestamp,
                date: generationDate(item.timestamp),
                time: generationTime(item.timestamp),
                alarmed: item.status,
                record_id: item.record_id
            };
            return tableData1.push(tableItem);
        }
        if (index <= tableSize2) {
            const tableItem: TableDataItem = {
                id: `id${index}`,
                key: item.timestamp,
                date: generationDate(item.timestamp),
                time: generationTime(item.timestamp),
                alarmed: item.status,
                record_id: item.record_id
            };
            return tableData2.push(tableItem);
        }

        if (index <= tableSize3) {
            const tableItem: TableDataItem = {
                id: `id${index}`,
                key: item.timestamp,

                date: generationDate(item.timestamp),
                time: generationTime(item.timestamp),
                alarmed: item.status,
                record_id: item.record_id
            };
            tableData3.push(tableItem);
        }
        return null;
    });

    const handleSelectCollum = (collum: any) => {
        // console.log("collum ==>", collum?.key)
        dispatch(sensorsAC.getSnapshotSensors({isSnapshot: true, device_id: device?.id, record_id: collum?.record_id}))
        // const timescale = collum.key.split(" ");
        // history.push(`/graphs/historical/graphs/${timescale[0]}&${timescale[1]}`);
        history.push(`/dashboard/${collum?.key}`);
    };

    return (
        <React.Fragment>
            <div className={classes.tableWrap}>
                <div className={classes.table}>
                    <Table bordered
                           rowClassName={classes.row}
                           onRow={(collum) => {
                               return {
                                   onClick: () => {
                                       handleSelectCollum(collum);
                                   },
                               };
                           }}
                           dataSource={tableData1}
                           pagination={false}
                           columns={mergedColumns}
                    />
                </div>

                <div className={classes.table}>
                    <Table bordered
                           rowClassName={classes.row}
                           onRow={(collum) => {
                               const itemTime = collum.time.split(":").slice(0, 2).join(":")
                               const isCurrentTime = itemTime === initTime[1]
                               return {
                                   className: isCurrentTime && classes.currentTime,
                                   onClick: () => {
                                       handleSelectCollum(collum);
                                   },
                               };
                           }}
                           dataSource={tableData2}
                           pagination={false}
                           columns={mergedColumns}
                    />
                </div>

                <div className={classes.table}>
                    <Table bordered
                           rowClassName={classes.row}
                           onRow={(collum) => {
                               return {
                                   onClick: () => {
                                       handleSelectCollum(collum);
                                   },
                               };
                           }}
                           dataSource={tableData3}
                           pagination={false}
                           columns={mergedColumns}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
export default HistoricalTable;