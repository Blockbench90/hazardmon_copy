import React from "react";
import clsx from "clsx";
import {Button, Dropdown, Menu} from "antd";
import {Link} from "react-router-dom";

import classes from "./LandingFooter.module.scss";
import {DownOutlined} from "@ant-design/icons";


const menu = (
    <Menu key={"feedback"}>
        <Menu.Item >
            <Link to="/feedback">
                Send Feedback
            </Link>
        </Menu.Item>
    </Menu>
);


const LandingFooter: React.FC = () => {
    return (
        <React.Fragment>
            <div className="cssLine"/>

            <div className={clsx("d-flex", classes.footer)}>
                <div className={classes.connectUs}>
                    <Dropdown overlay={menu} placement="topRight" arrow>
                        <Button className={classes.select} type={"text"}>Contact Us <DownOutlined /></Button>
                    </Dropdown>
                </div>

                <div className={classes.copyright}>
                    <span>Copyright ©  2021 HazardMon.com. All rights reserved.</span>
                </div>
            </div>
        </React.Fragment>
    );
};
export default LandingFooter;
