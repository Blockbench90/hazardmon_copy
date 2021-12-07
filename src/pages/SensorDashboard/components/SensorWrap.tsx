import React from "react";

import {FilterStatus, WsSensor} from "../../../store/branches/sensors/stateTypes";

import Sensor from "./Sensor";

interface SensorWrapProps {
    sensor: WsSensor,
    wsDataId: string
    groupId: string
    sensorsId?: string
    groupsId: string
    sensorId?: string
    f500GroupID?: string
    alignmentID?: string
    isAlignment?: boolean,
    sensorNumber: number,
    groupNumber: number
    filter_status: FilterStatus
}


const SensorWrap: React.FC<SensorWrapProps> = ({
                                                   sensor,
                                                   wsDataId,
                                                   groupId,
                                                   sensorsId,
                                                   sensorId,
                                                   f500GroupID,
                                                   groupsId,
                                                   alignmentID,
                                                   sensorNumber,
                                                   groupNumber,
                                                   isAlignment,
                                                   filter_status,
                                               }) => {
    // const compareUnits = sensor?.Meta?.Units && sensor?.Meta?.Units.split("")[1] === ("С" || "F")

    const unit =(sensor?.Meta?.Units && typeof sensor?.Meta?.Units === "string") && sensor?.Meta?.Units.split("")[1]
    // const isTemperature = sensor?.Meta?.Units && sensor?.Meta?.Units.split("")[1] === "F";
    const isTemperature = unit === "F" || unit === "C";

    const isBoolean = ["BOOL", "ENUM"].indexOf(sensor.Type) !== -1;

    const contactSensor = () => {
        const isContact = sensor?.Meta?.State?.split(" ").includes("Contact");
        const ContactName = isContact && <span>{sensor?.Meta?.State?.split(" / ")[0]}</span>;
        const ContactStatus = isContact && sensor?.Meta?.State?.split(" / ")[1];

        return {isContact, ContactName, ContactStatus};
    };

    const {isContact, ContactName, ContactStatus} = contactSensor();

    if (filter_status === FilterStatus.ACTIVE) {
        if (sensor?.Meta?.State === "Disabled") {
            return null;
        }
        return <Sensor sensor={sensor}
                       wsDataId={wsDataId}
                       groupId={groupId}
                       groupsId={groupsId}
                       sensorsId={sensorsId}
                       sensorId={sensorId}
                       f500GroupID={f500GroupID}
                       alignmentID={alignmentID}
                       sensorNumber={sensorNumber}
                       groupNumber={groupNumber}
                       filter_status={filter_status}
                       isAlignment={isAlignment}
                       ContactStatus={ContactStatus}
                       ContactName={ContactName}
                       isBoolean={isBoolean}
                       isTemperature={isTemperature}
                       isContact={isContact}
        />;
    }

    return <Sensor sensor={sensor}
                   wsDataId={wsDataId}
                   groupId={groupId}
                   groupsId={groupsId}
                   sensorsId={sensorsId}
                   sensorId={sensorId}
                   f500GroupID={f500GroupID}
                   alignmentID={alignmentID}
                   sensorNumber={sensorNumber}
                   groupNumber={groupNumber}
                   filter_status={filter_status}
                   isAlignment={isAlignment}
                   ContactStatus={ContactStatus}
                   ContactName={ContactName}
                   isBoolean={isBoolean}
                   isTemperature={isTemperature}
                   isContact={isContact}
    />;
};

export default SensorWrap;
