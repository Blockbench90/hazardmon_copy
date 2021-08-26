import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {userAC} from "../../store/branches/user/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectUserState} from "../../store/selectors";

import classes from "./Alert.module.scss";

const UserAlert = () => {
    const {status} = useSelector(selectUserState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();


    const setTimer = () => {
        setTimeout(() => {
            dispatch(userAC.setUserLoadingStatus(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage();
        }, 5000);
    };

    if (status === LoadingStatus.ADD_USER_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="User added successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status === LoadingStatus.ADD_USER_ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "The email address is already registered."}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status === LoadingStatus.UPDATED_USER_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="User update successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status === LoadingStatus.UPDATED_USER_PASSWORD_SUCCESS) {
        setTimer();

        return (
            <Alert
                message="New password has been saved"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (status === LoadingStatus.UPDATED_USER_ERROR) {
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

    if (status === LoadingStatus.ADD_EMAIL_NOTIFICATION_WITHOUT_DEVICE_ERROR) {
        setTimer();

        return (
            <Alert
                message={"Please select All Devices or select one of devices!"}
                type="warning"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }


    return null;
};
export default UserAlert;
