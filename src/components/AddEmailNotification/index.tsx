import React, {useCallback, useEffect, useState} from "react";
import clsx from "clsx";
import {Form} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useDispatch, useSelector} from "react-redux";

import {ContactWhen, NOTIFICATION_SETTING_TYPES} from "../../helpers/notifications_settings_type";
import {getKeyByValue} from "../../helpers/getKeyByValue";
import HeaderFormAddEmailNotification from "./components/HeaderFormEmail";
import {selectSitesState} from "../../store/selectors";
import {userAC} from "../../store/branches/user/actionCreators";
import {Site} from "../../store/branches/sites/stateTypes";
import {Device} from "../../store/branches/devices/stateTypes";
import AddEmailNotificationForm from "./components/AddEmailNotificationsForm";
import UserAlert from "../Alerts/user";
import {LoadingStatus} from "../../store/types";
import Spinner from "../Spinner";


const AddEmailNotification: React.FC = () => {
        const dispatch = useDispatch();
        const [form] = useForm();
        const {sitesData, status} = useSelector(selectSitesState);
        let allDevices: string[] = [];

        const [isCheckedSend, setCheckedSend] = useState<boolean>(false);
        const [isCheckedSmart, setCheckedSmart] = useState<boolean>(false);
        const [isAllDevices, setAllDevices] = useState<boolean>(false);
        const [numberX, setNumberX] = useState<number>(1)
        const [eventType, setEventType] = useState<string>("alarm");
        const [timeAlarm, setTimeAlarm] = useState<string>("As Alert happens");


        sitesData?.results?.forEach(({devices}: Site) => {
            if (devices.length === 0) {
                return;
            }
            allDevices = devices?.map((item: Device) => item?.id.toString());
        });

        const onCheckedSend = () => {
            setCheckedSend(!isCheckedSend);
        };

        const onCheckedStart = () => {
            setCheckedSmart(!isCheckedSmart);
        };

        const onCheckedAllDevices = () => {
            setAllDevices(!isAllDevices);
        };

        const onNumberXChange = (value: number) => {
            setNumberX(value);
        };

        const onEventTypeChange = useCallback((type, option) => {
            const key = getKeyByValue(NOTIFICATION_SETTING_TYPES, option.key);
            setEventType(key);
        }, []);

        const onContactChange = useCallback((type, option) => {
            const key = getKeyByValue(ContactWhen, option.key);
            console.log("key: ", key);
            setTimeAlarm(option.key);
        }, []);


        const onSubmit = async (values: any) => {
            const data = {
                delivery_method: values.delivery_method,
                send_to_alternative: isCheckedSend,
                alternative_contact: values.alternative_contact,
                event_type: eventType,
                contact_when: getKeyByValue(ContactWhen, timeAlarm),
                periodical: +getKeyByValue(ContactWhen, timeAlarm) > 0,
                x: numberX,
                all_devices: isAllDevices,
                number_per_hour: values.number_of_notifications,
                devices: isAllDevices ? allDevices : values.devices,
            };
            dispatch(userAC.addEmailNotifications(data))
            console.log("values submit email notifications:", values);
            console.log("data:", data);
        };


        useEffect(() => {
            if (!sitesData) {
                dispatch(userAC.fetchEmailNotifications());
            }
        }, [dispatch, sitesData]);

        if(status === LoadingStatus.LOADING ){
            return <Spinner/>
        }

        return (
            <div className={clsx("header-link")}>
                <UserAlert/>

                <Form name="user_setting"
                      form={form}
                      initialValues={{remember: true}}
                      onFinish={onSubmit}
                >
                    <HeaderFormAddEmailNotification/>

                    <AddEmailNotificationForm eventType={eventType}
                                              isAllDevices={isAllDevices}
                                              isCheckedSend={isCheckedSend}
                                              isCheckedSmart={isCheckedSmart}
                                              sitesData={sitesData}
                                              timeAlarm={timeAlarm}
                                              numberX={numberX}
                                              onContactChange={onContactChange}
                                              onCheckedSend={onCheckedSend}
                                              onCheckedStart={onCheckedStart}
                                              onEventTypeChange={onEventTypeChange}
                                              onNumberXChange={onNumberXChange}
                                              onCheckedAllDevices={onCheckedAllDevices}
                    />
                </Form>
            </div>
        );
    }
;

export default AddEmailNotification;