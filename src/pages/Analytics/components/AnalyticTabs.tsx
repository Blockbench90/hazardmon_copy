import React, {ReactElement, useRef, useState} from "react";
import {Spin, Tabs} from "antd";

import {ReactComponent as Export} from "../../../assets/icons/export_analytics.svg";
import SensorGraph from "./SensorGraph";
import Empty from "antd/lib/empty";
import TimeGraph from "./TimeGraph";
import TypeGraph from "./TypeGraph";

import classes from "../Analytics.module.scss";
import {exportComponentAsPNG} from "react-component-export-image";

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
    const sensorRef = useRef();
    const timeRef = useRef();
    const alarmRef = useRef();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [key, setKey] = useState<string>("summary")

    const exportPNG = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const chartRef = key === "summary" ? sensorRef : (key === "time") ? timeRef : alarmRef
        try {
            setLoading(true);
            await exportComponentAsPNG(chartRef);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    const handleChangeTabs = (activeKey: string) => {
        console.log(activeKey);
        setKey(activeKey)
    }
    return (
        <div className={classes.tabsWrap}>
            <Tabs type="card"
                  onChange={handleChangeTabs}
                  tabBarExtraContent={
                      <div className={classes.export} onClick={(event) => exportPNG(event)}>
                          {isLoading ? <Spin/> : <Export/>}
                      </div>}>
                <TabPane tab="SENSOR ALARMS SUMMARY" key="summary">
                    <Pane data={alarm_sensor_data} from={from} to={to}>
                        <SensorGraph sensorGraphDataInitial={alarm_sensor_data}
                                     from={from}
                                     to={to}
                                     chartRef={sensorRef}
                        />
                    </Pane>
                </TabPane>
                <TabPane tab="TIME OF THE DAY ALARMS" key="time">
                    <div className={classes.tabPane}>
                        <Pane data={alarm_sensor_data} from={from} to={to}>
                            <TimeGraph timeGraphDataInitial={alarm_time_data}
                                       from={from}
                                       to={to}
                                       chartRef={timeRef}
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
                                       chartRef={alarmRef}
                            />
                        </Pane>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AnalyticTabs;