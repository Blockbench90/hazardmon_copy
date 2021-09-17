import React, {useRef, useState} from "react";
import clsx from "clsx";
import {BackTop} from "antd";

import LandingTitle from "../../components/LandingTitle";
import RealTime from "../../components/LandingInfoBlocks/components/RealTime";
import AlarmAndNotification from "../../components/LandingInfoBlocks/components/AlarmAndNotification";
import DataTrending from "../../components/LandingInfoBlocks/components/DataTrending";

import arrowUp from "../../assets/icons/arrowUp.svg"

import LandingHeader from "../../components/LandingHeader";
import InfoBlock from "../../components/InfoBlock";
import LandingFooterBlock from "../../components/LandingFooterBlock";
import LandingFooter from "../../components/LandingFooter";
import AuthBlock from "../../components/AuthBlock";
import LoginAlert from "../../components/Alerts/registration";
import RegistrationAlert from "../../components/Alerts/registration"

import classes from "./LandingPage.module.scss"


export const LandingPage: React.FC = () => {
    const [isRegister, setIsRegister] = useState<boolean>(false)

    const realTimeRef = useRef(null)
    const dataTrendingRef = useRef(null)
    const alarmLogRef = useRef(null)


    return (
        <div>
            <div className={classes.headerBlock}>

                <LandingHeader onLogin={setIsRegister} isRegister={isRegister}/>

                <div className="container">
                    <LoginAlert/>
                    <RegistrationAlert/>
                    <div className={clsx("d-flex", classes.auth)}>


                        <div className={clsx("df-col", classes.info)}>
                            <LandingTitle/>
                            <InfoBlock realTimeRef={realTimeRef}
                                       dataTrendingRef={dataTrendingRef}
                                       alarmLogRef={alarmLogRef}
                            />
                        </div>

                        <div>
                            <AuthBlock isRegister={isRegister}
                                       onRegister={setIsRegister}
                            />
                        </div>
                    </div>
                </div>

                <BackTop className={classes.backTop}>
                    <img src={arrowUp} alt="arrowUp"/>
                </BackTop>
            </div>

            <div>
                <div className="container">
                    <div className={classes.content}>
                        <RealTime realTimeRef={realTimeRef}/>
                        <AlarmAndNotification alarmLogRef={alarmLogRef}/>
                        <DataTrending dataTrendingRef={dataTrendingRef}/>

                        <LandingFooterBlock/>
                    </div>
                </div>

                <LandingFooter/>

            </div>
        </div>
    )
}
