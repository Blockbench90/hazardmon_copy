import React from "react";

import {FilterStatus, WsSensor} from "../../../store/branches/sensors/stateTypes";

import Sensor from "./Sensor";

interface SensorWrapProps {
    sensor: WsSensor,
    isAlignment?: boolean,
    sensorNumber: number,
    groupNumber: number
    filter_status: FilterStatus
}


const SensorWrap: React.FC<SensorWrapProps> = ({
                                                   sensor,
                                                   sensorNumber,
                                                   groupNumber,
                                                   isAlignment,
                                                   filter_status,
                                               }) => {
    
    const isTemperature = sensor?.Meta?.Units && sensor?.Meta?.Units === ("°С" || "°F");
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
