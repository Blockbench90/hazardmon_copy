import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import {Tooltip, Typography} from "antd";

import powerHold from "../../../assets/icons/powerHold.svg";
import success from "../../../assets/icons/succsess_green.svg";
import suspended from "../../../assets/icons/suspendedSite.svg";
import notify from "../../../assets/icons/red_notify.svg";
import warning from "../../../assets/icons/warning_icon_big.svg";
import {ReactComponent as Edit} from "../../../assets/icons/edit.svg";

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {Site} from "../../../store/branches/sites/stateTypes";
import {devicesAC} from "../../../store/branches/devices/actionCreators";
import {selectUserState} from "../../../store/selectors";

import classes from "../Sites.module.scss";

const {Title, Paragraph} = Typography;

const SitesBlock: React.FC<Site> = ({
                                        id,
                                        title,
                                        address,
                                        is_suspended,
                                    }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {site} = useCurrentSelection();
    const {hasAlarm, hasWarning} = useSelector(selectUserState);

    const isAlarmSite = hasAlarm.some(item => item.location.id === id);
    const isWarningSite = hasWarning.some(item => item.location.id === id);

    const onEditCart = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/sites/edit/${id}`);
    };

    const onSelectDevices = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        const locationId = id.toString();
        dispatch(devicesAC.selectDevices(locationId));
    };

    return (
        <div className={clsx(classes.sitesBlockWrap,
            (site?.id === id) && classes.selectedSite,
            isAlarmSite ? classes.hasAlarmedSensor :
                isWarningSite ? classes.hasWarningSensor : "",
            is_suspended && classes.suspendedBlockWrap,
        )}
             onClick={onSelectDevices}>
            <div className={classes.pic}>
                <img src={powerHold} alt="powerHold" className={classes.powerHold}/>
                {
                    isAlarmSite
                        ?
                        <img src={notify} alt="activation" className={classes.notify}/>
                        :
                        isWarningSite
                            ?
                            <img src={warning} alt="activation" className={classes.notify}/>
                            :
                            is_suspended
                                ?
                                <img src={suspended} alt="activation" className={classes.notify}/>
                                :
                                <img src={success} alt="notify" className={classes.notify}/>
                }
            </div>

            <div className={classes.content}>
                <Tooltip placement="topLeft" title={title}>
                    <Title level={3}>{title}</Title>
                </Tooltip>

                <Paragraph className={classes.cartAddress}>
                    <Tooltip placement="topLeft" title={address}>
                        <div>{address}</div>
                    </Tooltip>
                </Paragraph>
            </div>

            <div className={classes.editButton}>
                <Tooltip placement="right" title={"Edit site"}>
                    <div className={classes.editButtonIcon}>
                        <Edit onClick={onEditCart}/>
                    </div>
                </Tooltip>
            </div>
            {
                (site?.id === id)
                &&
                <div className={classes.flagIcon}/>
            }
        </div>
    );
};
export default SitesBlock;
