import React, {useCallback, useEffect} from "react";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
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

import {ConfirmStatus, FilterStatus, WsSensor} from "../../../store/branches/sensors/stateTypes";
import {selectDevicesState, selectSensorsState} from "../../../store/selectors";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {sensorsAC} from "../../../store/branches/sensors/actionCreators";
import {concatIds} from "../../../helpers/concatUrl";

import classes from "../SensorDashboard.module.scss";
import {graphsAC} from "../../../store/branches/graphs/actionCreators";

interface SensorProps {
    sensor: WsSensor,
    wsDataId?: string
    groupId?: string
    groupsId?: string
    sensorsId?: string
    sensorId?: string
    f500GroupID?: string
    alignmentID?: string
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
                                           wsDataId,
                                           groupId,
                                           groupsId,
                                           sensorsId,
                                           sensorId,
                                           f500GroupID,
                                           alignmentID,
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
        const {maintenanceInfo} = useSelector(selectDevicesState);
        const {device} = useCurrentSelection();
        const {time}: any = useParams();

        const isDisabledForMaintenance = ["18000", "21000"].includes(sensor.Id);

        const parentIds = concatIds({
            wsDataId,
            groupId,
            groupsId,
            sensorsId,
            sensorId,
        });
        const alreadyInMaintenance = maintenanceSensorsArray.find(item => item.sensor_id === parentIds);

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
                status: ConfirmStatus.cancel,
                device_id: device.id,
                event_type: "maintenance_canceled",
                sensor_id: parentIds,
                sensor_name: sensor.Name,
            }));
        };

        const changeEventTypeMaintenance = useCallback((sensor: WsSensor) => {
            dispatch(sensorsAC.setMaintenanceExpectOff({
                device_id: device?.id,
                sensor_id: parentIds,
                sensor_name: sensor?.Name,
                event_type: "maintenance_expect_alarm_off",
                maintenance_time: new Date().getTime(),
            }));
        }, [dispatch, parentIds, device?.id]);


        const successMaintenance = useCallback((sensor: WsSensor) => {
            dispatch(sensorsAC.showConfirmModal({
                isShow: true,
                status: ConfirmStatus.success,
                device_id: device?.id,
                event_type: "maintanance_succeeded",
                sensor_id: parentIds,
                sensor_name: sensor?.Name,
            }));
        }, [dispatch, parentIds, device?.id]);


        const setMaintenance = useCallback(() => {
            if (isDisabledForMaintenance) {
                return;
            }

            dispatch(sensorsAC.setMaintenance({
                device_id: device.id,
                event_type: "maintenance_expect_alarm_on",
                sensor_id: parentIds,
                current_sensor_id: sensor.Id,
                sensor_name: sensor.Name,
                maintenance_time: new Date().getTime(),
            }));
        }, [sensor, isDisabledForMaintenance, parentIds, device?.id, dispatch]);

        useEffect(() => {
            if (isMaintenance && maintenanceInfo) {
                const IdsInfo = Object.keys(maintenanceInfo);
                const alreadyMaintenanceSensor = IdsInfo.includes(alreadyInMaintenance?.current_sensor_id);
                if (IdsInfo.includes(sensor.Id)) {
                    if (alreadyMaintenanceSensor) {
                        return;
                    }
                    if (maintenanceInfo[sensor.Id] === null) {
                        return;
                    }

                    dispatch(sensorsAC.setMaintenanceAfterReload({
                        device_id: device.id,
                        event_type: maintenanceInfo[sensor.Id]?.state,
                        sensor_id: parentIds,
                        current_sensor_id: sensor.Id,
                        sensor_name: sensor.Name,
                        maintenance_time: maintenanceInfo[sensor.Id]?.time,
                    }));
                }
            }
            // eslint-disable-next-line
        }, [maintenanceInfo, maintenanceInfo?.sensor]);

        const onSensorClick = () => {
            if(time){
                const selectedDate = time.split(" ")[0]
                const selectedTime = time.split(" ")[1].split(":").slice(0,2).join(":")
                const payload = {
                    date: selectedDate, time: selectedTime , id: device?.id,
                };
                dispatch(graphsAC.fetchCustomGraphsData(payload));
                history.push(`/graphs/historical/graphs/${selectedDate}&${selectedTime}/${sensor.Id}`)
                return
            }
            if (isMaintenance && !alreadyInMaintenance && !sensor?.Alarm) {
                setMaintenance();
            } else {
                if (device.device_type === "F500-UDF") {
                    dispatch(sensorsAC.updateArrangement({
                        action: "append",
                        sensor: sensor.Id,
                        graph_type: sensor.Type,
                        device_id: device?.id,
                    }));
                    history.push(`/graphs/${sensor.Id}`);
                } else {
                    history.push(`/graphs/${sensor.Id}`);
                }
            }
        };


        useEffect(() => {
            if (isMaintenance && alreadyInMaintenance) {
                if (sensor?.Alarm && (alreadyInMaintenance.event_type === "maintenance_expect_alarm_on")) {
                    changeEventTypeMaintenance(sensor);
                }
            }
        });


        useEffect(() => {
            if (isMaintenance && alreadyInMaintenance) {
                if ((alreadyInMaintenance.event_type === "maintenance_expect_alarm_off") && !sensor?.Alarm) {
                    successMaintenance(sensor);
                    dispatch(sensorsAC.clearMaintenanceArray(parentIds));
                }
            }
        });


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
                                                        sensor.Meta.Units === "C" ?
                                                            <span>&deg;C</span> : sensor.Meta.Units}
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
