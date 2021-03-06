import React, {useEffect, useState} from "react";
import {Checkbox, Select, Tabs} from "antd";
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

import classes from "./HeaderTabs.module.scss";
import {devicesAC} from "../../store/branches/devices/actionCreators";

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

    const isHideMaintenance = ["0005", "0006"].includes(device?.device_type);

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

    const outMaintenancePage = () => {
        dispatch(sensorsAC.setMaintenancePage(false));
    };

    const handleSelectNodes = (values: any) => {
        dispatch(sensorsAC.changeFilterStatusSensors(values));
    };

    const onSwitchNodes = (e: any) => {
        e.target.checked
            ? dispatch(sensorsAC.changeFilterStatusSensors(FilterStatus.ACTIVE))
            : dispatch(sensorsAC.changeFilterStatusSensors(FilterStatus.ALL_NODES));
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
        if (activeKey === "live") {
            history.push("/dashboard");
            outMaintenancePage();
        }
        if (activeKey === "historical") {
            setModal(true);
            outMaintenancePage();
        }
        if (activeKey === "maintenance") {
            history.push("/dashboard");
            dispatch(sensorsAC.setMaintenancePage(true));
            if(device?.id){
                dispatch(devicesAC.getMaintenanceInfo(device?.id.toString()))
            }
        }
        setPath(activeKey);
    };

    useEffect(() => {

        return () => {
            dispatch(sensorsAC.setMaintenancePage(false));
        };
    }, [dispatch]);

    return (
        <div className={classes.graphsWrap}>
            <div className="d-flex">
                <div>
                    <Tabs className={classes.graphsTabs}
                          activeKey={path}
                          centered
                          onChange={onChangeTab}
                    >
                        <TabPane className={classes.graphsTab}
                                 tab={
                                     <div className={classes.tabTitleWrap}>
                                         <Live/>
                                         <span className={classes.title}>Live</span>
                                     </div>
                                 }
                                 key="live"/>

                        <TabPane className={classes.graphsTab}
                                 tab={
                                     <div className={classes.tabTitleWrap}>
                                         <Historical/>
                                         <span className={classes.title}>Historical</span>
                                     </div>
                                 }
                                 key="historical"/>

                        {
                            !isHideMaintenance
                            &&
                            <TabPane className={classes.graphsTab}
                                     tab={
                                         <div className={classes.tabTitleWrap}>
                                             <Maintenance/>
                                             <span className={classes.title}>Maintenance</span>
                                         </div>
                                     }
                                     key="maintenance"/>
                        }

                    </Tabs>
                </div>


                {
                    ws_data?.device?.deviceType === "f500"
                        ?
                        <div className={classes.headerDashboardSelect}>
                            <Select defaultValue={FilterStatus.ACTIVE} onSelect={handleSelectNodes} style={{width: 170}}
                                    bordered={false}>
                                <Option value={FilterStatus.ACTIVE}>Active Nodes</Option>
                                <Option value={FilterStatus.ALARMED}>Alarmed Nodes</Option>
                                <Option value={FilterStatus.ALL_NODES}>All Nodes</Option>
                            </Select>
                        </div>
                        :
                        <div className={classes.headerDashboardSelect}>
                            <span className={classes.switchNodes}>Hide disabled sensors</span>
                            <Checkbox onChange={onSwitchNodes} defaultChecked={true}
                                      className={classes.hideSensorsCheckbox}/>
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
