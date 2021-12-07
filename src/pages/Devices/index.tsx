import React, {useEffect} from "react";
import {Empty} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {devicesAC} from "../../store/branches/devices/actionCreators";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {FilterStatus} from "../../store/branches/sensors/stateTypes";
import {userAC} from "../../store/branches/user/actionCreators";

import {AddNewBlock} from "../../components/AddNewBlock";
import DevicesBlock from "./components/DevicesBlock";
import HeaderDevices from "./components/HeaderDevices";
import {LoadingStatus} from "../../store/status";
import Preloader from "../../components/Preloader";
import DeviceAlert from "../../components/Alerts/device";
import {selectDevicesState} from "../../store/selectors";
import {usePermissions} from "../../hooks/usePermissions";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";

import classes from "./Devices.module.scss";


const Devices: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {devicesDate, status, isSelected} = useSelector(selectDevicesState);
    const {isManager, isAccountManager} = usePermissions();
    const {device} = useCurrentSelection();

    const onAddDevice = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        history.push("/devices/add/device");
    };

    useEffect(() => {
        if (!isSelected) {
            dispatch(devicesAC.fetchDevices());
        }

        dispatch(userAC.searchNotifications({
            offset: 0,
            is_active: true,
            ordering: `-date_created`,
        }));
        dispatch(sensorsAC.changeFilterStatusSensors(FilterStatus.ACTIVE));

        return () => {
            dispatch(devicesAC.clearSelectDevices());
            dispatch(devicesAC.clearDevices());
        };
    }, [dispatch, isSelected]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <div className={classes.wrap}>
                <DeviceAlert/>
                <HeaderDevices/>

                <div className={"d-flex"}>
                    <div className={classes.mapWrap}>
                        <div className={classes.mapBlock}>
                            {
                                devicesDate?.length === 0
                                    ?
                                    <Empty description="location is empty!"/>
                                    :
                                    devicesDate?.map((item, index) => (
                                        <DevicesBlock {...item} key={`${item.id}${index}`} selectedDevice={device?.id}/>
                                    ))
                            }
                        </div>
                    </div>
                    {
                        (isManager || isAccountManager)
                        &&
                        <AddNewBlock text="Add New Device" onClick={(event) => onAddDevice(event)}/>
                    }


                </div>
            </div>
        </Preloader>
    );
};

export default Devices;
