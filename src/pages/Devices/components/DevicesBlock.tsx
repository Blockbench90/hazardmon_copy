import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Tooltip, Typography} from "antd";
import clsx from "clsx";

import suspended from "../../../assets/icons/suspended.svg";
import device from "../../../assets/icons/devices_color.svg";
import success from "../../../assets/icons/succsess_green.svg";
import notify from "../../../assets/icons/red_notify.svg";
import active from "../../../assets/icons/active.svg";
import warning from "../../../assets/icons/warning_icon_big.svg";
import offline from "../../../assets/icons/offline.svg";
import suspended_device from "../../../assets/icons/suspended_device.svg";

import {ReactComponent as Edit} from "../../../assets/icons/device_edit.svg";

import {devicesAC} from "../../../store/branches/devices/actionCreators";
import {Device} from "../../../store/branches/devices/stateTypes";
import {usePermissions} from "../../../hooks/usePermissions";
import {selectUserState} from "../../../store/selectors";

import classes from "../Devices.module.scss";

const {Title} = Typography;

const DevicesBlock: React.FC<Device> = ({
                                            id,
                                            title,
                                            is_suspended,
                                            is_online,
                                            selectedDevice,
                                        }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isOEM, isSuperUser} = usePermissions();
    const {hasAlarm, hasWarning} = useSelector(selectUserState);

    const isAlarmDevice = hasAlarm.some(item => item.device.id === id);
    const isWarningDevice = hasWarning.some(item => item.device.id === id);

    const onEdit = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/devices/edit/device/${id}`);
        dispatch(devicesAC.fetchCurrentDevice(id));
    };

    const handleSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (is_suspended || !is_online) {
            if (isOEM || isSuperUser) {
                dispatch(devicesAC.selectDevice(id.toString()));
                return;
            }
            return;
        }
        dispatch(devicesAC.selectDevice(id.toString()));
    };

    return (
        <div className={clsx({
            [classes.devicesBlockWrap]: true,
            [classes.suspendedBlockWrap]: is_suspended,
            [classes.OEMCursor]: isOEM || isSuperUser,
            [classes.selectedDevice]: (id === selectedDevice),
        }, isAlarmDevice ? classes.hasAlarmedSensor :
            isWarningDevice ? classes.hasWarningSensor : "")}

             onClick={(event) => handleSelect(event)}
        >

            <div className={classes.pic}>
                <img src={is_suspended ? suspended_device : device} alt="powerHold" className={classes.devicesPic}/>
                {
                    isAlarmDevice
                        ?
                        <img src={notify} alt="" className={classes.notify}/>
                        :
                        isWarningDevice
                            ?
                            <img src={warning} alt="" className={classes.notify}/>

                            :
                            is_online && <img src={success} alt="" className={classes.notify}/>
                }
            </div>

            <div className={classes.activation}>
                <img src={is_online ? active : is_suspended ? suspended : offline} alt="activation"/>
                <span className={clsx(
                    is_online ? classes.active : is_suspended ? classes.suspended : classes.offline)}>

                    {is_online ? "Active" : is_suspended ? "Suspended" : "Offline"}

                </span>
                <Title level={4}>
                    {title}
                </Title>
            </div>

            <div className={classes.editButton}>
                <div className={classes.editButtonIcon}>
                    <Tooltip placement="topRight" title="Edit device">
                        <Edit onClick={(event) => onEdit(event)}/>
                    </Tooltip>
                </div>
            </div>
            {
                (id === selectedDevice)
                &&
                <div className={classes.flagIcon}/>
            }
        </div>
    );
};

export default DevicesBlock;
