import React, {useCallback} from "react";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import moment from "moment";

import success from "../../../assets/icons/success_sensor.svg";
import notify from "../../../assets/icons/notify_sensor.svg";
import warning from "../../../assets/icons/warning_icon.svg";

import contact_sensor from "../../../assets/icons/contact_sensor.svg";
import temperature from "../../../assets/icons/temperature.svg";
import pressure from "../../../assets/icons/pressure.svg";
import {ReactComponent as On} from "../../../assets/icons/button_on.svg";
import {ReactComponent as Off} from "../../../assets/icons/button_off.svg";
import {ReactComponent as Clock} from "../../../assets/icons/clock.svg";

import {FilterStatus, WsSensor} from "../../../store/branches/sensors/stateTypes";
import {selectSensorsState} from "../../../store/selectors";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {sensorsAC} from "../../../store/branches/sensors/actionCreators";

import classes from "../SensorDashboard.module.scss";

interface SensorProps {
    sensor: WsSensor,
    isAlignment?: boolean,
    sensorNumber?: number,
    groupNumber?: number
    filter_status?: FilterStatus
    isTemperature?: boolean
    ContactStatus?: string
    isBoolean?: boolean
    isContact?: boolean
    ContactName?: React.ReactNode
}


const Sensor: React.FC<SensorProps> = ({
                                           sensor,
                                           sensorNumber,
                                           groupNumber,
                                           isAlignment,
                                           filter_status,
                                           isTemperature,
                                           isContact,
                                           ContactStatus,
                                           isBoolean,
                                           ContactName,
                                       }) => {

        const history = useHistory();
        const dispatch = useDispatch();
        const {maintenanceSensorsArray, isMaintenance} = useSelector(selectSensorsState);
        const {device} = useCurrentSelection();

        const isDisabledForMaintenance = ["18000", "21000"].includes(sensor.Id);
        const alreadyInMaintenance = maintenanceSensorsArray.find(item => item.sensor_id === sensor.Id);

        const timer = () => {
            const currentTime = new Date().getTime();
            const startMaintenance = alreadyInMaintenance?.maintenance_time;
            const time = currentTime - startMaintenance;
            const duration = moment.duration(time, "milliseconds");
            const minutes = 8 - duration.minutes();
            const seconds = 59 - duration.seconds();
            return `${(minutes > 0) ? minutes : 0} m: ${seconds < 10 ? "0" : ""}${seconds} s`;
        };

        const stopMaintenance = () => {
            if (sensor?.Alarm) {
                return;
            }
            dispatch(sensorsAC.showConfirmModal({
                isShow: true,
                device_id: device.id,
                event_type: "maintenance_canceled",
                sensor_id: sensor.Id,
                sensor_name: sensor.Name,
            }));
        };

        // const changeEventTypeMaintenance = useCallback((sensor: WsSensor) => {
        //     console.log("changeEventTypeMaintenance() ==>");
        //     dispatch(sensorsAC.changeEventTypeMaintenance({
        //         event_type: "maintenance_expect_alarm_off",
        //         sensor_id: sensor.Id,
        //     }));
        // }, [dispatch]);


        // useEffect(() => {
        //     if (isMaintenance) {
        //         if (sensor?.Alarm && alreadyInMaintenance) {
        //             console.log("sensor Alarm ==>", sensor);
        //             console.log("stopMaintenance() ==>");
        //             changeEventTypeMaintenance(sensor);
        //         }
        //     }
        // });

        const setMaintenance = useCallback(() => {
            if (isDisabledForMaintenance) {
                return;
            }

            dispatch(sensorsAC.setMaintenance({
                device_id: device.id,
                event_type: "maintenance_expect_alarm_on",
                sensor_id: sensor.Id,
                sensor_name: sensor.Name,
                maintenance_time: new Date().getTime(),
            }));
        }, [sensor, isDisabledForMaintenance, device?.id, dispatch]);

        const onSensorClick = () => {
            if (isMaintenance) {
                setMaintenance();
            } else {
                if (device.device_type === "F500-UDF") {
                    dispatch(sensorsAC.updateArrangement({
                        action: "append",
                        sensor: sensor.Id,
                        graph_type: sensor.Type,
                        device_id: device?.id,
                    }));
                } else {
                    history.push(`/graphs/?id=${sensor.Id}`);
                }
            }
        };

        return (
            <React.Fragment>
                {
                    alreadyInMaintenance && isMaintenance
                        ?
                        <div className={classes.alreadyInMaintenanceWrap} onClick={stopMaintenance}>
                            <div className={classes.clock}>
                                <Clock/>
                            </div>
                            <div className={classes.timer}>
                                {alreadyInMaintenance && timer()}
                            </div>
                            <div className={classes.descript}>
                                {
                                    (sensor?.Alarm && alreadyInMaintenance && isMaintenance)
                                        // (sensor?.Id === "1000" && alreadyInMaintenance && isMaintenance)
                                        ?
                                        <span className={classes.alarmTest}>Alarm detected! Please clear alarm to finish test. Click to cancel</span>
                                        :
                                        <span>Sensor maintenance started. Please cause an alarm. Click to cancel</span>
                                }

                            </div>
                        </div>
                        :
                        <div
                            className={clsx(isMaintenance ? classes.sensorWrapMaintenance : classes.sensorWrap,
                                sensor?.Status === "WARNING" && classes.sensorWrapWarning,
                                sensor?.Alarm && classes.sensorWrapDanger,
                                isAlignment && classes.AlignmentSensorWrap,
                            )}
                            onClick={onSensorClick}
                        >

                            <div className={clsx("d-flex-100", classes.head)}>
                                <div className={classes.title}>
                                    <span>{sensor?.Name}</span>
                                </div>

                                <div>
                                    <img src={sensor?.Alarm ? notify : sensor?.Status === "WARNING" ? warning : success}
                                         alt="isActive"
                                         className={classes.notify}/>
                                </div>
                            </div>

                            <div className={clsx("d-flex-100", classes.content)}>
                                <div className={classes.device}>
                                    {
                                        (isTemperature)
                                            ? <img src={temperature} alt="temperature_sensor"
                                                   className={classes.temperature}/>
                                            : sensor?.Meta?.Units === "mA"
                                            ? <img src={pressure} alt="pressure_sensor" className={classes.pressure}/>
                                            : <img src={contact_sensor} alt="contact_sensor"/>
                                    }
                                </div>

                                <div className={classes.info}>
                                    {
                                        sensor?.Meta?.State === "Disabled"
                                        &&
                                        <div>
                                            <span className={classes.closed}>Disabled</span>
                                        </div>
                                    }

                                    {
                                        isContact
                                            ?
                                            <div>
                                                <div>
                                                    {ContactStatus === "On" ? "" :
                                                        <span className={classes.closed}>Closed</span>}
                                                </div>
                                                <div className={classes.infoButton}>
                                                    {ContactStatus === "On" ? <On/> : <Off/>}
                                                </div>
                                            </div>
                                            :
                                            ""
                                    }

                                    {
                                        sensor?.Meta?.State !== "Disabled"
                                        &&
                                        <div className={clsx(classes.statusInfo,
                                            sensor?.Alarm && classes.statusInfoDanger,
                                            sensor?.Status === "WARNING" && classes.sensorWarning)}>
                            <span className={classes.statusValue}>
                                {!isBoolean && ((sensor.Meta.Units === "Minutes") ? `${Math.floor(sensor.Value / 60)}h:${sensor.Value % 60}m` : sensor.Value)}
                            </span>

                                            <span>
                                {!isBoolean
                                &&
                                (sensor.Meta.Units === "Minutes")
                                    ? ""
                                    : sensor.Meta.Units === "Seconds"
                                        ? "Sec" :
                                        sensor.Meta.Units === "C" ? <span>&deg;C</span> : sensor.Meta.Units}
                            </span>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={clsx("d-flex-100", classes.foot)}>
                                <div className={classes.info}>
                                    {isContact && ContactName}
                                </div>

                                <div>
                    <span>
                        #{groupNumber}.{sensorNumber}
                    </span>
                                </div>
                            </div>
                        </div>
                }

            </React.Fragment>
        );
    }
;
export default Sensor;
