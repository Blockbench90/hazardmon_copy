import React from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";

import classes from "../VisualDashboard.module.scss"

const {Title} = Typography;

const HeaderVisualDashboard: React.FC = () => {
    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}> <Link to="/sites">4B COMPONENTS / </Link> VISUAL DASHBOARD</Title>
                <Title level={2} className="title-fs-24">4B Components - Visual Dashboard</Title>
            </div>

            <p className={classes.subtitle}>Schemas list</p>
        </React.Fragment>
    )
}

export default HeaderVisualDashboard
