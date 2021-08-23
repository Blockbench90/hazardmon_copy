import React, {useCallback, useEffect, useState} from "react";
import clsx from "clsx";
import {Checkbox, Form, Input, Select} from "antd";
import {useForm} from "antd/lib/form/Form";

import {ContactWhen, NOTIFICATION_SETTING_TYPES} from "../../helpers/notifications_settings_type";
import {getKeyByValue} from "../../helpers/getKeyByValue";

import InputWrap from "../InputWrap";
import HeaderFormAddEmailNotification from "./HeaderFormEmail";

import classes from "./AddEmailNotifications.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectSitesState} from "../../store/selectors";
import {userAC} from "../../store/branches/user/actionCreators";
import {Site} from "../../store/branches/sites/stateTypes";
import {Device} from "../../store/branches/devices/stateTypes";


const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

const AddEmailNotificationForm: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const {sitesData} = useSelector(selectSitesState);

    const [isCheckedSend, setCheckedSend] = useState<boolean>(false);
    const [isCheckedSmart, setCheckedSmart] = useState<boolean>(false);
    const [isAllDevices, setAllDevices] = useState<boolean>(false);
    const [eventType, setEventType] = useState<string>("alarm");
    const [timeAlarm, setTimeAlarm] = useState<string>("As Alert happens");
    console.log(timeAlarm);

    const allDevices = sitesData?.results?.map((item: Site) => {
        if (item?.devices?.length === 0) {
            return;
        }
        const values = item?.devices?.map((item: Device) => item?.id);
        return values;
    });

    console.log(allDevices);
    const onCheckedSend = () => {
        setCheckedSend(!isCheckedSend);
    };
    const onCheckedStart = () => {
        setCheckedSmart(!isCheckedSmart);
    };
    const onCheckedAllDevices = () => {
        setAllDevices(!isAllDevices);
    };

    const onEventTypeChange = useCallback((type, option) => {
        const key = getKeyByValue(NOTIFICATION_SETTING_TYPES, option.key);
        setEventType(key);
        console.log(key);
    }, []);

    const onContactWhenChange = useCallback((type, option) => {
        const key = getKeyByValue(ContactWhen, option.key);
        setTimeAlarm(key);
        console.log(key);
    }, []);


    const onSubmit = async (values: any) => {
        console.log("values submit email notifications:", values);
    };


    useEffect(() => {
        if (!sitesData) {
            dispatch(userAC.fetchEmailNotifications());
        }
    }, [dispatch, sitesData]);

    return (
        <div className={clsx("header-link")}>
            <Form name="user_setting"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}
            >
                <HeaderFormAddEmailNotification/>

                <div className={classes.addNotifyWrap}>
                    <div className={classes.container}>

                        <div className={classes.groupInputs}>
                            <div className={classes.blockWrap}>

                                <InputWrap title="Delivery method*">
                                    <Form.Item name="method"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your delivery method",
                                               }]}>
                                        <Select>
                                            <Option value={"email"}>Email</Option>
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
                                        <Form.Item name="email">
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
                                            <Checkbox checked={isCheckedSmart}
                                                      onChange={onCheckedStart}>
                                                Start Notify
                                            </Checkbox>
                                        </Form.Item>
                                    </InputWrap>
                                }


                                {
                                    isCheckedSmart
                                        ?
                                        <InputWrap title="Number of notifications per hour per sensor">
                                            <Form.Item name="number_of_notifications">
                                                <Input/>
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
                                                <Select onSelect={onContactWhenChange}>
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
                                        <Form.Item name="checkbox-group">
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
            </Form>
        </div>
    );
};

export default AddEmailNotificationForm;