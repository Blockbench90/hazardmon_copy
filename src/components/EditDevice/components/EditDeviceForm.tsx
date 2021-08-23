import React from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {Form, Input, Select, Typography} from "antd";
import InputWrap from "../../InputWrap";

import HeaderFormEditDevice from "./HeaderForm";
import {Site} from "../../../store/branches/sites/stateTypes";
import {Device} from "../../../store/branches/devices/stateTypes";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

import classes from "../EditDevise.module.scss";

const {Title} = Typography;
const {Option} = Select;


interface EditDeviceFormProps {
    form?: any;
    locations?: Site[];
    device: Device;
    isEmulatedAs: Device[];
    device_type: any;
    currentDeviceType: string
    isSuperUser: boolean;
    isOEM: boolean;
    onCancel?: () => void;
    onDeactivateDevice?: () => void;
    onRemoveDevice?: () => void;
    onSubmit: (values: any) => void;
    handSelectLocation: (value: any, option: any) => void;
    handleSelectDeviceType: (value: any, option: any) => void;
}

const EditDeviceForm: React.FC<EditDeviceFormProps> = ({
                                                           onCancel,
                                                           form,
                                                           handSelectLocation,
                                                           onSubmit,
                                                           isSuperUser,
                                                           locations,
                                                           device,
                                                           device_type,
                                                           currentDeviceType,
                                                           handleSelectDeviceType,
                                                           onRemoveDevice,
                                                           onDeactivateDevice,
                                                           isEmulatedAs,
                                                           isOEM,
                                                       }) => {
    const {client, site} = useCurrentSelection();

    return (
        <div className={clsx("header-link", classes.editDeviceWrap)}>
            <Form name="edit_device"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}
            >
                <Title level={5}>
                    <Link to="/sites">{client?.company || "Client"}/</Link>
                    <Link to="/devices">{site?.title || "Site"}</Link>
                </Title>

                <HeaderFormEditDevice onCancel={onCancel}
                                      onDeactivateDevice={onDeactivateDevice}
                                      onRemoveDevice={onRemoveDevice}
                />

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
                                               initialValue={device?.serial_number}
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your serial number",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Title*">
                                    <Form.Item name="title"
                                               initialValue={device?.title}
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
                                               initialValue={device?.code}
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your code",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Device Type*">
                                    <Form.Item name="device_type"
                                               initialValue={device?.device_type && device_type[device?.device_type]}
                                               rules={[{
                                                   required: true,
                                                   message: "Please select your type",
                                               }]}>
                                        <Select onSelect={handleSelectDeviceType}>
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

                                {["0300", "0005", "0006", "F500-UDF"].includes(currentDeviceType)
                                &&
                                (<InputWrap title="UDF ID">
                                    <Form.Item name="udf_id"
                                               initialValue={device?.udf_id}
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
                                </InputWrap>)}

                                {['F500', 'F500-UDF'].includes(currentDeviceType)
                                &&
                                (<InputWrap title="IP Address">
                                    <Form.Item name="ip_address">
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>)}

                                {
                                    isSuperUser || isOEM
                                        ?
                                        <InputWrap title="Is emulated as">
                                            <Form.Item name="is_emulated_as"
                                                       initialValue={device?.is_emulated_as}
                                            >
                                                <Select>
                                                    {isEmulatedAs && isEmulatedAs?.map((item: any, index: any) => (
                                                        <Option value={item?.id}
                                                                key={`${item.id}_emulated_${index}`}>
                                                            {item?.title}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </InputWrap>
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default EditDeviceForm;
