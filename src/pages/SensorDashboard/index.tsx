import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import HeaderSection from "./components/HeaderSection";
import SensorsGroups from "./components/SensorsGroups";
import DashboardAlert from "../../components/Alerts/dachboard";
import Versions from "./components/Versions";
import SystemTable from "./components/SystemState";

import {useSocketSensors} from "../../hooks/useSocketTestSensors";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";

import {LoadingStatus} from "../../store/types";
import {selectSensorsState} from "../../store/selectors";
import Preloader from "../../components/Preloader";

import classes from "./SensorDashboard.module.scss";

const SensorDashboard: React.FC = () => {
    const dispatch = useDispatch();

    const {ws_data, filter_status, status} = useSelector(selectSensorsState);
    const {device} = useCurrentSelection();

    useEffect(() => {
        if (!device) {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE));
        }

        return () => {
            dispatch(sensorsAC.clearWsSensorsData());
        };
    }, [dispatch, device]);

    useEffect(() => {
        if (device) {
            dispatch(sensorsAC.fetchWarnings(device.id.toString()));
            dispatch(sensorsAC.fetchSensors(device.id.toString()));
        }
    }, [dispatch, device]);

    // fix this after backand will change
    useSocketSensors(`ws/device-data/${device?.udf_id}/`);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING && !ws_data}>
            <div className={classes.SensorDashboardWrap}>
                <DashboardAlert/>
                <HeaderSection/>

                {
                    device?.device_type === "F500-UDF"
                    &&
                    <SystemTable data={ws_data}/>
                }


                {
                    ws_data && ws_data?.groups?.map((item, index) => (
                        <SensorsGroups group={item}
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
