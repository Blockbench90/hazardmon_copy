import React from "react"
import {Typography} from "antd"

import classes from "./LandingFooterBlock.module.scss"


const {Title, Paragraph} = Typography

const LandingFooterBlock: React.FC = () => {
    return (
        <div className={classes.wrap}>
            <div className={classes.content}>

                <Title className={classes.title}>
                    The latest hazard monitors
                </Title>

                <Paragraph className={classes.description}>
                    including Bearing Temperature, Belt Alignment and Speed.
                </Paragraph>

                <a href="https://www.go4b.com/usa/products/hazard-monitoring-systems/default.asp" target="_blank" rel="noreferrer">
                    <div className={classes.button}>
                        VIEW ALL
                    </div>
                </a>

            </div>
        </div>
    )
}
export default LandingFooterBlock
