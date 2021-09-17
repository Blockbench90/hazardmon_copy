import React from "react";
import {DatePicker} from "antd";
import {useDispatch} from "react-redux";
import moment from "moment";

import {CustomButton} from "../../../components/Button";
import InputWrap from "../../../components/InputWrap";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../../store/status";
import {getCorrectDate} from "../../../helpers/getDateAnalytics";
import { analyticsAC } from "../../../store/branches/analytics/actionCreators";

import classes from "../Analytics.module.scss";

interface SearchProps {
    onSelectFrom: (date: any, dateString: string) => void
    onSelectTo: (date: any, dateString: string) => void
    from: string
    to: string
}

const SearchBlockAnalytics: React.FC<SearchProps> = ({
                                                         to,
                                                         from,
                                                         onSelectTo,
                                                         onSelectFrom,
                                                     }) => {
    const dispatch = useDispatch();

    const {device} = useCurrentSelection();
    const dateFormatList = ["YYYY-MM-DD"];

    const onSearch = () => {
        if (!device) {
            dispatch(analyticsAC.setStatusOperationAnalytics(LoadingStatus.FETCH_ANALYTICS_WITHOUT_DEVICE));
            return;
        }

        const data = {
            from: getCorrectDate(from),
            to: getCorrectDate(to),
            device_id: device?.id,
        };
        dispatch(analyticsAC.fetchAnalytics(data));
    };

    return (
        <React.Fragment>
            <div className={classes.headerWrap}>

                <InputWrap title="From" className={classes.inputWrap}>
                    <DatePicker
                        size="large"
                        value={moment(from, dateFormatList)}
                        className={classes.datePicker}
                        placeholder="Data"
                        inputReadOnly={true}
                        onChange={onSelectFrom}
                        format={dateFormatList}
                    />
                </InputWrap>


                <InputWrap title="To" className={classes.inputWrap}>
                    <DatePicker
                        size="large"
                        className={classes.datePicker}
                        value={moment(to, dateFormatList)}
                        placeholder="Data"
                        inputReadOnly={true}
                        onChange={onSelectTo}
                        format={dateFormatList}
                    />
                </InputWrap>

                <CustomButton width="181px"
                              height="40px"
                              padding="0"
                              htmlType="button"
                    disabled={!from || !to || !device?.id}
                              onClick={onSearch}
                >
                    GENERATE REPORT
                </CustomButton>
            </div>
        </React.Fragment>
    );
};

export default SearchBlockAnalytics;
