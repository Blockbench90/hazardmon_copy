import React, {useCallback} from "react";
import {Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {ReactComponent as Active} from "../../assets/icons/devices_active.svg";
import {ReactComponent as Historical} from "../../assets/icons/devices_historical.svg";

import {userAC} from "../../store/branches/user/actionCreators";
import {selectUserState} from "../../store/selectors";

import classes from "../TabsSensorDashboard/TabsSensorDashboard.module.scss";

const {TabPane} = Tabs;

const TabsNotifications: React.FC = () => {
    const {notificationsFilter: {isActive}} = useSelector(selectUserState);
    const dispatch = useDispatch();

    const onChangeTab = useCallback((value) => {
        dispatch(userAC.setNotificationsFilter(value === "active"));
    }, [dispatch]);

    return (
        <div className={classes.wrap}>
            <div className="d-flex">
                <div>
                    <Tabs activeKey={isActive ? "active" : "historical"}
                          className={classes.tabs}
                          style={{paddingTop: "10px"}}
                          centered
                          onChange={onChangeTab}>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div>
                                         <Active/>
                                         <span className={classes.title}>Active</span>
                                     </div>
                                 }
                                 key="active"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div>
                                         <Historical/>
                                         <span className={classes.title}>Historical</span>
                                     </div>
                                 }
                                 key="historical"/>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
export default TabsNotifications;
