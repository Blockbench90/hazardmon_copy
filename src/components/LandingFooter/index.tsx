import React from "react";
import clsx from "clsx";
import {Select} from "antd";

import classes from "./LandingFooter.module.scss";

const {Option} = Select;

const LandingFooter: React.FC= () => {
    return (
        <React.Fragment>
            <div className="cssLine"/>

            <div className={clsx("d-flex", classes.footer)}>
                <div className={classes.connectUs}>
                    <Select defaultValue="Contact Us" bordered={false} className={classes.select}>
                        <Option value="Contact Us">Contact Us</Option>
                        <Option value="Phone">Phone</Option>
                    </Select>
                </div>

                <div className={classes.copyright}>
                    <span>Copyright ©  2021 HazardMon.com. All rights reserved.</span>
                </div>
            </div>
        </React.Fragment>
    );
};
export default LandingFooter;
