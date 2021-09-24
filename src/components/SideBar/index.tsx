import React from "react";
import clsx from "clsx";
import {LeftCircleFilled, RightCircleFilled} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import short_logo from "../../assets/img/short_logo.svg";
import logo from "../../assets/img/HazardMon.svg";

import {ReactComponent as Clients} from "../../assets/icons/clients.svg";
import {ReactComponent as Sites} from "../../assets/icons/sites.svg";
import {ReactComponent as Devices} from "../../assets/icons/devices.svg";
import {ReactComponent as Sensor} from "../../assets/icons/sensor.svg";
import {ReactComponent as Graphs} from "../../assets/icons/sensorGraphs.svg";
import {ReactComponent as Notifications} from "../../assets/icons/notification.svg";
import {ReactComponent as Analytics} from "../../assets/icons/analytics.svg";
import {ReactComponent as Visual} from "../../assets/icons/visual.svg";

import {userAC} from "../../store/branches/user/actionCreators";
import Avatar from "../Avatar";
import {usePermissions} from "../../hooks/usePermissions";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectUserState} from "../../store/selectors";

import classes from "./SideBar.module.scss";

interface SideBarProps {
    collapsed: boolean;
    avatarUrl?: string;
    firstName?: string;
    toggle?: () => void;
    isTablet: boolean;
}

const {Sider} = Layout;
const {SubMenu} = Menu;

const SideBarComponent: React.FC<SideBarProps> = ({
                                                      toggle,
                                                      collapsed,
                                                      isTablet,
                                                  }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const {userData} = useSelector(selectUserState);

    const {isSuperUser, isOEM, isVisualDashboard} = usePermissions();
    const {device} = useCurrentSelection();

    const DEVICE_TYPE = ["F500", "0300", "F500-UDF"];
    const isCorrectDevice = DEVICE_TYPE.includes(device?.device_type);
    const userName = (userData?.first_name || userData?.last_name) ? (`${userData?.first_name} ${userData?.last_name}`) : "Profile";

    const splitLocation = location.pathname.split("/")
    const isUserSetting = splitLocation.includes("user") && splitLocation.includes("setting")
    console.log("user =>", isUserSetting);

    const onLogout = () => {
        dispatch(userAC.logOut());
    };

    const onSettingUser = () => {
        history.push("/user/setting");
    };

    const customSelectedKeys = () => {
        if (location.pathname === "/") {
            return "clients";
        }
        return location.pathname.split("/")[1];
    };


    return (
        <div className={classes.sidebar}>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="xxl"
                   className={clsx(isTablet && classes.tablet)}>

                <div className={classes.logo}>
                    <img src={collapsed ? short_logo : logo} alt="logo"/>
                </div>
                <div>
                    {React.createElement(collapsed ? RightCircleFilled : LeftCircleFilled,
                        {
                            className: classes.trigger,
                            onClick: toggle,
                        })}
                </div>
                <div className={classes.avatar}>
                    <Avatar/>
                </div>

                <Menu theme="dark"
                      mode="vertical"
                      defaultSelectedKeys={["/", "/clients"]}
                      selectedKeys={[customSelectedKeys()]}
                >
                    <SubMenu key="sub1"
                             title={<span className={clsx(isUserSetting && classes.userSetting)}>{userName}</span>}
                             className={clsx(classes.profileInfo, classes.cssBaseLine)}>
                        <Menu.Item key="7"
                                   onClick={onSettingUser}
                                   className={clsx(collapsed ? classes.smallSubmenu : classes.profileInfoColumn)}>
                            Setting
                        </Menu.Item>
                        <Menu.Item key="8"
                                   onClick={onLogout}
                                   className={clsx(collapsed ? classes.smallSubmenu : classes.profileInfoColumn)}>
                            Logout
                        </Menu.Item>
                    </SubMenu>

                    {
                        (isSuperUser || isOEM) && (
                            <Menu.Item key={"clients"} icon={<Clients/>}>
                                <Link to="/clients">
                                    <span className={classes.sideTitle}>
                                        Clients
                                    </span>
                                </Link>
                            </Menu.Item>
                        )
                    }

                    <Menu.Item key="sites" icon={<Sites/>}>
                        <Link to="/sites">
                            <span className={classes.sideTitle}>
                                Sites
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="devices" icon={<Devices/>}>
                        <Link to="/devices">
                            <span className={classes.sideTitle}>
                                Devices
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="dashboard" icon={<Sensor/>}>
                        <Link to="/dashboard">
                            <span className={classes.sideTitle}>
                                Sensor Dashboard
                            </span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="graphs" icon={<Graphs/>}>
                        <Link to="/graphs">
                            <span className={classes.sideTitle}>
                                Sensor Graphs
                            </span>
                        </Link>
                    </Menu.Item>
                    <div className={classes.lineBottom}/>

                    <Menu.Item key="notifications" icon={<Notifications/>}>
                        <Link to="/notifications">
                            <span className={classes.sideTitle}>
                                Notifications
                            </span>
                        </Link>
                    </Menu.Item>

                    {
                        (isSuperUser || isOEM) && isCorrectDevice &&
                        <Menu.Item key="analytics"
                                   icon={<Analytics/>}
                                   className={classes.hoverNone}>
                            <Link to="/analytics">
                                Analytics
                            </Link>
                        </Menu.Item>
                    }

                    {
                        isVisualDashboard
                        &&
                        <Menu.Item key="visual-dashboard" icon={<Visual/>}
                                   className={clsx(classes.visual,
                                       collapsed ? classes.sizeVisualSmall : classes.sizeVisualBig)}>
                            <Link to="/visual-dashboard/site/4/schemas">
                                Visual Dashboard
                            </Link>
                        </Menu.Item>
                    }

                    {
                        !collapsed
                        &&
                        <Menu.Item key="set1" className={clsx(classes.setting, classes.modify)}>
                            Modify homepage
                        </Menu.Item>

                    }

                    {
                        !collapsed
                        &&
                        <Menu.Item key="set2" className={clsx(classes.setting, classes.settingLink)}>
                            Settings
                        </Menu.Item>
                    }

                </Menu>
            </Sider>
        </div>
    );
};
export default SideBarComponent;
