import React from "react";
import {Form} from "antd";

import DeviceSettingsForm from "./DeviceSettingsForm";
import HeaderFormTypes from "./HeaderForm";
import {SensorSettings, Unit} from "../../../store/branches/sensors/stateTypes";

import classes from "../EditSensorsTypes.module.scss";

interface SettingFormProps {
    onSubmit?: (values: any) => void
    onCancel?: () => void
    form?: any
    deviceTitle?: string
    deviceType?: string
    sensorSettings: SensorSettings[]
    units?: Unit[]
}

const EditSensorsSettingsForm: React.FC<SettingFormProps> = ({
                                                                 onSubmit,
                                                                 onCancel,
                                                                 form,
                                                                 deviceTitle,
                                                                 deviceType,
                                                                 units,
                                                                 sensorSettings,
                                                             }) => {


    return (
        <div className={"header-link"}>
            <Form name="edit_sensor_names"
                  form={form}
                  onFinish={onSubmit}
            >

                <HeaderFormTypes onCancel={onCancel}/>

                <div className={classes.sensorsNamesInputsWrap}>
                    <div className={classes.sensorsTitle}>
                        <div className={classes.sensorsSub}>
                            <div/>
                            <div>
                                <span>{deviceTitle}</span>
                            </div>
                        </div>
                    </div>

                    <div className={classes.container}>

                        {
                            sensorSettings?.map((item: SensorSettings, index: number) => {
                                return <DeviceSettingsForm key={`device_0005${item.name}${index}`}
                                                           form={form}
                                                           units={units}
                                                           sensorSettings={item}
                                                           deviceType={deviceType}
                                />;
                            })
                        }

                    </div>
                </div>
            </Form>
        </div>
    );
};

export default EditSensorsSettingsForm;