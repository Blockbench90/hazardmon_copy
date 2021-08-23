import React from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

import classes from "../Notifications.module.scss";

const {Title} = Typography;

const HeaderNotifications: React.FC = () => {
    const { client, site } = useCurrentSelection();

    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}>
                    <Link to="/sites">{client?.company || 'Client'} / </Link> {site?.title || 'Site'}
                </Title>
                <Title level={2} className="title-fs-24">{site?.title || 'Site'} - Devices</Title>
            </div>

            <p className={classes.subtitle}>{site?.title || 'Site'}</p>
        </React.Fragment>
    )
}

export default HeaderNotifications
