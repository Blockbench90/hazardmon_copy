import React from "react"
import {Typography} from "antd"
import clsx from "clsx"

import pc from "../../../assets/icons/accessed_on_PC.svg"
import auto from "../../../assets/icons/24_7.svg"
import group_1 from "../../../assets/img/group_1.png"

import classes from "../LandingInfoBlocks.module.scss"


const {Title, Paragraph} = Typography

interface RealTimeProps {
    realTimeRef: any
}

const RealTime: React.FC<RealTimeProps> = ({realTimeRef}) => {

    return (
        <div className={clsx("d-flex", classes.info)} ref={realTimeRef}>
            <div className={clsx(classes.wrap, "pr-20")}>

                <div>
                    <Title className={classes.title}>Real-time Hazard Monitoring Access</Title>
                    <Paragraph className={classes.description}>
                        With hazardmon.com you can now access your 4B Hazard Monitoring system and see real-time updates
                        of your bearing temperature, belt alignment, and belt speeds.
                        Hazardmon.com is hosted in the cloud, so there is no expensive hardware or programming required
                        on site.
                    </Paragraph>
                </div>

                <div className={clsx("d-flex", classes.infoFlex)}>

                    <div className={classes.infoBlock}>
                        <img src={pc} alt="PC" className={classes.infoImg}/>

                        <Paragraph className={classes.infoDescription}>
                            It is easily accessed via a web browser on your PC, laptop, smartphone, or tablet with no
                            additional VPN software required.
                        </Paragraph>
                    </div>

                    <div className={classes.infoBlock}>
                        <img src={auto} alt="auto" className={classes.infoImg}/>

                        <Paragraph className={classes.infoDescription}>
                            The data is collected automatically and can be accessed 24/7 from anywhere.
                        </Paragraph>
                    </div>

                </div>
            </div>

            <div className={classes.pageBlock}>
                <img src={group_1} alt="group_1"/>
            </div>

        </div>
    )
}
export default RealTime
