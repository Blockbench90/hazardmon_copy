import React from "react"
import {Select} from "antd"
import clsx from "clsx"

import HazardMon from "../../assets/img/HazardMon.svg"

import classes from "./LandingHeader.module.scss"

const {Option} = Select

interface HeaderProps {
    isRegister: boolean
    onLogin: (isRegister: boolean) => void
}

const LandingHeader: React.FC<HeaderProps> = ({isRegister, onLogin}) => {

    const handleLogin = () => {
        onLogin(true)
    }

    return (
        <div className={clsx("d-flex", classes.wrap)}>

            <div className={classes.logo}>
                <img src={HazardMon} alt="HazardMon"/>
            </div>

            <div className={classes.connect}>
                <div className={classes.connectWrap}>

                    <Select defaultValue="Contact Us" bordered={false} className={classes.contactSelect}>
                        <Option value="Contact Us">Contact Us</Option>
                        <Option value="Phone">Phone</Option>
                    </Select>

                </div>

                <div>
                    <div className={classes.linkWrap} onClick={handleLogin}>
                        Login
                    </div>
                </div>

            </div>
        </div>
    )
}
export default LandingHeader
