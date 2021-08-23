import React from "react";
import clsx from "clsx";
import {Typography} from "antd";
import {Link} from "react-router-dom";

import { useCurrentSelection } from "../../../hooks/useCurrentSelection";

import classes from "../EditWarnings.module.scss"

const {Title} = Typography;

const HeaderAddWarnings: React.FC = () => {
    const { device, site } = useCurrentSelection();

    return (
        <React.Fragment>
            <div className={clsx(classes.warningsWrap, "block-title")}>
                <Title level={5}>
                    <Link to="/sites">{site?.title || 'Sites'} / </Link>
                    <Link to="/devices">{device?.title || 'Device'} / </Link>
                    <Link to="/dashboard">Sensor Dashboard: {device?.title || 'Device'}</Link>
                </Title>
            </div>

        </React.Fragment>
    )
}

export default HeaderAddWarnings
