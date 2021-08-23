import React from "react"
import clsx from "clsx"

import arrowDown from "../../assets/icons/arrowDown.svg"
import InfoItem from "../InfoItem";

import classes from "./InfoBlock.module.scss"


interface InfoBlockProps {
    realTimeRef: any
    dataTrendingRef: any
    alarmLogRef: any
}

const InfoBlock: React.FC<InfoBlockProps> = ({realTimeRef, dataTrendingRef, alarmLogRef}) => {

    const scrollToDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        })
    }

    return (
        <div className="d-flex-col">
            <div className={clsx("d-flex", classes.wrapInfo)}>
                <div>
                    <InfoItem title={"Real-Time Data Access"} refProps={realTimeRef}/>
                    <InfoItem title={"Data Trending"} refProps={dataTrendingRef}/>
                    <InfoItem title={"Alarm and Notifications Log"} refProps={alarmLogRef}/>
                </div>
                <div>
                    <InfoItem title={"E-mail Notifications"} refProps={alarmLogRef}/>
                    <InfoItem title={"Full Data Analytics"} refProps={dataTrendingRef}/>
                    <InfoItem title={"Low Cost"} refProps={realTimeRef}/>
                </div>
            </div>

            <div className={classes.moreInfo} onClick={scrollToDown}>
                <p><span>Learn more</span><img src={arrowDown} alt="arrowDown"/></p>
            </div>
        </div>
    )
}
export default InfoBlock
