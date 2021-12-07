import React, {useState} from "react";
import {DatePicker, Form, Select} from "antd";

import {ReactComponent as Date} from "../../../assets/icons/date.svg";
import InputWrap from "../../../components/InputWrap";
import {CustomButton} from "../../../components/Button";

import classes from "../Notifications.module.scss";
import {Site} from "../../../store/branches/sites/stateTypes";
import {Device} from "../../../store/branches/devices/stateTypes";
import clsx from "clsx";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

const {Option} = Select;
const {RangePicker} = DatePicker;

interface NotificationsFormProps {
    form: any;
    isClearFilters: boolean;
    onClearFilters: () => void;
    handSelectDate?: (value: any, option: any) => void;
    handSelectSite?: (value: any, option: any) => void;
    handSelectDevice?: (value: any, option: any) => void;
    handSelectType?: (value: any, option: any) => void;
    sites?: Site[];
    devices?: Device[];
}

const TYPES = {
    alarm_off: "Alarm Cleared",
    alarm_on: "Alarm Detected",
    device_administration: "Device administration",
    device_offline: "Device offline",
    device_online: "Device online",
    maintenance: "Maintenance",
    power_up: "Device Power Up",
    site_administration: "Site administration",
    sn2_status_change: "SN2 Status Change",
    test: "Test Email",
    warning_off: "Warning Cleared",
    warning_on: "Warning Detected",
};

const NotificationsForm: React.FC<NotificationsFormProps> = ({
                                                                 form,
                                                                 isClearFilters,
                                                                 onClearFilters,
                                                                 handSelectDate,
                                                                 handSelectDevice,
                                                                 handSelectSite,
                                                                 handSelectType,
                                                                 sites,
                                                                 devices,
                                                             }) => {
    const {site, device} = useCurrentSelection();
    const [dates, setDates] = useState([]);

    const selectedSite = sites?.filter(item => item?.id === site?.id)[0]?.title;
    const selectedDevice = devices?.filter(item => item?.id === device?.id)[0]?.title;

    const initialSite = sites[0]?.title;
    const initialDevices = devices[0]?.title;

    const disabledDate = (current: any) => {
        if (!dates || dates.length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], "days") > 30;
        const tooEarly = dates[1] && dates[1].diff(current, "days") > 30;
        return tooEarly || tooLate;
    };

    return (
        <div>
            <Form name="notifications_form"
                  form={form}
                  className={classes.formWrap}
                  initialValues={{remember: true}}>
                <div className={classes.dateIcon}>
                    <Date/>
                </div>

                <div className={clsx(classes.rangePickerMedia, classes.select)}>
                    <InputWrap title="Date">
                        <Form.Item name="date" className={classes.rangePicker}>
                            <RangePicker onChange={handSelectDate}
                                         inputReadOnly={true}
                                         className={clsx("range-picker", classes.rangePickerInput)}
                                         disabledDate={disabledDate}
                                         onCalendarChange={val => setDates(val)}
                            />
                        </Form.Item>
                    </InputWrap>
                </div>

                <div className={classes.select}>
                    <InputWrap title="Site" className={classes.options}>
                        <Form.Item name="site" initialValue={selectedSite || initialSite}>

                            <Select onSelect={handSelectSite} size="large" placeholder="Select">
                                <Option value={"All"}
                                        key={"select_all"}
                                        props={"All"}
                                >
                                    All
                                </Option>
                                {sites?.map((item: Site) => (
                                        <Option
                                            value={item.id}
                                            key={item.id}
                                            props={item.id}
                                        >
                                            {item.title}
                                        </Option>
                                    ),
                                )}
                            </Select>
                        </Form.Item>
                    </InputWrap>
                </div>

                <div className={classes.select}>
                    <InputWrap title="Device" className={classes.options}>
                        <Form.Item name="device" initialValue={selectedDevice || initialDevices}
                        >

                            <Select onSelect={handSelectDevice} size="large" placeholder="Select">
                                <Option value={"All"}
                                        key={"select_all"}
                                        props={"All"}
                                >
                                    All
                                </Option>
                                {devices && devices.map((item: any, index) => (
                                    <Option value={item.id}
                                            key={item.id}
                                            props={item.id}
                                    >
                                        {item.title}
                                    </Option>
                                ))}

                            </Select>
                        </Form.Item>
                    </InputWrap>
                </div>

                <div className={classes.select}>
                    <InputWrap title="Type" className={classes.options}>
                        <Form.Item name="type" initialValue={"ALL"}>

                            <Select onSelect={handSelectType} size="large" placeholder="Select">
                                <Option value={"All"}
                                        key={"select_all"}
                                        props={"All"}
                                >
                                    All
                                </Option>
                                {Object.entries(TYPES).map(([value, label]: any, index) => (
                                    <Option value={value}
                                            key={value}
                                            props={value}
                                    >
                                        {label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </InputWrap>
                </div>


                <div className={classes.button}>
                    {
                        isClearFilters && (
                            <Form.Item>
                                <CustomButton width="110px"
                                              height="40px"
                                              padding="2px 2px"
                                              fontSize="13px"
                                              color="gray"
                                              htmlType="submit"
                                              onClick={onClearFilters}
                                >
                                    <span>CLEAR FILTER</span>
                                </CustomButton>
                            </Form.Item>
                        )
                    }
                </div>
            </Form>
        </div>
    );
};

export default NotificationsForm;
