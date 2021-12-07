import React from "react";
import {Typography} from "antd";
import {Link, Route} from "react-router-dom";

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

import classes from "../VisualDashboard.module.scss";
import urls from "../../../constants/urls";

const {Title} = Typography;

const HeaderVisualDashboard: React.FC = () => {
    const {site} = useCurrentSelection();
    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}> <Link to="/sites">{site?.title} / </Link> VISUAL DASHBOARD</Title>
            </div>
            <Route path={urls.schemasList}>
                <p className={classes.subtitle}>Schemas list</p>
            </Route>
        </React.Fragment>
    );
};

export default HeaderVisualDashboard;
