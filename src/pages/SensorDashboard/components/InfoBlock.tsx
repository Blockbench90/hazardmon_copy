import React from "react";
import clsx from "clsx";

import {WsGroup} from "../../../store/branches/sensors/stateTypes";

import success from "../../../assets/icons/success_sensor.svg";
import notify from "../../../assets/icons/notify_sensor.svg";

import classes from "../SensorDashboard.module.scss";

interface InfoBlockProps {
    groupName?: string
    status?: string
    sensorsGroupsName?: string
    isSensors: boolean
    group: WsGroup
    isAlignment?: boolean
    isAlarmedGroup?: boolean

}

const InfoBlock: React.FC<InfoBlockProps> = ({
                                                 status,
                                                 sensorsGroupsName,
                                                 groupName,
                                                 isSensors,
                                                 isAlarmedGroup,
                                                 group,
                                                 isAlignment,
                                             }) => {
    const sensorGroupStatus = ["Alarm", "OK"].includes(status) ? status : "";


    return (
        <React.Fragment>
            {
                isSensors
                &&
                <div className={clsx(classes.groupName, isAlignment && classes.sensorsGroupHeaderAlignment)}>

                    <div className={clsx(classes.groupSubtitle, classes.sensorsGroupHeaderAlignment)}>
                        {
                            group.Alarm
                                ?
                                <img src={notify} alt="notify"/>
                                :
                                <img src={success} alt="success"/>
                        }
                        {
                            ["OK", "Alarm"].includes(status)
                                ?
                                <span className={clsx(classes.groupTitleAlignment,
                                    status === "Alarm" && classes.groupTitleAlarm,
                                    isAlarmedGroup && classes.groupTitleAlarm,
                                )}>
                                    {`${group.Name}: ${sensorGroupStatus}`}
                                </span>
                                :
                                <span className={clsx(classes.groupTitleAlignment,
                                    isAlarmedGroup && classes.groupTitleAlarm
                                )}>
                                    {`${group.Name}: ${sensorGroupStatus}`}
                                </span>
                        }
                    </div>
                </div>
            }
        </React.Fragment>
    );
};
export default InfoBlock;
