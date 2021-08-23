import React, {useState} from "react";
import {Tabs} from "antd";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {ReactComponent as Live} from "../../assets/icons/graphs_live.svg";
import {ReactComponent as HR} from "../../assets/icons/HR.svg";
import {ReactComponent as Day} from "../../assets/icons/Day.svg";
import {ReactComponent as Custom} from "../../assets/icons/custom.svg";

import {LoadingStatus} from "../../store/types";
import {GraphsDate} from "../../store/branches/graphs/stateTypes";
import {CUSTOM_HISTORICAL_GRAPHS, SENSOR_GRAPHS} from "../PrivateRoute/components/constants";
import CustomModal from "./CustomModal";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {WinStorage} from "../../services/AuthSrorage";
import { graphsAC } from "../../store/branches/graphs/actionCreators";

import classes from "../TabsSensorDashboard/TabsSensorDashboard.module.scss";

const {TabPane} = Tabs;

const TabsSensorGraphs: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [active, setActive] = useState<boolean>(true);
    const [modal, setModal] = useState(false);

    const {device} = useCurrentSelection();

    const setVisibleModal = () => {
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
        history.push(CUSTOM_HISTORICAL_GRAPHS);
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

    return (
        <div className={classes.wrap}>
            <div className="d-flex">
                <div>
                    <CustomModal is_modal={modal}
                                 onCancel={onCancelModal}
                                 onHandleSearch={onSearchModal}
                    />

                    <Tabs defaultActiveKey={(history?.location?.pathname === "/graphs/historical/graphs") ? "6" : "3"}
                          className={classes.tabs}
                          style={{paddingTop: "7px"}}
                          centered
                          onChange={onChangeTab}>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div>
                                         <Live/>
                                         <span className={classes.title}>Live</span>
                                     </div>
                                 }
                                 key="1"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={() => onChoiceDate(GraphsDate.hour)}>
                                         <HR/>
                                         <span className={classes.title}>1HR</span>
                                     </div>
                                 }
                                 key="2"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={() => onChoiceDate(GraphsDate.day)}>
                                         <HR/>
                                         <span className={classes.title}>24HR</span>
                                     </div>
                                 }
                                 key="3"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={() => onChoiceDate(GraphsDate.week)}>
                                         <Day/>
                                         <span className={classes.title}>7Day</span>
                                     </div>
                                 }
                                 key="4"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={() => onChoiceDate(GraphsDate.month)}>
                                         <Day/>
                                         <span className={classes.title}>30Day</span>
                                     </div>
                                 }
                                 key="5"/>

                        <TabPane className={classes.tab}
                                 tab={
                                     <div onClick={setVisibleModal}>
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
