import React from "react";
import {Button, Dropdown, Menu} from "antd";
import clsx from "clsx";

import HazardMon from "../../assets/img/HazardMon.svg";

import classes from "./LandingHeader.module.scss";
import {DownOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


interface HeaderProps {
    isRegister: boolean
    onLogin: (isRegister: boolean) => void
}


const LandingHeader: React.FC<HeaderProps> = ({isRegister, onLogin}) => {

    const handleLogin = () => {
        onLogin(true);
    };


    const menu = (
        <Menu key={"feedback"}>
            <Menu.Item>
                <Link to="/feedback">
                    Send Feedback
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={clsx("d-flex", classes.wrap)}>

            <div className={classes.logo}>
                <img src={HazardMon} alt="HazardMon"/>
            </div>

            <div className={classes.connect}>
                <div className={classes.connectWrap}>
                    <div className={classes.contactSelect}>
                        <Dropdown overlay={menu} placement="topRight" arrow>
                            <Button className={classes.select} type={"text"}>Contact Us <DownOutlined/></Button>
                        </Dropdown>
                    </div>

                    {/*<Select defaultValue="Contact Us" bordered={false} className={classes.contactSelect}>*/}
                    {/*    <Option value="Contact Us">Contact Us</Option>*/}
                    {/*    <Option value="Phone">Phone</Option>*/}
                    {/*</Select>*/}

                </div>

                <div>
                    <div className={classes.linkWrap} onClick={handleLogin}>
                        Login
                    </div>
                </div>

            </div>
        </div>
    );
};
export default LandingHeader;
