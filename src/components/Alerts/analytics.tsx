import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {analyticsAC} from "../../store/branches/analytics/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectAnalyticsState} from "../../store/selectors";

import classes from "./Alert.module.scss";

const AnalyticsAlert = () => {
    const {status_operation} = useSelector(selectAnalyticsState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(analyticsAC.setStatusOperationAnalytics(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage();
        }, 5000);
    };

    if (status_operation === LoadingStatus.FETCH_ANALYTICS_ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "An error occured, please try again!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }


    if (status_operation === LoadingStatus.FETCH_ANALYTICS_WITHOUT_DEVICE) {
        setTimer();

        return (
            <Alert
                message="Please select device before!"
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }


    return null;
};
export default AnalyticsAlert;
