import React, {useCallback, useState} from "react";
import clsx from "clsx";
import {Form, Input, Select} from "antd";
import {useSelector} from "react-redux";

import InputWrap from "../../InputWrap";
import {Site} from "../../../store/branches/sites/stateTypes";
import HeaderFormAddDevice from "./HeaderForm";
import {selectSitesState} from "../../../store/selectors";

import classes from "../AddDevise.module.scss";

const {Option} = Select;

interface AddDeviceProps {
    form?: any;
    handleSelectDeviceType?: (value: any, option: any) => void;
    handSelectLocation?: (value: any, option: any) => void;
    onCancel?: () => void;
    onSubmit?: (values: any) => void;
    locations?: Site[];
    device_type?: any;
}

const AddDeviceForm: React.FC<AddDeviceProps> = ({
                                                     form,
                                                     onCancel,
                                                     handSelectLocation,
                                                     onSubmit,
                                                     handleSelectDeviceType,
                                                     device_type,
                                                 }) => {
    const {sitesData} = useSelector(selectSitesState);
    const locations = sitesData?.results;

    const [type, setType] = useState("F500");
    const onDeviceTypeChange = useCallback((type, option) => {
        setType(option.key);
        handleSelectDeviceType(type, option);
    }, [handleSelectDeviceType]);

    return (
        <div className={clsx("header-link", classes.addDeviceWrap)}>
            <Form name="add_device"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}
            >
                <HeaderFormAddDevice onCancel={onCancel}/>

                <div className={classes.inputsWrap}>
                    <div className={classes.container}>
                        <div className={classes.groupInputs}>
                            <div className={classes.blockWrap}>

                                <InputWrap title="Location*">
                                    <Form.Item name="location_id"
                                               initialValue={(locations && locations.length > 0) && locations[0].title}
                                               rules={[{
                                                   required: true,
                                                   message: "Please select your location",
                                               }]}>
                                        <Select onSelect={handSelectLocation}>
                                            {locations && locations.map((item: any) => (
                                                <Option value={item?.title}
                                                        key={item.id}
                                                >
                                                    {item?.title}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Serial Number*">
                                    <Form.Item name="serial_number"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your serial number",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Title*">
                                    <Form.Item name="title"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your title",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>
                            </div>

                            <div className={classes.codeWrap}>
                                <InputWrap title="Code*">
                                    <Form.Item name="code"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your code",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Device Type*">
                                    <Form.Item name="device_type"
                                               initialValue={device_type && Object.values(device_type)[0]}
                                               rules={[{
                                                   required: true,
                                                   message: "Please select your type",
                                               }]}>
                                        <Select onSelect={onDeviceTypeChange}>
                                            {
                                                Object.values(device_type).map((item: any) => (
                                                    <Option value={item}
                                                            key={item}
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </InputWrap>


                                {["WDC4", "ETH-NODE-1", "ETH-NODE-2", "F500 UDF"].includes(type) && (
                                    <InputWrap title="UDF ID*">
                                        <Form.Item name="udf_id"
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message: "Please input your code",
                                                       },
                                                       {
                                                           max: 8,
                                                           message: "UDF ID can't be longer than 8 characters",
                                                       }]}>
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>
                                )}

                                {["F500", "F500 UDF"].includes(type) && (
                                    <InputWrap title="IP Address">
                                        <Form.Item name="ip_address">
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default AddDeviceForm;
