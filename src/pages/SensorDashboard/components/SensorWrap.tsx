import React from "react";

import {FilterStatus, WsSensor} from "../../../store/branches/sensors/stateTypes";

import Sensor from "./Sensor";

interface SensorWrapProps {
    sensor: WsSensor,
    parentID: string
    f500GroupID?: string
    WsGroupID: string
    alignmentID?: string
    alignmentSensorID?: string
    isAlignment?: boolean,
    sensorNumber: number,
    groupNumber: number
    filter_status: FilterStatus
}


const SensorWrap: React.FC<SensorWrapProps> = ({
                                                   sensor,
                                                   parentID,
                                                   f500GroupID,
                                                   WsGroupID,
                                                   alignmentID,
                                                   alignmentSensorID,
                                                   sensorNumber,
                                                   groupNumber,
                                                   isAlignment,
                                                   filter_status,
                                               }) => {

    // console.log("parentIDWsGroupID, ==>", parentID, f500GroupID, WsGroupID);

    // const compareUnits = sensor?.Meta?.Units && sensor?.Meta?.Units.split("")[1] === ("С" || "F")

    const isTemperature = sensor?.Meta?.Units && sensor?.Meta?.Units === ("°С" || "°F");
    // console.log("istem ==>", isTemperature, "compare =>", compareUnits);
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
                       parentID={parentID}
                       f500GroupID={f500GroupID}
                       alignmentID={alignmentID}
                       alignmentSensorID={alignmentSensorID}
                       WsGroupID={WsGroupID}
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
                   parentID={parentID}
                   f500GroupID={f500GroupID}
                   alignmentID={alignmentID}
                   alignmentSensorID={alignmentSensorID}
                   WsGroupID={WsGroupID}
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
