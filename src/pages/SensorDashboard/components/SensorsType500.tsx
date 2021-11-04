import React from "react";
import clsx from "clsx";

import {FilterStatus, WsGroups} from "../../../store/branches/sensors/stateTypes";
import SensorWrap from "./SensorWrap";
import success from "../../../assets/icons/success_sensor.svg";
import notify from "../../../assets/icons/notify_sensor.svg";
import not_scanned from "../../../assets/icons/not_scaned.svg";

import classes from "../SensorDashboard.module.scss";

interface SensorsType500Props {
    wsGroup?: WsGroups
    wsDataId: string
    groupId: string
    groupsId?: string
    f500GroupID: string
    alignmentID?: string
    groupNumber?: number
    isAlignment?: boolean
    filter_status?: FilterStatus
    isAlarmedGroup?: boolean
}


const SensorsType500: React.FC<SensorsType500Props> = ({
                                                           wsGroup,
                                                           wsDataId,
                                                           groupId,
                                                           groupsId,
                                                           f500GroupID,
                                                           alignmentID,
                                                           groupNumber,
                                                           isAlignment,
                                                           filter_status,
                                                           isAlarmedGroup,
                                                       }) => {
    let ambient;
    let ambientUnits;
    wsGroup?.sensors?.forEach((item, index) => {
        if (item?.Name === "Ambient") {
            ambientUnits = item?.Meta?.Units;
            ambient = item.Value;
            return;
        }
    });

    let _Type;
    for (let i in wsGroup.sensors) {
        let sensor = wsGroup.sensors[i];
        if (sensor.Meta && sensor.Meta.Units) {
            if (sensor.Meta.Units === "PPM") {
                _Type = "SN2";
            } else {
                _Type = "TN4";
            }
            break;
        }
    }


    return (
        <div className={classes.sensor500Wrap}>
            <div className={clsx(classes.sensorsGroupHeader,
                isAlignment && classes.sensorsGroupHeaderAlignment)}>

                <div className={classes.sensorsGroupTitle}>
                    {
                        ["OK", "Alarm"].includes(wsGroup.Status)
                            ?
                            <img src={wsGroup.Status === "OK" ? success : notify} alt="success"/>
                            :
                            <img src={not_scanned} alt="not_scanned"/>
                    }

                    {
                        ["OK", "Alarm"].includes(wsGroup.Status)
                            ?
                            <span className={clsx(wsGroup.Status === "Alarm" && classes.groupTitleAlarm)}>
                                {`${wsGroup.Name}: ${wsGroup.Status}`}
                                {
                                    ambient
                                    &&
                                    <React.Fragment>
                                        <span className={classes.groupDegrees}>{ambient ? ambient : ""}</span>
                                        <span className={classes.ambientUnits}>{ambientUnits ? ambientUnits : ""}</span>
                                    </React.Fragment>
                                }
                            </span>

                            :
                            <span style={{fontSize: "12px"}}>{`${wsGroup.Name}: Not Scanned`}</span>
                    }
                </div>

                {
                    _Type
                    &&
                    <div className={classes.groupTitle}>
                        <span>{_Type}</span>
                    </div>
                }

            </div>

            <div className={classes.sensorsGroupBlock}>
                {
                    wsGroup?.sensors?.map((item, index) => {
                        if (item?.Name === "Ambient") {
                            return null;
                        }
                        return (
                            <SensorWrap sensor={item} key={`${item.Id}${index}1-1`}
                                        sensorNumber={index + 1}
                                        wsDataId={wsDataId}
                                        groupId={groupId}
                                        groupsId={groupsId}
                                        sensorId={item?.Id}
                                        f500GroupID={f500GroupID}
                                        alignmentID={alignmentID}
                                        isAlignment={isAlignment}
                                        filter_status={filter_status}
                                        groupNumber={groupNumber}/>
                        );
                    })
                }
            </div>
        </div>
    );
};
export default SensorsType500;
