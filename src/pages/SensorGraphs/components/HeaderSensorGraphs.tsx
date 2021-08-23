import React from "react"
import {Typography} from "antd"
import SettingPopup from "../../../components/Setting"
import {Link} from "react-router-dom"

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

import classes from "../SensorGraphs.module.scss"

const {Title} = Typography

const HeaderSensorGraphs: React.FC = () => {
    const {device, site} = useCurrentSelection()

    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5} className="header-link">
                    <Link to="/sites"> {site?.title || 'Site'} / </Link>
                    <Link to="/devices">{device?.title || 'Device'}</Link>
                </Title>
            </div>

            <div className="d-flex-100">
                <div className={classes.headerTitle}>
                    <Title className="title-fs-24" level={2}>{device?.title || 'Device'} - Live Graphs</Title>
                </div>

                <SettingPopup/>
            </div>
        </React.Fragment>
    )
}

export default HeaderSensorGraphs
