import React, {useEffect} from "react";
import {Badge} from "antd";
import {Link} from "react-router-dom";

import {ReactComponent as HeaderNotification} from "../../../assets/icons/header_notification.svg";

import classes from "../Header.module.scss";

interface NotifyProps {
    messageCount?: number
    openNotification?: () => void
    wsNotification?: any
}

const Notify: React.FC<NotifyProps> = React.memo(({
                                                      messageCount,
                                                      openNotification,
                                                      wsNotification,
                                                  }) => {

        useEffect(() => {
            wsNotification && openNotification();
        }, [openNotification, wsNotification]);

        return (
            <React.Fragment>
                <Link to="/notifications">
                    <Badge overflowCount={999} count={messageCount}>
                        <HeaderNotification className={classes.headerNotify}/>
                    </Badge>
                </Link>
            </React.Fragment>
        );
    },
);

export default Notify;
