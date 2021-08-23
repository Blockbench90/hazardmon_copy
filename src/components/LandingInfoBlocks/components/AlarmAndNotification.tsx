import React from "react"
import {Typography} from "antd"
import clsx from "clsx"

import alarm from "../../../assets/icons/alarm.svg"
import message from "../../../assets/icons/message.svg"
import group_2 from "../../../assets/img/group_2.png"

import classes from "../LandingInfoBlocks.module.scss"


const {Title, Paragraph} = Typography

interface AlarmAndNotificationProps {
    alarmLogRef: any
}

const AlarmAndNotification: React.FC<AlarmAndNotificationProps> = ({alarmLogRef}) => {
    return (
        <div className={clsx("d-flex", classes.info, classes.reverse)} ref={alarmLogRef}>

            <div className={classes.pageBlock}>
                <img src={group_2} alt="group_1" className={classes.group_2}/>
            </div>

            <div className={clsx(classes.wrap, "pl-20")}>

                <div>
                    <Title className={classes.title}>Alarm and Notifications Log</Title>
                    <Paragraph className={classes.description}>
                        Receive notifications to alert you of sensor alarms or system changes so that you always know
                        what is happening at your plant.
                    </Paragraph>
                </div>

                <div className={clsx("d-flex", classes.infoFlex)}>
                    <div className={classes.infoBlock}>

                        <img src={alarm} alt="alarm" className={classes.infoImg}/>

                        <Paragraph className={classes.infoDescription}>
                            Notifications display Sensor Names, Local Time Zone, In-Alarm Time. All Data are logged.
                        </Paragraph>
                    </div>
                    <div className={classes.infoBlock}>

                        <img src={message} alt="message" className={classes.infoImg}/>

                        <Paragraph className={classes.infoDescription}>
                            Receive e-mail notifications and e-mail notifications contain a link to quickly access your
                            detailed system information.
                        </Paragraph>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AlarmAndNotification
