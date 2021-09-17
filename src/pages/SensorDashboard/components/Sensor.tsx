import React, {useCallback} from "react";
import clsx from "clsx";

import success from "../../../assets/icons/success_sensor.svg";
import notify from "../../../assets/icons/notify_sensor.svg";
import warning from "../../../assets/icons/warning_icon.svg";

import contact_sensor from "../../../assets/icons/contact_sensor.svg";
import temperature from "../../../assets/icons/temperature.svg";
import pressure from "../../../assets/icons/pressure.svg";
import {ReactComponent as On} from "../../../assets/icons/button_on.svg";
import {ReactComponent as Off} from "../../../assets/icons/button_off.svg";

import {FilterStatus, WsSensor} from "../../../store/branches/sensors/stateTypes";

import classes from "../SensorDashboard.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {sensorsAC} from "../../../store/branches/sensors/actionCreators";
import {selectSensorsState} from "../../../store/selectors";

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
    const dispatch = useDispatch();
    const {maintenanceIdArray} = useSelector(selectSensorsState);

    const isDisabledForMaintenance = ["18000", "21000"].includes(sensor.Id);
    const isMaintenanceSensor = maintenanceIdArray.includes(sensor.Id);

    const setMaintenance = useCallback(() => {
        if (isDisabledForMaintenance) {
            console.log("id ==> ", sensor.Id);
            return;
        }
        dispatch(sensorsAC.setMaintenance(sensor.Id));
        console.log("includes ==> ", sensor.Id);
    }, [sensor, isDisabledForMaintenance, dispatch]);


    return (
        <div
            className={clsx(classes.sensorWrap,
                sensor?.Status === "WARNING" && classes.sensorWrapWarning,
                sensor?.Alarm && classes.sensorWrapDanger,
                isMaintenanceSensor && classes.sensorWrapDanger,
                isAlignment && classes.AlignmentSensorWrap,
            )}
            onClick={setMaintenance}
        >

            <div className={clsx("d-flex-100", classes.head)}>
                <div className={classes.title}>
                    <span>{sensor?.Name}</span>
                </div>

                <div>
                    <img src={sensor?.Alarm ? notify : sensor?.Status === "WARNING" ? warning : success} alt="isActive"
                         className={classes.notify}/>
                </div>
            </div>

            <div className={clsx("d-flex-100", classes.content)}>
                <div className={classes.device}>
                    {
                        (isTemperature)
                            ? <img src={temperature} alt="temperature_sensor" className={classes.temperature}/>
                            : (sensor?.Meta?.Units?.split(" ").includes("mA")) || (sensor?.Meta?.Units === "mA")
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
                                    {ContactStatus === "On" ? "" : <span className={classes.closed}>Closed</span>}
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
                        <div
                            className={clsx(classes.statusInfo, sensor?.Status === "WARNING" && classes.statusInfoDanger)}>
                        <span className={classes.statusValue}>
                            {!isBoolean && ((sensor.Meta.Units === "Minutes") ? `${Math.floor(sensor.Value / 60)}h:${sensor.Value % 60}m` : sensor.Value)}
                        </span>
                            <span>
                            {!isBoolean && (sensor.Meta.Units === "Minutes") ? "" : sensor.Meta.Units === "Seconds" ? "Sec" : sensor.Meta.Units}
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
                    #{groupNumber}.{sensorNumber}
                </div>
            </div>
        </div>
    );
};
export default Sensor;
