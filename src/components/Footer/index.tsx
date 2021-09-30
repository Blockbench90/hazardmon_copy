import React from "react";
import clsx from "clsx";
import {Button, Dropdown, Layout, Menu} from "antd";

import classes from "./Footer.module.scss";
import {Link} from "react-router-dom";
import {DownOutlined} from "@ant-design/icons";

const {Footer} = Layout;

const menu = (
    <Menu key={"feedback"}>
        <Menu.Item >
            <Link to="/feedback">
                Send Feedback
            </Link>
        </Menu.Item>
    </Menu>
);


const FooterComponent: React.FC = () => {
    return (
        <React.Fragment>
            <Footer className={clsx("d-flex", classes.footer)}>
                <div>
                    <Dropdown overlay={menu} placement="topRight" arrow>
                        <Button type={"text"}>Contact Us <DownOutlined /></Button>
                    </Dropdown>
                </div>

                <div className={classes.copyright}>
                    <span>Copyright ©  2020 HazardMon.com. All rights reserved.</span>
                </div>
            </Footer>
        </React.Fragment>
    );
};
export default FooterComponent;
