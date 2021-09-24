import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Alert, DatePicker, TimePicker} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useParams} from "react-router-dom";
import moment from "moment";

import {CustomButton} from "../../Button";

import {graphsAC} from "../../../store/branches/graphs/actionCreators";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../../store/status";

import classes from "../CustomHistoricalGraphs.module.scss";


const SearchBlock: React.FC = () => {
    const dispatch = useDispatch();
    const {times}: any = useParams();

    const intiDate = times?.split("&")[0];
    const initTime = times?.split("&")[1].split(":").slice(0, 2).join(":");

    const {device} = useCurrentSelection();

    const startMonth = moment().startOf("month").format("YYYY-MM-DD");
    const today = moment().format("HH:MM");

    const [date, setDate] = useState<string>(intiDate ? intiDate : startMonth);
    const [time, setTime] = useState<string>(initTime ? initTime : today);

    const dateFormatList = ["YYYY-MM-DD"];
    const timeFormat = "HH:mm";


    const onSearch = () => {
        if (!device) {
            dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.FETCH_GRAPHS_TIME_ERROR));
            return;
        }
        const payload = {
            date, time, id: device?.id,
        };
        dispatch(graphsAC.fetchCustomGraphsData(payload));
    };

    return (
        <React.Fragment>
            <div className={classes.headerWrap}>
                <div className={classes.headerTitle}>
                    <div className={classes.modalButton}>
                        <DatePicker
                            size="large"
                            className={classes.datePicker}
                            defaultValue={moment(date, dateFormatList)}
                            placeholder="Data"
                            inputReadOnly={true}
                            onChange={(date: any, dateString: string) => setDate(dateString)}
                            format={dateFormatList}
                        />

                        <TimePicker format={timeFormat}
                                    inputReadOnly={true}
                                    defaultValue={moment(time, timeFormat)}
                                    placeholder="Time"
                                    size="large"
                                    className={classes.timePicker}
                                    onChange={(value: any, timeString: string) => setTime(timeString)}
                        />

                        <CustomButton width="81px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      disabled={!date || !time}
                                      className={classes.buttonTitle}
                                      onClick={onSearch}
                        >
                            SEARCH
                        </CustomButton>
                    </div>
                </div>

                <div className={classes.alertHistoricalWrap}>
                    {
                        date && time
                            ?
                            <Alert message=""
                                   description={`This is a historical snapshots. The data is not live. Snapshots date/time: ${date} ${time}`}
                                   className={classes.alertHistorical}
                                   type="error"
                                   icon={<ExclamationCircleOutlined className={classes.icon}/>}
                                   showIcon
                            />
                            :
                            null
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default SearchBlock;
