import React from "react";
import {useHistory} from "react-router-dom";
import {Tooltip, Typography} from "antd";

import powerHold from "../../../assets/icons/powerHold.svg";
import success from "../../../assets/icons/succsess_green.svg";
import notify from "../../../assets/icons/red_notify.svg";

import {ReactComponent as Edit} from "../../../assets/icons/edit.svg";

import {Site} from "../../../store/branches/sites/stateTypes";
import {devicesAC} from "../../../store/branches/devices/actionCreators";
import {useDispatch} from "react-redux";

import classes from "../Sites.module.scss";

const {Title, Paragraph} = Typography;

const SitesBlock: React.FC<Site> = ({
                                        id,
                                        title,
                                        address,
                                        full_name,
                                        email,
                                        mobile,
                                        timezone,
                                        client,
                                        is_suspended,
                                        visual_dashboard_enabled,
                                        devices,
                                    }) => {
    const history = useHistory();
    const dispatch = useDispatch();

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
        <div className={classes.sitesBlockWrap} onClick={onSelectDevices}>
            <div className={classes.pic}>
                <img src={powerHold} alt="powerHold" className={classes.powerHold}/>
                <img src={is_suspended ? notify : success} alt="notify" className={classes.notify}/>
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
        </div>
    );
};
export default SitesBlock;
