import React from "react";
import clsx from "clsx";
import {Checkbox, Form, Input, InputNumber, Select, Tooltip} from "antd";
import InputWrap from "../../InputWrap";

import {ContactWhen, NOTIFICATION_SETTING_TYPES } from "../../../helpers/notifications_settings_type";
import {Site, SitesState} from "../../../store/branches/sites/stateTypes";
import { Device } from "../../../store/branches/devices/stateTypes";

import classes from "../AddEmailNotifications.module.scss";
import {getKeyByValue} from "../../../helpers/getKeyByValue";


const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

interface AddEmailNotificationFormProps {
    isCheckedSend: boolean
    isCheckedSmart: boolean
    isAllDevices: boolean
    timeAlarm: string
    numberX: number
    onCheckedSend: () => void
    onCheckedAllDevices: () => void
    onCheckedStart: () => void
    onEventTypeChange: (type: any, option: any) => void
    onNumberXChange: (value: number) => void
    onContactChange: (type: any, option: any) => void
    eventType: string
    sitesData: SitesState["sitesData"]
}

const AddEmailNotificationForm: React.FC<AddEmailNotificationFormProps> = ({
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
                                                                               onNumberXChange

                                                                        }) => {
        return (
                    <div className={classes.addNotifyWrap}>
                        <div className={classes.container}>

                            <div className={classes.groupInputs}>
                                <div className={classes.blockWrap}>

                                    <InputWrap title="Delivery method*">
                                        <Form.Item name="delivery_method"
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
                                            <Form.Item name="alternative_contact" rules={[{
                                                required: true,
                                                message: "Please input your alternative contact",
                                            }]}>
                                                <Input/>
                                            </Form.Item>
                                        </InputWrap>
                                    }

                                    <InputWrap title={"Event type*"} key={"event_type"}>
                                        <Form.Item name="event_type"
                                                   initialValue={Object.values(NOTIFICATION_SETTING_TYPES)[0]}
                                                   rules={[{
                                                       required: true,
                                                       message: "Please select your type",
                                                   }]}>
                                            <Select onSelect={onEventTypeChange}>
                                                {
                                                    Object.values(NOTIFICATION_SETTING_TYPES).map((item: any) => (
                                                        <Option value={item}
                                                                key={item}
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
                                                <Form.Item name="number_of_notifications">
                                                    <InputNumber min={0} style={{width: "100%"}}/>
                                                </Form.Item>
                                            </InputWrap>
                                            :
                                            <InputWrap title="Contact when*">
                                                <Form.Item name="contact_when"
                                                           initialValue={Object.values(ContactWhen)[0]}
                                                           rules={[{
                                                               required: true,
                                                               message: "Please select your type",
                                                           }]}>
                                                    <Select onSelect={onContactChange}>
                                                        {
                                                            Object.values(ContactWhen).map((item: any) => (
                                                                <Option value={item}
                                                                        key={item}
                                                                >
                                                                    {item}
                                                                </Option>
                                                            ))}
                                                    </Select>
                                                </Form.Item>
                                            </InputWrap>
                                    }

                                    {
                                        +getKeyByValue(ContactWhen, timeAlarm) > 0
                                        &&
                                        <InputWrap title="X*">
                                            <Form.Item name="X" initialValue={numberX}>
                                                <InputNumber min={1} style={{width: "100%"}} onChange={onNumberXChange} value={numberX}/>
                                            </Form.Item>
                                        </InputWrap>
                                    }

                                </div>


                                <div className={classes.checkboxWrap}>

                                    <InputWrap>
                                        <Form.Item name="smart">
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
                                            <Form.Item name="devices">
                                                <CheckboxGroup>
                                                    {
                                                        sitesData?.results?.map((item: Site) => (
                                                            <div key={item.title + item.id}>
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
                                                                            item?.devices?.map((item: Device, index: number) => (
                                                                                <div
                                                                                    className={clsx(classes.hasDevice, classes.checkboxItem)}
                                                                                    key={item.id + index}>
                                                                                    <Checkbox value={item?.id}
                                                                                              key={item.title + item.id}>
                                                                                        {item?.title}
                                                                                    </Checkbox>
                                                                                </div>
                                                                            ))}
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </CheckboxGroup>
                                            </Form.Item>
                                        </InputWrap>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

        );
    }
;

export default AddEmailNotificationForm;