import React from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

import classes from "../VisualDashboard.module.scss"

const {Title} = Typography;

const HeaderVisualDashboard: React.FC = () => {
    const { site } = useCurrentSelection()
    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}> <Link to="/sites">{site?.title} / </Link> VISUAL DASHBOARD</Title>
                <Title level={2} className="title-fs-24">{site?.title} - Visual Dashboard</Title>
            </div>

            <p className={classes.subtitle}>Schemas list</p>
        </React.Fragment>
    )
}

export default HeaderVisualDashboard
