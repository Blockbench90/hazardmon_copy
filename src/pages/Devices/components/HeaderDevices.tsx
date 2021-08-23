import React from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";

import classes from "../Devices.module.scss";
import { useCurrentSelection } from "../../../hooks/useCurrentSelection";

const {Title} = Typography;

const HeaderClients: React.FC = () => {
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

export default HeaderClients
