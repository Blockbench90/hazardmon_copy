import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {DatePicker, TimePicker} from "antd";

import {sensorsAC} from "../../../store/branches/sensors/actionCreators";
import {CustomButton} from "../../Button";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../../store/status";

import classes from "../Historical.module.scss";
import {WinStorage} from "../../../services/AuthSrorage";
import moment from "moment";

interface SearchProps {
    limit: number
    offset: number
    setCurrentTime: ({date, time}: { date: string, time: string }) => void
    setPagination: ({page, pageSize}: { page: number, pageSize: number }) => void
}

const SearchBlock: React.FC<SearchProps> = ({limit, offset, setCurrentTime, setPagination}) => {
    const dispatch = useDispatch();
    const [date, setDate] = useState<string>();
    const [time, setTime] = useState<string>();
    const {device} = useCurrentSelection();

    const dateFormatList = ["YYYY-MM-DD"];
    const format = "HH:mm";

    const initTime = WinStorage.getLocalTime();

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
    useEffect(() => {
        if (initTime) {
            setTime(initTime.time);
            setDate(initTime.date);
        }
    }, [initTime]);

    return (
        <React.Fragment>
            <div className={classes.headerWrap}>
                <div className={classes.headerTitle}>
                    <div className={classes.modalButton}>
                        <DatePicker
                            size="large"
                            className={classes.datePicker}
                            placeholder="Data"
                            value={moment(initTime.date, dateFormatList)}
                            // defaultValue={moment(initTime.date, dateFormatList)}
                            inputReadOnly={true}
                            onChange={(date: any, dateString: string) => setDate(dateString)}
                            format={dateFormatList}
                        />

                        <TimePicker format={format}
                                    inputReadOnly={true}
                                    placeholder="Time"
                                    size="large"
                                    value={moment(initTime.time, format)}
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
