import React from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import SettingPopup from "../../../components/Setting";

import classes from "../SensorDashboard.module.scss";

const {Title} = Typography;

const HeaderSection: React.FC = () => {

    const {client, site, device} = useCurrentSelection();

    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}>
                    <Link to="/sites">{client?.company || "Client"} / </Link>
                    <Link to="/devices">{site?.title || "Sites"} </Link>
                </Title>
            </div>

            <div className="d-flex-100">
                <div className={classes.headerTitle}>
                    <p className={classes.subtitle}>{device?.title || "Device"}</p>
                </div>

                <SettingPopup/>
            </div>
        </React.Fragment>
    );
};

export default HeaderSection;
