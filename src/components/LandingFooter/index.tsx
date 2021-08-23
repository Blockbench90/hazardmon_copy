import React from "react"
import clsx from "clsx"
import {Select} from "antd"

import classes from "./LandingFooter.module.scss"

const {Option} = Select

interface LandingFooterProps {
    isRegister: boolean
}

const LandingFooter: React.FC<LandingFooterProps> = ({isRegister}) => {
    return (
        <React.Fragment>
            <div className="cssLine"/>

            <div className={clsx("d-flex", classes.footer)}>
                <div className={classes.connectUs}>
                    {
                        isRegister
                            ?

                            <Select defaultValue="Contact Us" bordered={false} className={classes.select}>
                                <Option value="Contact Us">Contact Us</Option>
                                <Option value="Phone">Phone</Option>
                            </Select>
                            :
                            <div className={clsx("d-fl", "mar-top-10")} >
                                <div className="mar-right-10">Home</div>
                                <div className="mar-right-10">About Us</div>
                                <div className="mar-right-10">Go4b.Com</div>
                            </div>
                    }
                </div>

                <div className={classes.copyright}>
                    <span>Copyright ©  2021 HazardMon.com. All rights reserved.</span>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LandingFooter
