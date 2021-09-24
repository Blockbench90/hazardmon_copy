import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {DatePicker, TimePicker} from "antd";
import {useParams} from "react-router-dom";
import moment from "moment";

import {sensorsAC} from "../../../store/branches/sensors/actionCreators";
import {CustomButton} from "../../Button";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../../store/status";

import classes from "../Historical.module.scss";

interface SearchProps {
    limit: number
    offset: number
    setCurrentTime: ({date, time}: { date: string, time: string }) => void
    setPagination: ({page, pageSize}: { page: number, pageSize: number }) => void
}

const SearchBlock: React.FC<SearchProps> = ({limit, offset, setCurrentTime, setPagination}) => {
    const dispatch = useDispatch();
    const {device} = useCurrentSelection();
    const {times}: any = useParams();

    const initTime = times?.split("&");
    const startMonth = moment().startOf("month").format("YYYY-MM-DD");
    const today = moment().format("HH:MM");

    const [date, setDate] = useState<string>(initTime ? initTime[0] : startMonth);
    const [time, setTime] = useState<string>(initTime ? initTime[1] : today);

    const dateFormatList = ["YYYY-MM-DD"];
    const timeFormat = "HH:mm";

    const onSearch = () => {
        setCurrentTime({date, time});
        setPagination({page: 1, pageSize: 60});

        if (!device) {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE));
            return;
        }

        const payload = {
            date, time, device_id: device?.id, limit: 60, offset: 0,
        };
        dispatch(sensorsAC.fetchHistoricalGraphs(payload));
    };

    return (
        <React.Fragment>
            <div className={classes.headerWrap}>
                <div className={classes.headerTitle}>
                    <div className={classes.modalButton}>
                        <DatePicker
                            size="large"
                            className={classes.datePicker}
                            placeholder="Data"
                            defaultValue={moment(date, dateFormatList)}
                            format={dateFormatList}
                            inputReadOnly={true}
                            onChange={(date: any, dateString: string) => setDate(dateString)}
                        />

                        <TimePicker format={timeFormat}
                                    inputReadOnly={true}
                                    placeholder="Time"
                                    size="large"
                                    defaultValue={moment(time, timeFormat)}
                                    className={classes.timePicker}
                                    onChange={(value: any, timeString: string) => setTime(timeString)}
                        />

                        <CustomButton width="81px"
                                      height="40px"
                                      padding="0"
                                      htmlType="button"
                                      className={classes.buttonTitle}
                                      onClick={onSearch}
                        >
                            SEARCH
                        </CustomButton>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SearchBlock;
