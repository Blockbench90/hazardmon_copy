import React, {useEffect, useState} from "react";
import {Select, Switch, Tabs} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {ReactComponent as Live} from "../../assets/icons/live.svg";
import {ReactComponent as Historical} from "../../assets/icons/historical.svg";
import {ReactComponent as Maintenance} from "../../assets/icons/maintenance.svg";

import DataModal from "../DataModal";
import {FilterStatus} from "../../store/branches/sensors/stateTypes";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {LoadingStatus} from "../../store/status";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectSensorsState} from "../../store/selectors";

import classes from "./modal.module.scss";

const {Option} = Select;
const {TabPane} = Tabs;

const TabsSensorDashboard: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {pathname} = useLocation();

    const [path, setPath] = useState<"live" | "historical" | "maintenance">("live");
    const [modal, setModal] = useState(false);

    const {ws_data, isMaintenance} = useSelector(selectSensorsState);
    const {device} = useCurrentSelection();

    useEffect(() => {
        if (pathname.split("/").includes("historical")) {
            setPath("historical");
        } else {
            setPath("live");
        }
    }, [pathname]);

    useEffect(() => {
        if (isMaintenance) {
            setPath("maintenance");
        }
    }, [isMaintenance]);

    const liveMaintenance = () => {
        dispatch(sensorsAC.setMaintenancePage(false));
    };

    const setVisibleModal = () => {
        setModal(true);
        liveMaintenance();
    };

    const onLive = () => {
        history.push("/dashboard");
        liveMaintenance();
    };

    const setTimer = () => {
        setTimeout(() => {
            dispatch(sensorsAC.setMaintenanceStatusOperation(LoadingStatus.NEVER));
        }, 1500);
    };

    const onMaintenance = () => {
        dispatch(sensorsAC.setMaintenanceStatusOperation(LoadingStatus.LOADING));
        dispatch(sensorsAC.setMaintenancePage(true));
        setTimer();
    };

    const handleSelectNodes = (values: any) => {
        dispatch(sensorsAC.changeFilterStatusSensors(values));
    };

    const onSwitchNodes = (checked: boolean) => {
        checked
            ? dispatch(sensorsAC.changeFilterStatusSensors(FilterStatus.ALL_NODES))
            : dispatch(sensorsAC.changeFilterStatusSensors(FilterStatus.ACTIVE));
    };

    const onCancel = () => {
        setModal(false);
    };

    const onSearch = ({date, time}: { date: string, time: string }) => {
        if (!device) {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE));
            setModal(false);
            return;
        }
        const payload = {
            date, time, device_id: device?.id, limit: 60, offset: 0,
        };
        dispatch(sensorsAC.fetchHistoricalGraphs(payload));
        setModal(false);
        history.push(`/dashboard/historical/${date}&${time}`);
    };

    const onChangeTab = (activeKey: any) => {
        setPath(activeKey);
    };

    return (
        <div className={classes.wrap}>
            <div className="d-flex">
                <div>
                    <Tabs className={classes.tabs}
                          activeKey={path}
                          centered
                          onChange={onChangeTab}
                    >
                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={onLive}>
                                         <Live/>
                                         <span className={classes.title}>Live</span>
                                     </div>
                                 }
                                 key="live"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={setVisibleModal}>
                                         <Historical/>
                                         <span className={classes.title}>Historical</span>
                                     </div>
                                 }
                                 key="historical"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={onMaintenance}>
                                         <Maintenance/>
                                         <span className={classes.title}>Maintenance</span>
                                     </div>
                                 }
                                 key="maintenance"/>

                    </Tabs>
                </div>

                {
                    ws_data?.device?.deviceType === "f500"
                        ?
                        <div>
                            <Select defaultValue={FilterStatus.ACTIVE} onSelect={handleSelectNodes} style={{width: 170}}
                                    bordered={false}>
                                <Option value={FilterStatus.ACTIVE}>Active Nodes</Option>
                                <Option value={FilterStatus.ALARMED}>Alarmed Nodes</Option>
                                <Option value={FilterStatus.ALL_NODES}>All Nodes</Option>
                            </Select>
                        </div>
                        :
                        <div>
                            <span className={classes.switchNodes}>Show all nodes</span>
                            <Switch onChange={onSwitchNodes}/>
                        </div>
                }

                <DataModal is_modal={modal}
                           onCancel={onCancel}
                           onHandleSearch={onSearch}
                />

            </div>
        </div>
    );
};
export default TabsSensorDashboard;
