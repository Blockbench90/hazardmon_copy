import React, {useEffect} from "react";
import {Form, InputNumber, Select} from "antd";

import InputWrap from "../../InputWrap";
import {SensorSettings, SettingsSensor, Unit} from "../../../store/branches/sensors/stateTypes";

import classes from "../EditSensorsTypes.module.scss";
import {log} from "util";


interface Device0005Props {
    sensorSettings: SensorSettings
    units?: Unit[]
    form: any
    deviceType: string
}

interface sensorTypeI {
    type: string
    value: string
}

const {Option} = Select;

const DeviceSettingsForm: React.FC<Device0005Props> = ({
                                                           sensorSettings,
                                                           units,
                                                           form,
                                                           deviceType,
                                                       }) => {
    const sensorType: sensorTypeI[] = [
        {type: "BOOL", value: "Digital"},
        {type: "NUMERIC", value: "Analog"},
    ];

    const currentName = (index?: number, name?: string) => {
        if (deviceType === "0006") {
            return `CLI ${index + 1}`;
        }
        return `${name} ${index + 1}`;
    };

    useEffect(() => {
        form.setFieldsValue(sensorSettings);
    }, [sensorSettings, form]);


    return (
        <React.Fragment>
            <div className={classes.driver}>
                <span>{sensorSettings.name}</span>
                <div className={classes.cssBaseLine}/>
            </div>

            <div className={classes.blocksWrap}>
                {
                    sensorSettings?.sensors?.map((sensor: SettingsSensor, index: number) => {
                        return <div className={classes.sideBlock} key={`wrap_device_map${sensor.id}${index}`}>

                            <InputWrap title={`${currentName(index, sensorSettings.name)}`}
                                       key={`pulse_1_${sensor?.type}${index}`}>
                                <Form.Item name={`${sensor.id} type`}
                                           initialValue={sensor?.type === "BOOL" ? "Digital" : "Analog"}
                                >
                                    <Select>
                                        {
                                            sensorType?.map((item: sensorTypeI, index: number) => (
                                                <Option value={item?.type}
                                                        key={`option_unit${item?.type}_${item?.value}${index}`}>{item?.value}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title={`${currentName(index, sensorSettings.name)} Unit Name`}
                                       key={`pulse_1_unit_name${sensor?.unit}${index}`}>
                                <Form.Item name={`${sensor.id} unit`}
                                           initialValue={sensor?.unit}
                                >
                                    <Select>
                                        {
                                            units?.map((item: Unit, index: number) => (
                                                <Option value={item?.name}
                                                        key={`option_unit${item?.id}_${item?.name}${index}`}>{item?.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title={`${currentName(index, sensorSettings.name)} k Value`}
                                       key={`k_value${sensor?.k_value}${index}`}>
                                <Form.Item name={`${sensor.id} k`}
                                           initialValue={sensor?.k_value}
                                >
                                    <InputNumber style={{width: "100%"}} min={0}/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title={`${currentName(index, sensorSettings.name)} c Value`}
                                       key={`c_value${sensor?.c_value}${index}`}>
                                <Form.Item name={`${sensor.id} c`}
                                           initialValue={sensor?.c_value}
                                >
                                    <InputNumber style={{width: "100%"}} min={0}/>
                                </Form.Item>
                            </InputWrap>
                        </div>;
                    })
                }
            </div>
        </React.Fragment>
    );
};

export default DeviceSettingsForm;