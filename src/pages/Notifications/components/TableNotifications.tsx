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
    sensor_disappeared: "Sensor Disappeared"
};

const NOTIFICATION_TYPES_COLOR = {
    alarm_off: "#FFB983",
    alarm_on: "#F14D49",
    device_administration: "#2F80ED",
    device_offline: "#2F80ED",
    device_online: "#00E1B9",
    maintenance: "#2F80ED",
    sensor_disappeared: "#2F80ED",
    power_up: "#27AE60",
    site_administration: "#27AE60",
    sn2_status_change: "#27AE60",
    test: "#27AE60",
    warning_off: "#27AE60",
    warning_on: "#F47E21",
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
            ellipsis: false,
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
            filterDropdownVisible: false
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
                        style: {background: NOTIFICATION_TYPES_COLOR[text]},
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
            render: (_: any, record: any) => {
                const in_alarm = record?.in_alarm?.split(":").slice(0,2).join(":")
                return <div>{in_alarm}</div>;
            },
        },
    ];

    const mergedColumns = columns.map((col: any) => {
        return {
            ...col,
            sortOrder: col.sorter && sorting.column === col.dataIndex ? sorting.order : false,
            onCell: () => ({
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
                       className={classes.tableNotifications}
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
