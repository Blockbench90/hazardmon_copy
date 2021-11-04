import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Empty} from "antd";

import HeaderSection from "./components/HeaderSection";
import SensorsGroups from "./components/SensorsGroups";
import DashboardAlert from "../../components/Alerts/dachboard";
import Versions from "./components/Versions";
import SystemTable from "./components/SystemState";

import {useSocketSensors} from "../../hooks/useSocketTestSensors";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";

import {ReactComponent as Warning} from "../../assets/icons/maintanence_warning.svg";
import {Maintenance} from "../../store/branches/sensors/stateTypes";
import {LoadingStatus} from "../../store/status";
import {selectDevicesState, selectSensorsState} from "../../store/selectors";
import Preloader from "../../components/Preloader";
import Spinner from "../../components/Spinner";
import MaintenanceModal from "../../components/MaintenanceModal";
import FailedMaintenanceModal from "../../components/MaintenanceModal/failedMaintenanceModal";

import classes from "./SensorDashboard.module.scss";

// const maintenanceTime = process.env.REACT_APP_MAINTENANCE_TIME;
const maintenanceTime = 20

const SensorDashboard: React.FC = () => {
    const dispatch = useDispatch();

    const {
        ws_data, filter_status, status, maintenance_status_operation,
        maintenanceSensorsArray, isMaintenance, confirmMaintenance,
    } = useSelector(selectSensorsState);
    const {maintenanceInfo} = useSelector(selectDevicesState);
    const {device} = useCurrentSelection();

    const [isLoading, setLoading] = useState<boolean>(true);
    const failed = useRef<any>();

    const isDoneMaintenanceAfterReload = !!maintenanceInfo && (!!Object.values(maintenanceInfo).filter(item => item !== null).length);

    const onSubmitComment = (message: string) => {
        dispatch(sensorsAC.showConfirmModal({isShow: false}));
        dispatch(sensorsAC.stopSensorMaintenance({
            device_id: confirmMaintenance.device_id,
            event_type: confirmMaintenance.event_type,
            sensor_id: confirmMaintenance.sensor_id,
            sensor_name: confirmMaintenance.sensor_name,
            comment: message,
            maintenance_time: new Date().getTime(),
        }));
    };

    const failedMaintenance = (item: Maintenance) => {
        failed.current = {
            isShow: true,
            device_id: item.device_id,
            event_type: "maintenance_failed",
            current_sensor_id: item.current_sensor_id,
            sensor_id: item.sensor_id,
            sensor_name: item.sensor_name,
        };
    };

    const failedMaintenanceClientSide = useCallback((item: Maintenance) => {
        dispatch(sensorsAC.showConfirmModal({
            isShow: true,
            device_id: item.device_id,
            event_type: "maintenance_failed",
            sensor_id: item.sensor_id,
            sensor_name: item.sensor_name,
        }));
    }, [dispatch]);

    const checkTime = (sensorsArray: Maintenance[]) => {
        if (sensorsArray.length > 0) {
            sensorsArray.map((item: Maintenance, index: number) => {
                const now = new Date().getTime(); // now moment in seconds
                const differenceTime = (now - item.maintenance_time) / 1000; //find out the difference between start and now
                if (Number(differenceTime.toFixed()) > Number(maintenanceTime)) {
                    if (!isDoneMaintenanceAfterReload) {
                        failedMaintenanceClientSide(item);
                    } else {
                        failedMaintenance(item);
                    }
                    dispatch(sensorsAC.clearMaintenanceArray(item.sensor_id));
                }
                return null;
            });
        }
        return null;
    };

    useEffect(() => {
        if (isMaintenance && maintenanceSensorsArray?.length > 0) {
            checkTime(maintenanceSensorsArray);
        }
        if (isMaintenance && maintenanceInfo && !isDoneMaintenanceAfterReload) {
            failed.current = {isShow: false};
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    useEffect(() => {
        return () => {
            dispatch(sensorsAC.clearWsSensorsData());
        };
    }, [dispatch, device]);

    // fix this after backand will change
    useSocketSensors(device ? `ws/device-data/${device?.udf_id}/` : "");


    if ((maintenance_status_operation === LoadingStatus.LOADING) || isLoading) {
        return <Spinner/>;
    }

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING && !ws_data}>
            <div className={classes.SensorDashboardWrap}>
                <DashboardAlert/>
                <HeaderSection/>

                <MaintenanceModal isModal={confirmMaintenance.isShow} onSubmit={onSubmitComment}/>

                {
                    failed.current?.isShow
                    &&
                    <FailedMaintenanceModal isShow={failed.current.isShow}
                                            device_id={failed.current.device_id}
                                            event_type={failed.current.event_type}
                                            sensor_id={failed.current.sensor_id}
                                            current_sensor_id={failed.current.current_sensor_id}
                                            sensor_name={failed.current.sensor_name}
                    />
                }
                {
                    !ws_data
                    &&
                    <Empty
                        description="Device is Offline! No notifications can occur until the device is back online! Please check the device’s internet connection"/>
                }

                {
                    isMaintenance
                    &&
                    <div className={classes.warningMaintenance}>
                        <div className={classes.icon}>
                            <Warning/>
                        </div>
                        <div className={classes.description}>
                            <span>Please click on the sensor to start the maintenance test.</span>
                        </div>
                    </div>
                }

                {
                    device?.device_type === "F500-UDF"
                    &&
                    <SystemTable data={ws_data}/>
                }


                {
                    ws_data && ws_data?.groups?.map((item, index) => (
                        <SensorsGroups group={item}
                                       wsDataId={ws_data.Id}
                                       groupId={item.Id}
                                       key={`${item?.Id}sensor_group${index}`}
                                       sensorsGroupsName={ws_data.Name}
                                       groupNumber={index + 1}
                                       deviceType={ws_data?.device?.deviceType}
                                       groupName={ws_data?.groups[index].Name}
                                       filter_status={filter_status}
                        />
                    ))
                }

                {
                    ws_data?.groups && ws_data?.device?.versionInfo
                        ?
                        <Versions versions={ws_data?.device?.versionInfo}/>
                        :
                        <div style={{margin: "12px"}}>
                            <p>Version information not available</p>
                        </div>
                }
            </div>
        </Preloader>
    );
};


export default SensorDashboard;
