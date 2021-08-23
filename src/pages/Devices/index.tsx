import React, {useEffect} from "react";
import {Empty} from "antd";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {devicesAC} from "../../store/branches/devices/actionCreators";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import {FilterStatus} from "../../store/branches/sensors/stateTypes";

import {AddNewBlock} from "../../components/AddNewBlock";
import DevicesBlock from "./components/DevicesBlock";
import HeaderDevices from "./components/HeaderDevices";
import {LoadingStatus} from "../../store/types";
import Preloader from "../../components/Preloader";
import DeviceAlert from "../../components/Alerts/device";
import {selectDevicesState} from "../../store/selectors";

import classes from "./Devices.module.scss";


const Devices: React.FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {devicesDate, status, isSelected} = useSelector(selectDevicesState);

    const onAddDevice = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        history.push("/devices/add/device");
    };

    useEffect(() => {
        if (!isSelected) {
            dispatch(devicesAC.fetchDevices());
        }
        dispatch(sitesAC.fetchSites());
        dispatch(sensorsAC.changeFilterStatusSensors(FilterStatus.ACTIVE));
        return () => {
            dispatch(devicesAC.clearSelectDevices());
            dispatch(devicesAC.clearDevices());
        };
    }, [dispatch, isSelected]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <div className={clsx("header-link", classes.wrap)}>
                <DeviceAlert/>
                <HeaderDevices/>

                <div className={"d-flex"}>
                    <div className={classes.mapBlock}>
                        {
                            devicesDate?.results.length === 0
                                ?
                                <Empty description="location is empty!"/>
                                :
                                devicesDate?.results.map((device, index) => (
                                    <DevicesBlock {...device} key={`${device.id}${index}`}/>
                                ))
                        }
                    </div>

                    <AddNewBlock text="Add New Device" onClick={(event) => onAddDevice(event)}/>

                </div>
            </div>
        </Preloader>
    );
};

export default Devices;
