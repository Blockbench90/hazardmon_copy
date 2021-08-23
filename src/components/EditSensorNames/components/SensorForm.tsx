import React, {useEffect} from "react";
import InputWrap from "../../InputWrap";
import {Form, Input} from "antd";

import {SensorNamesArray} from "../../../store/branches/sensors/stateTypes";

import classes from "../EditSensorsNames.module.scss";

interface SensorFormProps {
    sensorGroup?: SensorNamesArray
    form?: any
}

const SensorForm: React.FC<SensorFormProps> = ({
                                                   sensorGroup,
                                                   form,
                                               }) => {

    useEffect(() => {
        form.setFieldsValue(sensorGroup);
    }, [sensorGroup, form]);

    return (
        <React.Fragment>
            <div className={classes.driver}>
                <span>{sensorGroup?.name}</span>
                <div className={classes.cssBaseLine}/>
            </div>

            <div className={classes.blocksWrap}>
                {
                    sensorGroup?.sensors?.map((item, index) => (

                        <InputWrap title={item?.label}
                                   classNameTitle={classes.inputWrapTitle}
                                   key={`input_sensor_name${item.id}${item.name}${item.label}${index}`}
                        >
                            <Form.Item name={item?.id} initialValue={item?.name}>
                                <Input/>
                            </Form.Item>
                        </InputWrap>

                    ))
                }
            </div>
        </React.Fragment>
    );
};
export default SensorForm;