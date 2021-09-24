import React, {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import clsx from "clsx";
import {notification} from "antd";

import {userAC} from "../../../store/branches/user/actionCreators";
import Notify from "./Notify";
import {WsNotification} from "../../../store/branches/user/stateTypes";
import {CloseOutlined} from "@ant-design/icons";
import {devicesAC} from "../../../store/branches/devices/actionCreators";


interface NotificationsProps {
    messageCount?: number
    wsNotification?: WsNotification
}

const HeaderNotifications: React.FC<NotificationsProps> = ({
                                                               messageCount,
                                                               wsNotification,
                                                           }) => {
    const dispatch = useDispatch();

    const onRedirect = useCallback(() => {
        dispatch(devicesAC.notificationSelect({
            locationId: wsNotification.location_pk,
            deviceId: wsNotification.device_pk,
        }));
    }, [wsNotification, dispatch]);

    const openNotification = useCallback(() => {
        notification.open({
            duration: 4,
            placement: "bottomRight",
            closeIcon: <CloseOutlined style={{color: "white", fontSize: "16px", fontWeight: 700}}/>,
            className: clsx(wsNotification?.color),
            message: (
                wsNotification
                &&
                <div onClick={onRedirect} className={clsx(wsNotification?.color)}>
                    <span>
                        {wsNotification?.notification_time} - {wsNotification?.device} - {wsNotification?.event_type}
                    </span>
                    <br/>
                    {wsNotification?.sensor_name} {wsNotification?.content}
                </div>
            ),
        });
    }, [wsNotification, onRedirect]);


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
