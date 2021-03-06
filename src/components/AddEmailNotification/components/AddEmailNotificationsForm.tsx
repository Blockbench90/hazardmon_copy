import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {Checkbox, Form, Input, InputNumber, Select, Tooltip} from "antd";
import InputWrap from "../../InputWrap";

import {
    ContactWhen,
    contactWhenType,
    emailNotificationsTypeMap,
    NOTIFICATION_SETTING_TYPES,
} from "../../../helpers/notifications_settings_type";
import {Site, SitesState} from "../../../store/branches/sites/stateTypes";
import {Device} from "../../../store/branches/devices/stateTypes";
import {EmailNotification} from "../../../store/branches/user/stateTypes";

import classes from "../AddEmailNotifications.module.scss";


const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

interface AddEmailNotificationFormProps {
    isCheckedSend: boolean;
    isCheckedSmart: boolean;
    isAllDevices: boolean;
    timeAlarm: string;
    numberX: number;
    onCheckedSend: () => void;
    onCheckedAllDevices: () => void;
    onCheckedStart: () => void;
    onEventTypeChange: (type: any, option: any) => void;
    onNumberXChange: (value: number) => void;
    onContactChange: (type: any, option: any) => void;
    setList: (value: any) => void;
    eventType: string;
    sitesData: SitesState["sitesData"];
    current?: EmailNotification;
    form: any;
    selectedBefore?: string[];
}

const AddEmailNotificationForm: React.FC<AddEmailNotificationFormProps> = ({
                                                                               form,
                                                                               onCheckedSend,
                                                                               isCheckedSend,
                                                                               onEventTypeChange,
                                                                               eventType,
                                                                               isCheckedSmart,
                                                                               onCheckedStart,
                                                                               onContactChange,
                                                                               isAllDevices,
                                                                               onCheckedAllDevices,
                                                                               sitesData,
                                                                               timeAlarm,
                                                                               numberX,
                                                                               onNumberXChange,
                                                                               current,
                                                                               setList,
                                                                               selectedBefore,
                                                                           }) => {
    const [currentNotify, setCurrent] = useState<EmailNotification>(null);

    const getAllDevicesArrays = sitesData?.results?.map((itemSite: Site) => {
        return itemSite?.devices?.map((itemDevice: Device) => {
            return {label: itemDevice?.title, value: itemDevice?.id};
        });
    });

    let allDeviceArrayOptions = [];
    getAllDevicesArrays?.forEach((item) => {
        if (item?.length === 0) {
            return;
        }
        item?.forEach(device => allDeviceArrayOptions = [...allDeviceArrayOptions, {
            label: device?.label,
            value: device?.value.toString(),
        }]);
    });

    useEffect(() => {
        if (!!current) {
            setCurrent(current);
        }

        return () => {
            setCurrent(null);
            form.resetFields();
        };
    }, [form, current, currentNotify]);

    const onChangeCheckboxGroup = (checkedValues) => {
        setList(checkedValues);
    };

    return (
        <div className={classes.addNotifyWrap}>
            <div className={classes.container}>
                <div className={classes.groupInputs}>
                    <div className={classes.blockWrap}>

                        <InputWrap title="Delivery method*">
                            <Form.Item name="delivery_method"
                                       initialValue={currentNotify?.delivery_method || "Email"}
                                       rules={[{
                                           required: true,
                                           message: "Please input your delivery method",
                                       }]}>
                                <Select>
                                    <Option value={"Email"}>Email</Option>
                                </Select>
                            </Form.Item>
                        </InputWrap>

                        <InputWrap>
                            <Form.Item name="alternative">
                                <Checkbox checked={isCheckedSend}
                                          onChange={onCheckedSend}
                                >Send to alternative</Checkbox>
                            </Form.Item>
                        </InputWrap>

                        {
                            isCheckedSend
                            &&
                            <InputWrap title="E-mail">
                                <Form.Item name="alternative_contact"
                                           initialValue={currentNotify?.alternative_contact}
                                           rules={[{
                                               required: true,
                                               message: "Please input your alternative contact",
                                           }]}>
                                    <Input/>
                                </Form.Item>
                            </InputWrap>
                        }

                        <InputWrap title={"Event type*"} key={"event_type"}>
                            <Form.Item name="event"
                                       initialValue={emailNotificationsTypeMap.get(currentNotify?.event_type) || Object.values(NOTIFICATION_SETTING_TYPES)[0]}
                                       rules={[{
                                           required: true,
                                           message: "Please select your type",
                                       }]}>
                                <Select onSelect={onEventTypeChange}>
                                    {
                                        Object.values(NOTIFICATION_SETTING_TYPES).map((item: any, index: number) => (
                                            <Option value={item}
                                                    key={item + index}
                                            >
                                                {item}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </InputWrap>

                        {
                            ["alarm", "warning"].includes(eventType)
                            &&
                            <InputWrap>
                                <Form.Item name="smart">
                                    <Tooltip placement="topRight" title="Smart Notify makes sure that the total number of emails
                                                received is limited to a number defined by the user per hour">
                                        <Checkbox checked={isCheckedSmart}
                                                  onChange={onCheckedStart}>
                                            Start Notify
                                        </Checkbox>
                                    </Tooltip>
                                </Form.Item>
                            </InputWrap>
                        }


                        {
                            isCheckedSmart
                                ?
                                <InputWrap title="Number of notifications per hour per sensor">
                                    <Form.Item name="number_of_notifications"
                                               initialValue={currentNotify?.number_per_hour}>
                                        <InputNumber min={0} style={{width: "100%"}}/>
                                    </Form.Item>
                                </InputWrap>
                                :
                                <InputWrap title="Contact when*">
                                    <Form.Item name="contact"
                                               shouldUpdate
                                               initialValue={currentNotify ? contactWhenType.get(currentNotify?.contact_when) : Object.values(ContactWhen)[0]}
                                               rules={[{
                                                   required: true,
                                                   message: "Please select your type",
                                               }]}>
                                        <Select onSelect={onContactChange}>
                                            {
                                                Object.values(ContactWhen).map((item: any, index: number) => (
                                                    <Option value={item}
                                                            key={item + index}
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </InputWrap>
                        }

                        {
                            timeAlarm !== contactWhenType.get("0") && !isCheckedSmart
                            &&
                            <InputWrap title="X*">
                                <Form.Item name="X" initialValue={currentNotify?.x}>
                                    <InputNumber min={1} style={{width: "100%"}} onChange={onNumberXChange}
                                                 value={numberX}/>
                                </Form.Item>
                            </InputWrap>
                        }

                    </div>

                    <div className={classes.checkboxWrap}>
                        <InputWrap>
                            <Form.Item name="all_devices">
                                <Checkbox checked={isAllDevices}
                                          onChange={onCheckedAllDevices}>
                                    All Devices
                                </Checkbox>
                            </Form.Item>
                        </InputWrap>

                        {
                            !isAllDevices
                            &&
                            <InputWrap>
                                <div className={classes.selectDevicesWrap}>
                                    <span className={classes.selectDevices}>Select Devices:</span>
                                </div>
                                <CheckboxGroup defaultValue={selectedBefore} onChange={onChangeCheckboxGroup}>
                                    {
                                        sitesData?.results?.map((item: Site, index: number) => {
                                            return (
                                                <div key={item.title + item.id + index}>
                                                    <div className={classes.locationTitle}>
                                                        <span>{item?.title}</span>
                                                    </div>

                                                    <div>
                                                        {
                                                            item?.devices?.length === 0
                                                                ?
                                                                <div
                                                                    className={clsx(classes.noDevices, classes.checkboxItem)}>
                                                                    <span>No devices</span>
                                                                </div>
                                                                :
                                                                allDeviceArrayOptions?.map((item: any, index: number) => {
                                                                    return <div
                                                                        className={clsx(classes.hasDevice, classes.checkboxItem)}
                                                                        key={item.value + index + item.label}>

                                                                        <Checkbox
                                                                            value={item?.value}>{item?.label}</Checkbox>
                                                                    </div>;
                                                                })}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </CheckboxGroup>
                            </InputWrap>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmailNotificationForm;