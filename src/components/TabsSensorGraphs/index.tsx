import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {ReactComponent as Live} from "../../assets/icons/graphs_live.svg";
import {ReactComponent as HR} from "../../assets/icons/HR.svg";
import {ReactComponent as Day} from "../../assets/icons/Day.svg";
import {ReactComponent as Custom} from "../../assets/icons/custom.svg";

import {LoadingStatus} from "../../store/status";
import {GraphsDate} from "../../store/branches/graphs/stateTypes";
import {SENSOR_GRAPHS} from "../PrivateRoute/components/constants";
import CustomModal from "./CustomModal";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {WinStorage} from "../../services/AuthSrorage";
import {graphsAC} from "../../store/branches/graphs/actionCreators";

import classes from "../TabsSensorDashboard/modal.module.scss";

const {TabPane} = Tabs;

const TabsSensorGraphs: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [active, setActive] = useState<boolean>(true);
    const [modal, setModal] = useState(false);

    const [isLive, setLive] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

    const {device} = useCurrentSelection();

    const handleCustomGraphs = () => {
        setModal(true);
    };

    const onChangeTab = () => {
        setActive(!active);
        history.push("/graphs");
    };

    const onCancelModal = () => {
        setModal(false);
    };

    const onSearchModal = ({date, time}: { date: string, time: string }) => {
        if (!device) {
            dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.FETCH_GRAPHS_TIME_ERROR));
            setModal(false);
            return;
        }
        const payload = {
            date, time, id: device?.id,
        };
        dispatch(graphsAC.fetchCustomGraphsData(payload));
        setModal(false);
        history.push(`/graphs/historical/graphs/${date}&${time}`);
    };

    const onChoiceDate = (date: string) => {
        if (!device) {
            dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.FETCH_GRAPHS_TIME_ERROR));
            return;
        }
        history.push(SENSOR_GRAPHS);
        dispatch(graphsAC.fetchGraphsData({device_id: +device.id, timescale: date}));
        WinStorage.setTimescale(date);
    };

    const onLive = () => {
        console.log("device ===>", device.id, "<=== done");
        setLive(true);
        dispatch(graphsAC.getLiveGraphsData(device.id));
    };

    useEffect(() => {
        if (isLive) {
            if (!device) {
                dispatch(graphsAC.setGraphsStatusOperation(LoadingStatus.WITHOUT_SELECTED_DEVICE_GRAPHS_ERROR));
                return;
            }
            const id: NodeJS.Timeout = setInterval(() => {
                dispatch(graphsAC.updateLiveGraphsData(device.id));
                console.log("tik ===> ", id);
            }, 2000);
            setIntervalId(id);
        }

        return () => {
            clearInterval(intervalId);
            setLive(false)
            console.log("clear interval id ==>", intervalId)
        };
    }, [isLive, device, dispatch, intervalId]);

    return (
        <div className={classes.wrap}>
            <div className="d-flex">
                <div>
                    <CustomModal is_modal={modal}
                                 onCancel={onCancelModal}
                                 onHandleSearch={onSearchModal}
                    />

                    <Tabs defaultActiveKey={(history?.location?.pathname.split("/").includes("historical")) ? "6" : "3"}
                          className={classes.tabs}
                          style={{paddingTop: "7px"}}
                          centered
                          onChange={onChangeTab}>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div className={classes.tabTitleWrap} onClick={onLive}>
                                         <Live/>
                                         <span className={classes.title}>Live</span>
                                     </div>
                                 }
                                 key="1"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div className={classes.tabTitleWrap} onClick={() => onChoiceDate(GraphsDate.hour)}>
                                         <HR/>
                                         <span className={classes.title}>1 HR</span>
                                     </div>
                                 }
                                 key="2"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div className={classes.tabTitleWrap} onClick={() => onChoiceDate(GraphsDate.day)}>
                                         <HR/>
                                         <span className={classes.title}>24 HR</span>
                                     </div>
                                 }
                                 key="3"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div className={classes.tabTitleWrap} onClick={() => onChoiceDate(GraphsDate.week)}>
                                             <Day/>
                                         <span className={classes.title}>7 Days</span>

                                     </div>
                                 }
                                 key="4"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div className={classes.tabTitleWrap} onClick={() => onChoiceDate(GraphsDate.month)}>
                                         <Day/>
                                         <span className={classes.title}>30 Days</span>
                                     </div>
                                 }
                                 key="5"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div className={classes.tabTitleWrap} onClick={handleCustomGraphs}>
                                         <Custom/>
                                         <span className={classes.title}>Custom</span>
                                     </div>
                                 }
                                 key="6"/>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
export default TabsSensorGraphs;
