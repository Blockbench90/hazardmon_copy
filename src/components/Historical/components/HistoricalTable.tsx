import React from "react";
import {Pagination, Table} from "antd";

import {mergedColumns} from "./Colums";
import {HistoricalData, HistoricalItem} from "../../../store/branches/sensors/stateTypes";
import {TableDataItem} from "../index";
import {generationDate, generationTime} from "../../../pages/Notifications/components/Colums";

import classes from "../Historical.module.scss";
import {useHistory} from "react-router-dom";


interface TableProps {
    historical_data: HistoricalData
    onPageChange: (page: number, pageSize: number) => void
    pagination: { page: number, pageSize: number }

}

const HistoricalTable: React.FC<TableProps> = ({
                                                   historical_data,
                                                   onPageChange,
                                                   pagination,
                                               }) => {
    const history = useHistory();

    const tableData1: TableDataItem[] = [];
    const tableData2: TableDataItem[] = [];
    const tableData3: TableDataItem[] = [];

    const tableSize = 20;

    historical_data?.results?.forEach((item: HistoricalItem, index: number) => {
        if (index < tableSize) {
            const tableItem: TableDataItem = {
                id: `id${index}`,
                key: item.timestamp,
                date: generationDate(item.timestamp),
                time: generationTime(item.timestamp),
                alarmed: item.status,
            };
            tableData1.push(tableItem);
            return;
        }
        if (index < tableSize * 2) {
            const tableItem: TableDataItem = {
                id: `id${index}`,
                key: item.timestamp,
                date: generationDate(item.timestamp),
                time: generationTime(item.timestamp),
                alarmed: item.status,
            };
            tableData2.push(tableItem);
            return;
        }
        if (index < tableSize * 3) {
            const tableItem: TableDataItem = {
                id: `id${index}`,
                key: item.timestamp,
                date: generationDate(item.timestamp),
                time: generationTime(item.timestamp),
                alarmed: item.status,
            };
            tableData3.push(tableItem);
            return;
        }
        return;

    });

    const handleSelectCollum = (collum: any) => {
        const timescale = collum.key.split(" ");
        history.push(`/graphs/historical/graphs/${timescale[0]}&${timescale[1]}`);
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
                               return {
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

            <div className={classes.pagination}>
                <Pagination total={historical_data?.count}
                            showSizeChanger={false}
                            onChange={onPageChange}
                            current={pagination.page}
                            pageSize={60}
                />
            </div>
        </React.Fragment>
    );
};
export default HistoricalTable;