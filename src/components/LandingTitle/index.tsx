import React from "react"
import {Typography} from "antd"

import classes from "./LandingTitle.module.scss"

const {Title} = Typography

const LandingTitle: React.FC = () => {
    return (
        <div className={classes.wrap}>
            <Title level={2} className={classes.title}>Connect Your Sites Together</Title>
            <Title level={2} className={classes.subTitle}>World-wide Connectivity</Title>
        </div>
    )
}
export default LandingTitle
