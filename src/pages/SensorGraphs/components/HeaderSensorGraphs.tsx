import React from "react";
import {Typography} from "antd";
import SettingPopup from "../../../components/Setting";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";

import {graphsAC} from "../../../store/branches/graphs/actionCreators";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {GraphsDate} from "../../../store/branches/graphs/stateTypes";
import {useDispatch} from "react-redux";

import classes from "../SensorGraphs.module.scss";

const {Title} = Typography;

const HeaderSensorGraphs: React.FC = () => {
    const {device, site} = useCurrentSelection();
    const dispatch = useDispatch();
    const history = useHistory();
    const {pathname} = useLocation()
    const {id} = useParams<any>();

    const allGraphsUrl = pathname.split("/").slice(0, -1).join("/")

    const onShowAllGraphs = () => {
        device && dispatch(graphsAC.fetchGraphsData({device_id: +device?.id, timescale: GraphsDate.day}));
        if(id){
            history.push(allGraphsUrl)
            return
        }
        history.push("/graphs");
    };

    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5} className="header-link">
                    <Link to="/sites"> {site?.title || "Site"} / </Link>
                    <Link to="/devices">{device?.title || "Device"}</Link>
                </Title>
            </div>

            <div className="d-flex-100">
                <div className={classes.headerTitle}>
                    <Title className="title-fs-24" level={2}>{device?.title || "Device"} - Live Graphs</Title>
                </div>

                <div className={"d-flex"}>
                    {
                        id
                        &&
                        <div onClick={onShowAllGraphs}>
                            <span className={classes.showAllGraphs}>Show All Graphs</span>
                        </div>
                    }

                    <SettingPopup/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default HeaderSensorGraphs;
