import React, {ReactElement} from "react";
import {Tabs} from "antd";

import {ReactComponent as Export} from "../../../assets/icons/export_analytics.svg";
import SensorGraph from "./SensorGraph";
import Empty from "antd/lib/empty";
import TimeGraph from "./TimeGraph";
import TypeGraph from "./TypeGraph";

import classes from "../Analytics.module.scss";

const {TabPane} = Tabs;

interface AnalyticTabsProps {
    alarm_sensor_data: [];
    alarm_time_data: [];
    alarm_type_data: [];
    from: string;
    to: string;
}

interface PaneProps {
    data: [];
    from: string;
    to: string;
    children: ReactElement;
}

const Pane: React.FC<PaneProps> = ({data, from, to, children}) => {
    return <div className={classes.tabPane}>
        {
            data?.length > 0
                ?
                children
                :
                !from && !to
                    ?
                    <Empty description="Select date!"/>
                    :
                    <Empty description="There is no data!"/>
        }
    </div>;
};

const AnalyticTabs: React.FC<AnalyticTabsProps> = ({
                                                       alarm_sensor_data,
                                                       alarm_time_data,
                                                       alarm_type_data,
                                                       from,
                                                       to,
                                                   }) => {

    return (
        <div className={classes.tabsWrap}>
            <Tabs type="card" tabBarExtraContent={<Export/>}>
                <TabPane tab="SENSOR ALARMS SUMMARY" key="summary">
                    <Pane data={alarm_sensor_data} from={from} to={to}>
                        <SensorGraph sensorGraphDataInitial={alarm_sensor_data}
                                     from={from}
                                     to={to}
                        />
                    </Pane>
                </TabPane>
                <TabPane tab="TIME OF THE DAY ALARMS" key="time">
                    <div className={classes.tabPane}>
                        <Pane data={alarm_sensor_data} from={from} to={to}>
                                <TimeGraph timeGraphDataInitial={alarm_time_data}
                                           from={from}
                                           to={to}
                                />
                        </Pane>
                    </div>
                </TabPane>
                <TabPane tab="TYPE OF ALARMS" key="type">
                    <div className={classes.tabPane}>
                        <Pane data={alarm_sensor_data} from={from} to={to}>
                                <TypeGraph typeGraphDataInitial={alarm_type_data}
                                           from={from}
                                           to={to}
                                />
                        </Pane>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AnalyticTabs;