import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import clsx from "clsx";
import {notification} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

import {userAC} from "../../../store/branches/user/actionCreators";
import Notify from "./Notify";
import {WsNotification} from "../../../store/branches/user/stateTypes";

import classes from "../Header.module.scss";

interface NotificationsProps {
    messageCount?: number
    message?: any
    wsNotification?: WsNotification
}

const HeaderNotifications: React.FC<NotificationsProps> = ({
                                                               messageCount,
                                                               message,
                                                               wsNotification,
                                                           }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onRedirect = useCallback(() => {
        history.push("/dashboard");
    }, [history]);

    const get_color = useCallback(() => {
        if (message) {
            if (["alarm detected", "alarm changed"].includes(message.event_type.toLowerCase())) {
                return "red";
            }
            if (["alarm cleared", "warning cleared", "device online", "parse_error_off", "site_administration"].includes(message.event_type.toLowerCase())) {
                return "green";
            }
            if (["power up", "warning detected", "test", "device offline", "node_structure_changes", "parse_error_on"].includes(message.event_type.toLowerCase())) {
                return "amber";
            }
        }
        return "blue";
    }, [message]);

    const openNotification = () => {
        notification.info({
            duration: 4,
            placement: "bottomRight",
            icon: <InfoCircleOutlined/>,
            className: clsx(classes.headerNotification, wsNotification ? wsNotification?.color : get_color()),
            message: (
                wsNotification
                &&
                <div onClick={onRedirect}>
                    <span>
                        {wsNotification?.notification_time} - {wsNotification?.device} - {wsNotification?.event_type}
                    </span>
                    <br/>
                    {wsNotification?.sensor_name} {wsNotification?.content}
                </div>
            ),
        });
    };


    useEffect(() => {
        dispatch(userAC.toggleWsNotifications({isOpen: true, path: "ws/current-user-notifications/"}));

        return () => {
            dispatch(userAC.toggleWsNotifications({isOpen: false}));
        };
    }, [dispatch]);

    return (
        <Notify
            openNotification={openNotification}
            messageCount={messageCount}
            wsNotification={wsNotification}
        />
    );
};
export default HeaderNotifications;
