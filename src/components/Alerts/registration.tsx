import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "antd";

import {LoadingStatus} from "../../store/types";
import {userAC} from "../../store/branches/user/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {selectUserState} from "../../store/selectors";

import classes from "./Alert.module.scss";

const RegistrationAlert = () => {
    const {registerStatus} = useSelector(selectUserState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(userAC.setUserRegisterStatus(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage();
        }, 5000);
    };

    if (registerStatus === LoadingStatus.SUCCESS) {
        setTimer();

        return (
            <Alert
                message="Registered successfully"
                type="success"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    if (registerStatus === LoadingStatus.WARNING) {
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

    if (registerStatus === LoadingStatus.ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "Registration error"}
                description="The email address is already registered or problems with network."
                type="error"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    return null;
};
export default RegistrationAlert;
