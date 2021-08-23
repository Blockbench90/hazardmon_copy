import React from "react"
import clsx from "clsx"
import {Layout, Select} from "antd"

import classes from "./Footer.module.scss"

const {Footer} = Layout
const {Option} = Select

const FooterComponent: React.FC = () => {

    return (
        <React.Fragment>
            <Footer className={clsx("d-flex", classes.footer)}>
                <div>
                    <Select defaultValue="Contact Us" bordered={false}>
                        <Option value="Contact Us">Contact Us</Option>
                        <Option value="Phone">Phone</Option>
                        <Option value="Site">Site</Option>
                        <Option value="Bird">Bird</Option>
                    </Select>
                </div>

                <div className={classes.copyright}>
                    <span>Copyright ©  2020 HazardMon.com. All rights reserved.</span>
                </div>
            </Footer>
        </React.Fragment>
    )
}
export default FooterComponent
