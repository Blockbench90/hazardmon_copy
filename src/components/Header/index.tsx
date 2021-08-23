import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, useHistory} from "react-router-dom";
import clsx from "clsx";
import {Layout} from "antd";

import {ReactComponent as EmailAlerts} from "../../assets/icons/email_alerts.svg";

import TabsSensorDashboard from "../TabsSensorDashboard";
import TabsSensorGraphs from "../TabsSensorGraphs";
import TabsNotifications from "../TabsNotifications";

import HeaderNotifications from "./components/HeaderNotifications";
import {userAC} from "../../store/branches/user/actionCreators";
import {Notification, WsNotification} from "../../store/branches/user/stateTypes";
import {selectUserState} from "../../store/selectors";

import classes from "./Header.module.scss";

interface HeaderProps {
    className?: string;
}

const {Header} = Layout;

const HeaderComponent: React.FC<HeaderProps> = ({className}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {ws_notify: {notifications}, headerNotifications: requestNotifications} = useSelector(selectUserState);

    useEffect(() => {
        dispatch(userAC.fetchHeaderNotifications({limit: 1, offset: 0, is_active: true, ordering: "-date_created"}));
    }, [dispatch]);

    const [message, setMessage] = useState<Notification | null>(null);
    const [wsNotification, setNotification] = useState<WsNotification | null>(null);

    const handleAlerts = () => {
        history.push("/user/setting/notification");
    };

    useEffect(() => {
        if (notifications.length > 0) {
            setNotification(notifications[0]);
            return;
        }
        if (requestNotifications?.results?.length > 0) {
            setMessage(requestNotifications?.results[0]);
        }
    }, [requestNotifications, notifications]);

    return (
        <React.Fragment>
            <Header className={clsx(className, "site-layout-background", classes.header)}>
                <div className={classes.wrap}>
                    <div className={classes.container}>
                        <Route path="/dashboard" exac>
                            <TabsSensorDashboard/>
                        </Route>
                        <Route path="/graphs" exac>
                            <TabsSensorGraphs/>
                        </Route>
                        <Route path="/notifications" exac>
                            <TabsNotifications/>
                        </Route>
                        <Route path={["/user/setting", "/user/setting/notification"]}>
                            <div className={classes.emailAlerts} onClick={handleAlerts}>
                                <div/>
                                <div>
                                    <EmailAlerts/>
                                </div>
                            </div>
                        </Route>

                    </div>

                    <HeaderNotifications messageCount={requestNotifications && requestNotifications?.count}
                                         message={message}
                                         wsNotification={wsNotification}
                    />

                </div>
            </Header>
        </React.Fragment>
    );
};
export default HeaderComponent;
