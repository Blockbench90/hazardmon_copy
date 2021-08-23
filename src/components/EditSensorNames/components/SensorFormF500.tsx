import React, {useEffect} from "react";
import InputWrap from "../../InputWrap";
import {Form, Input, Select} from "antd";

import {Degrees, SensorNamesNetworks} from "../../../store/branches/sensors/stateTypes";

import classes from "../EditSensorsNames.module.scss";

interface SensorFormProps {
    sensorGroupF500?: SensorNamesNetworks[]
    degrees?: string
    form?: any
}

const {Option} = Select;
const SensorFormF500: React.FC<SensorFormProps> = ({
                                                       sensorGroupF500,
                                                       degrees,
                                                       form,
                                                   }) => {

    useEffect(() => {
        form.setFieldsValue(sensorGroupF500);
    }, [sensorGroupF500, form]);


    return (
        <React.Fragment>
            <div className={classes.inputWrapDegrees}>
                <InputWrap title={"Degrees Used*"}
                           key={`degrees_used${degrees}`}
                >
                    <Form.Item name={"degrees"}
                               initialValue={degrees}
                               rules={[{
                                   required: true,
                                   message: "Please select degrees",
                               }]}
                    >
                        <Select>
                            <Option value={Degrees.F}>F</Option>
                            <Option value={Degrees.C}>C</Option>
                        </Select>
                    </Form.Item>
                </InputWrap>
            </div>

            <div className={classes.blocksWrap}>

                {
                    sensorGroupF500?.map((item, index) => (

                        <InputWrap title={item?.label}
                                   classNameTitle={classes.inputWrapTitle}
                                   key={`input_sensor_networks${item.label}${index}`}
                        >
                            <Form.Item name={`network${index}`} initialValue={item?.name} >
                                <Input/>
                            </Form.Item>
                        </InputWrap>

                    ))
                }
            </div>
        </React.Fragment>
    );
};
export default SensorFormF500;