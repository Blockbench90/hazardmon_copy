import React from "react";
import {Alert} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {LoadingStatus} from "../../store/types";
import {userAC} from "../../store/branches/user/actionCreators";
import {selectUserState} from "../../store/selectors";
import {WinStorage} from "../../services/AuthSrorage";

import classes from "./Alert.module.scss";

const LoginAlert = () => {
    const {status} = useSelector(selectUserState);
    const dispatch = useDispatch();
    const errorMessage = WinStorage.getErrorMessage();

    const setTimer = () => {
        setTimeout(() => {
            dispatch(userAC.setUserLoadingStatus(LoadingStatus.NEVER));
            WinStorage.removeErrorMessage();
        }, 5000);
    };

    if (status === LoadingStatus.ERROR) {
        setTimer();

        return (
            <Alert
                message={errorMessage || "Wrong email or password"}
                type="error"
                showIcon
                closable
                className={classes.alert}
            />
        );
    }

    return null;
};
export default LoginAlert;
