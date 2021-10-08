import React, {useEffect} from "react";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";

import {LoadingStatus} from "../../store/status";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";

import DashboardAlert from "../Alerts/dachboard";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import HeaderAddWarnings from "./components/HeaderAddWarnings";
import WarningForm from "./components/WarningForm";

import {AddWarning, Warning} from "../../store/branches/sensors/stateTypes";
import {selectSensorsState} from "../../store/selectors";

import classes from "./EditWarnings.module.scss";
import Spinner from "../Spinner";


const EditWarnings: React.FC = () => {
    const dispatch = useDispatch();

    const {warning_sensors, status, warnings} = useSelector(selectSensorsState);
    const {device} = useCurrentSelection();

    const signOption = [">", "<", "="];

    const warningNames = warnings?.map((item: Warning) => item.name);

    const onSubmit = (values: any) => {
        const payload: AddWarning[] = [];
        values.edit_warnings.forEach((warning: Warning) => (
            payload.push({
                sign: warning.sign,
                value: warning.value,
                sensor_id: warningNames.includes(warning.name) ? warning.sensor_id : +warning.name,
            })
        ));
        dispatch(sensorsAC.addWarning({data: payload, device_id: device.id.toString()}));
    };


    useEffect(() => {
        if (!device) {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE));
            return;
        }
        dispatch(sensorsAC.fetchWarnings(device.id.toString()));
        dispatch(sensorsAC.fetchSensors(device.id.toString()));

        return () => {
            dispatch(sensorsAC.setWarningsSign(null))
        }
    }, [dispatch, device]);


    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }
    if (warnings) {
        return (
            <React.Fragment>
                <DashboardAlert/>
                <HeaderAddWarnings/>
                <div className={clsx("header-link", classes.editDeviceWrap)}>

                    <WarningForm warning_sensors={warning_sensors}
                                 warnings={warnings}
                                 device={device}
                                 signOption={signOption}
                                 onSubmit={onSubmit}
                    />

                </div>
            </React.Fragment>
        );
    }
    return <div className={clsx("header-link", classes.editDeviceWrap)}>

        <WarningForm warning_sensors={warning_sensors}
                     warnings={warnings}
                     device={device}
                     signOption={signOption}
                     onSubmit={onSubmit}
        />

    </div>;
};

export default EditWarnings;
