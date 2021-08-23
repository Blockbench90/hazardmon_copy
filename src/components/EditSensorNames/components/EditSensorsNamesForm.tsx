import React from "react";
import {Form} from "antd";

import HeaderFormEditSensorNames from "./HeaderForm";
import SensorForm from "./SensorForm";
import EditNamesHeader from "./EditNamesHeader";
import {SensorNames, SensorNamesArray} from "../../../store/branches/sensors/stateTypes";
import SensorFormF500 from "./SensorFormF500";

import classes from "../EditSensorsNames.module.scss";


interface UserSettingFormProps {
    onSubmit?: (values: any) => void
    onCancel?: () => void
    form?: any
    deviceTitle?: string
    sensorNames?: SensorNames
    device_type?: string
}

const EditSensorsNamesForm: React.FC<UserSettingFormProps> = ({
                                                                  onSubmit,
                                                                  onCancel,
                                                                  form,
                                                                  deviceTitle,
                                                                  sensorNames,
                                                                  device_type,
                                                              }) => {

    return (
        <div className={"header-link"}>
            <Form name="sensor_names"
                  form={form}
                  onFinish={onSubmit}
            >

                <HeaderFormEditSensorNames onCancel={onCancel}/>

                <div className={classes.sensorsNamesInputsWrap}>
                    <EditNamesHeader deviceTitle={deviceTitle}/>

                    <div className={classes.container}>
                        {
                            device_type === "F500-UDF"
                            &&
                            <SensorFormF500 sensorGroupF500={sensorNames.networks}
                                            degrees={sensorNames.degrees}
                                            form={form}
                            />

                        }

                        {sensorNames?.sensor_names?.map((sensorGroup: SensorNamesArray, index: number) => (
                            <SensorForm sensorGroup={sensorGroup}
                                        key={`sensor_group_name${index}${sensorGroup.name}`}
                                        form={form}/>
                        ))}

                    </div>
                </div>
            </Form>
        </div>
    );
};

export default EditSensorsNamesForm;