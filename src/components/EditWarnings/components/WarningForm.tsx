import React from "react";
import {Button, Form, Input, Select} from "antd";
import clsx from "clsx";
import {MinusCircleOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";

import InputWrap from "../../InputWrap";

import {Warning, WarningSensor, WarningsSensors} from "../../../store/branches/sensors/stateTypes";
import HeaderWarnings from "./HeaderForm";

import classes from "../EditWarnings.module.scss";

const {Option, OptGroup} = Select;

interface WarningFormProps {
    warning_sensors: WarningsSensors[]
    warnings: Warning[]
    device: { id: number, title: string, udf_id: string, device_type: string }
    signOption: string[]
    onSubmit?: (values: any) => void
}

const WarningForm: React.FC<WarningFormProps> = ({
                                                     warning_sensors,
                                                     warnings,
                                                     signOption,
                                                     device,
                                                     onSubmit,
                                                 }) => {
    const [form] = useForm();
    const history = useHistory();

    const onCancel = () => {
        form.resetFields();
        history.push("/dashboard");
    };

    return (
        <React.Fragment>
            <Form name="edit_warnings"
                  form={form}
                  autoComplete="on"
                  initialValues={{edit_warnings: warnings}}
                  onFinish={onSubmit}
            >
                <HeaderWarnings onCancel={onCancel}/>

                <div className={classes.inputsWrap}>
                    <div className={classes.container}>
                        <div className={classes.groupInputs}>

                            <Form.List name="edit_warnings">
                                {(fields, {add, remove}) => {
                                    return (
                                        <React.Fragment>
                                            {fields.map(({key, name, fieldKey, ...restField}) => (
                                                <React.Fragment key={key}>

                                                    <div className={classes.sensor}>
                                                        <InputWrap title="Sensor">
                                                            <Form.Item {...restField}
                                                                       name={[name, "name"]}
                                                                       fieldKey={[fieldKey, "sensor_id"]}
                                                                       rules={[{
                                                                           required: true,
                                                                           message: "Please select your sensor",
                                                                       }]}>
                                                                <Select>
                                                                    {warning_sensors && warning_sensors?.map((item: any, index: number) => {
                                                                        if (device?.device_type === "F500-UDF") {
                                                                            return <React.Fragment>
                                                                                <span>{item.name}</span>
                                                                                    {
                                                                                        item.groups && item?.groups.map((item: any, index: number) => (
                                                                                            <OptGroup label={item?.name} key={`sensor_id_${item.id}_${index}`}>
                                                                                                {item?.sensors?.map((item: WarningSensor, index: number) => (
                                                                                                    <Option value={item?.id} key={`warning_sensor_${item.id}${index}}`}>
                                                                                                        {item.name || ""}
                                                                                                    </Option>
                                                                                                ))}
                                                                                            </OptGroup>
                                                                                        ))
                                                                                    }
                                                                            </React.Fragment>;
                                                                        } else if (item.name.split(" ").includes("Alignment")) {
                                                                            return <OptGroup label={item?.name}
                                                                                             key={`sensor_id_${item.id}_${index}`}>
                                                                                {item?.sensors?.map((sensor: WarningSensor, index: number) => (
                                                                                    <Option value={sensor?.id}
                                                                                            key={`warning_sensor_${sensor.id}${index}${item.name}`}>
                                                                                        {sensor?.name}
                                                                                    </Option>
                                                                                ))}
                                                                            </OptGroup>;
                                                                        } else {
                                                                            console.log("item ==>", item);
                                                                            return <OptGroup label={item?.name}
                                                                                             key={`sensor_id_${item.id}_${index}`}>
                                                                                {item?.sensors?.map((sensor: WarningSensor, index: number) => (
                                                                                    <Option value={sensor?.id}
                                                                                            key={`warning_sensor_${sensor.id}${index}`}>
                                                                                        {sensor?.name}
                                                                                    </Option>
                                                                                ))}
                                                                            </OptGroup>;
                                                                        }
                                                                    })}
                                                                </Select>
                                                            </Form.Item>
                                                        </InputWrap>
                                                    </div>

                                                    <div className={classes.signWrap}>
                                                        <InputWrap title="Sign">
                                                            <Form.Item {...restField}
                                                                       name={[name, "sign"]}
                                                                       fieldKey={[fieldKey, "sign"]}
                                                                       className={classes.sign}
                                                                       rules={[{
                                                                           required: true,
                                                                           message: "Please select...",
                                                                       }]}>
                                                                <Select value="Sign" className={classes.sign}>
                                                                    {signOption.map((item: any, index: number) => (
                                                                        <Option value={item}
                                                                                key={`sign_${index}`}
                                                                        >
                                                                            {item}
                                                                        </Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>
                                                        </InputWrap>
                                                    </div>

                                                    <div
                                                        className={clsx(classes.addWarningValueWrap, classes.valueWrap)}>
                                                        <InputWrap title="Value">
                                                            <Form.Item {...restField}
                                                                       name={[name, "value"]}
                                                                       fieldKey={[fieldKey, "last"]}
                                                                       className={classes.value}
                                                                       rules={[{
                                                                           required: true,
                                                                           message: "Please input your value",
                                                                       }]}>
                                                                <Input/>
                                                            </Form.Item>
                                                        </InputWrap>
                                                    </div>
                                                    <MinusCircleOutlined style={{color: "red"}}
                                                                         onClick={() => remove(name)}/>

                                                </React.Fragment>
                                            ))}

                                            <div className={classes.newField}>
                                                <div/>
                                                <div>
                                                    <Form.Item>
                                                        <Button type="primary"
                                                                style={{
                                                                    width: "150px",
                                                                    height: "40px",
                                                                    borderRadius: "7px",
                                                                }}
                                                                onClick={() => add()} block>
                                                            Add field
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </Form.List>
                        </div>
                    </div>
                </div>
            </Form>
        </React.Fragment>
    );
};
export default WarningForm;
