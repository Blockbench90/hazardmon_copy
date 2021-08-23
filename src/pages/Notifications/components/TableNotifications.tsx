import React, {useCallback} from "react";
import {Table} from "antd";
import clsx from "clsx";

import classes from "../Notifications.module.scss";

const NOTIFICATION_TYPES = {
    alarm_off: "Alarm Cleared",
    alarm_on: "Alarm Detected",
    device_administration: "Device administration",
    device_offline: "Device offline",
    device_online: "Device online",
    maintenance: "Maintenance",
    power_up: "Device Power Up",
    site_administration: "Site administration",
    sn2_status_change: "SN2 Status Change",
    test: "Test Email",
    warning_off: "Warning Cleared",
    warning_on: "Warning Detected",
};

interface TableProps {
    data: any;
    count: number;
    onPagesChange: (page: number, pageSize: number) => void;
    onChangeSort: (sorter: any) => void;
    pageNumber: number;
    sorting: { column: string, order: "ascend" | "descend" | false };
}

const TableNotifications: React.FC<TableProps> = ({
                                                      data,
                                                      count,
                                                      onPagesChange,
                                                      pageNumber,
                                                      onChangeSort,
                                                      sorting,
                                                  }) => {
    const handleChange = useCallback((pagination: any, filters: any, sorter: any) => {
        onChangeSort(sorter);
    }, [onChangeSort]);

    const handlePagesChange = (page: number, pageSize: number) => {
        onPagesChange(page, pageSize);
    };

    const columns: any = [
        {
            title: "DATE",
            dataIndex: "date_created",
            key: "date",
            sorter: true,
        },
        {
            title: "TIME",
            dataIndex: "time",
        },
        {
            title: "SITE",
            dataIndex: "location",
            key: "site",
            sorter: true,
        },
        {
            title: "DEVICE",
            dataIndex: "device",
            key: "device",
        },
        {
            title: "SENSOR",
            dataIndex: "sensor",
            key: "sensor",
        },
        {
            title: "TYPE",
            dataIndex: "event_type",
            key: "type",
            render(text: string) {
                return {
                    props: {
                        style: {background: text === "device_online" ? "#00E1B9" : text === "alarm_off" ? "#FFB983" : "#FF9492"},
                    },
                    // @ts-ignore
                    children: <div>{NOTIFICATION_TYPES[text] || text}</div>,
                };
            },
        },
        {
            title: "MESSAGE",
            dataIndex: "message",
            key: "message",
        },
        {
            title: "IN ALARM",
            dataIndex: "in_alarm",
            key: "in_alarm",
        },
    ];

    const mergedColumns = columns.map((col: any) => {
        return {
            ...col,
            sortOrder: col.sorter && sorting.column === col.dataIndex ? sorting.order : false,
            onCell: () => ({
                title: col.title,
                className:
                    clsx(col.title === "DATE" && classes.date,
                        col.title === "TIME" && classes.date,
                        col.title === "IN ALARM" && classes.date),
            }),
        };
    });

    return (
        <>
            <div className={classes.tableWrap}>
                <Table columns={mergedColumns}
                       dataSource={data}
                       onChange={handleChange}
                       size="small"
                       pagination={{
                           position: ["bottomCenter"],
                           showSizeChanger: false,
                           onChange: handlePagesChange,
                           current: pageNumber,
                           pageSize: 20,
                           total: count,
                       }}
                />
            </div>
        </>
    );
};

export default TableNotifications;
