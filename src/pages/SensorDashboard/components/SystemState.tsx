import React from "react";
import {Collapse} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import clsx from "clsx";

import {WsDataSensors} from "../../../store/branches/sensors/stateTypes";

import classes from "../SensorDashboard.module.scss";

interface SystemTableProps {
    data?: WsDataSensors
}

const {Panel} = Collapse;

const SystemTable: React.FC<SystemTableProps> = ({
                                                     data,
                                                 }) => {


    const text = <div>
        <div className={classes.systemTableWrap}>
            <div className={classes.columnNetwork}>Network (Network Name)</div>
            <div className={classes.columnStatus}>F500 Status</div>
            <div className={classes.columnNumber}>Number of Active Nodes / Blocks</div>
            <div className={classes.columnActivity}>Activity Counter</div>
        </div>
        {data && data?.groups?.map((item, index) => {

            return <div className={classes.systemTable} key={item.Id}>

                <div className={classes.columnNetwork}>
                    {item?.Name}
                </div>
                <div className={clsx(item?.Status === "OK" && classes.statusOK, classes.columnStatus)}>
                    {item?.Status}
                </div>
                <div className={classes.columnNumber}>
                    {item?.Meta?.Nodes || "0"} / {item?.Meta?.Blocks || 0}
                </div>
                <div className={classes.columnActivity}>
                    {item?.Meta.Activity || "0"}
                </div>
            </div>;
        })}
    </div>;

    return (
        <div>
            <Collapse bordered={false}
                      ghost
                      expandIconPosition={"right"}
                      expandIcon={({isActive}) => <CaretRightOutlined style={{color: "#27AE60", fontSize: "18px"}}
                                                                      rotate={isActive ? 90 : 0}/>}>
                <Panel header="System State" key="State" showArrow={false}>
                    {text}
                </Panel>
            </Collapse>
        </div>
    );
};

export default SystemTable;
