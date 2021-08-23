import React from "react";
import clsx from "clsx";

import InfoBlock from "./InfoBlock";
import SensorWrap from "./SensorWrap";
import SensorsType500 from "./SensorsType500";

import {FilterStatus, WsGroup, WsGroups} from "../../../store/branches/sensors/stateTypes";

import classes from "../SensorDashboard.module.scss";

interface Sensors {
    group: WsGroup
    sensorsGroupsName?: string
    groupNumber: number
    deviceType: string
    groupName?: string
    filter_status?: FilterStatus
}

const SensorsGroups: React.FC<Sensors> = ({
                                              group,
                                              sensorsGroupsName,
                                              groupNumber,
                                              deviceType,
                                              groupName,
                                              filter_status,
                                          }) => {
    return (
        <div className={clsx(deviceType === "f500"
            ? classes.deviceType500Block
            : group.Name === "Alignment" ? classes.alignment : "")}>

            {
                deviceType === "f500"
                    ?
                    <React.Fragment>
                        {
                            <div className={classes.sensorsGroupBlockWrap}>
                                <div className={classes.sensorsGroupBlockTitle}>
                                    <span>{groupName}</span>
                                </div>
                            </div>
                        }
                        <div>
                            {group?.groups?.map((item: WsGroups, index: number) => {
                                if (filter_status === FilterStatus.ACTIVE) {
                                    if (!item.sensors) {
                                        return null;
                                    }
                                    return <SensorsType500 groupNumber={groupNumber}
                                                           filter_status={filter_status}
                                                           wsGroup={item}
                                                           isAlarmedGroup={group.Alarm}
                                                           key={`sensor_f500_group${index}`}
                                    />;
                                }

                                if (filter_status === FilterStatus.ALARMED) {
                                    if (item.Alarm) {
                                        return <SensorsType500 groupNumber={groupNumber}
                                                               filter_status={filter_status}
                                                               wsGroup={item}
                                                               isAlarmedGroup={group.Alarm}
                                                               key={`sensor_f500_group${index}`}
                                        />;
                                    }
                                    return null;
                                }

                                return <SensorsType500 groupNumber={groupNumber}
                                                       filter_status={filter_status}
                                                       wsGroup={item}
                                                       isAlarmedGroup={group.Alarm}
                                                       key={`sensor_f500_group${index}`}
                                />;
                            })}
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <InfoBlock
                            group={group}
                            status={group?.Status}
                            isSensors={!!group?.sensors}
                            sensorsGroupsName={sensorsGroupsName}
                        />
                        <div className={classes.mapBlock}>
                            {group?.sensors?.map((item, index) => (
                                <SensorWrap sensor={item}
                                            key={`${item.Id}${index}1-1`}
                                            sensorNumber={index + 1}
                                            filter_status={filter_status}
                                            groupNumber={groupNumber}/>
                            ))}
                        </div>
                    </React.Fragment>

            }

            {
                group.Name === "Alignment"
                &&
                <React.Fragment>
                    <InfoBlock
                        group={group}
                        status={group?.Status}
                        isSensors={true}
                        isAlignment={true}
                        sensorsGroupsName={groupName}
                    />

                    <div className={clsx(classes.mapBlock, classes.alignment)}>
                        {group?.groups?.map((item, index) => {

                            return <SensorsType500 groupNumber={groupNumber}
                                                   wsGroup={item}
                                                   key={`alignment_${index}`}
                                                   filter_status={filter_status}
                                                   isAlignment={true}
                            />;
                        })}
                    </div>
                </React.Fragment>
            }
        </div>
    );
};

export default SensorsGroups;
