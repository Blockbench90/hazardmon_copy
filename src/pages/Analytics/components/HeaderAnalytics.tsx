import React from "react"
import {Typography} from "antd"
import {Link} from "react-router-dom"
import {useCurrentSelection} from "../../../hooks/useCurrentSelection"

import classes from "../../SensorDashboard/SensorDashboard.module.scss"

const {Title} = Typography;

const HeaderAnalytics: React.FC = () => {

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
            </div>
        </React.Fragment>
    );
};

export default HeaderAnalytics
