import React from "react";
import {Spin} from "antd";

import classes from "../Preloader/Preloader.module.scss";

const Spinner: React.FC = () => {
    return (
        <div className={classes.root}>
            <Spin tip="Loading..." size="large"/>
        </div>
    );
};
export default Spinner;
