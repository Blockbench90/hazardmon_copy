import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {CSVLink} from "react-csv";
import {UserApi} from "../../../services/api/userApi";
import {Spin} from "antd";

import {ReactComponent as ExportLink} from "../../../assets/icons/export_link.svg";
import {devicesAC} from "../../../store/branches/devices/actionCreators";
import {LoadingStatus} from "../../../store/status";

import classes from "../Notifications.module.scss";
import { useHistory } from "react-router-dom";


const ExportNotifications: React.FC<{ searchPayload: any }> = ({searchPayload}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [notificationsData, setNotificationsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const csvLink = useRef();

    const getNotificationsData = async () => {
        if (!searchPayload.date_created_from && !searchPayload.date_created_to) {
            dispatch(devicesAC.setOperationDevices(LoadingStatus.EXPORT_NOTIFICATIONS_WITHOUT_DATE));
            return;
        }

        setLoading(true);
        await UserApi.fetchExportNotifications(searchPayload)
            .then((r) => {
                setNotificationsData(r);
                setLoading(false);
            }).catch((e) => {
                history.push("/devices")
                console.log(e);
                devicesAC.setOperationDevices(LoadingStatus.REMOVE_DEVICE_ERROR)
                setLoading(false);
            });
        // @ts-ignore
        csvLink?.current?.link.click();
    };


    return (
        <React.Fragment>
            {
                loading ? <Spin/> : <ExportLink className={classes.export} onClick={getNotificationsData}/>
            }
            <CSVLink
                data={notificationsData}
                filename="notifications.csv"
                className="hidden"
                ref={csvLink}
                target="_blank"
            />
        </React.Fragment>
    );
};

export default ExportNotifications;