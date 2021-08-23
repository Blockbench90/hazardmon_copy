import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import {useDispatch, useSelector} from "react-redux";
import Empty from "antd/lib/empty";

import EditSensorsNamesForm from "./components/EditSensorsNamesForm";
import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {LoadingStatus} from "../../store/types";
import DashboardAlert from "../Alerts/dachboard";
import {selectSensorsState} from "../../store/selectors";
import Spinner from "../Spinner";


const EditSensorsNames: React.FC = () => {
    const [form] = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const {device} = useCurrentSelection();
    const {status, sensorNames} = useSelector(selectSensorsState);

    //custom implementation, before changes to backand request
    const clearObject = (obj: any) => {
        const copyValues = {...obj};
        delete copyValues.degrees;
        delete copyValues.network0;
        delete copyValues.network1;
        delete copyValues.network2;
        delete copyValues.network3;

        return copyValues;
    };

    const onSubmit = (values: any) => {
        if (device.device_type === "F500-UDF") {
            const data = {
                degrees: values.degrees,
                networks: {
                    1: values.network0,
                    2: values.network1,
                    3: values.network2,
                    4: values.network3,
                },
                "sensor_names": clearObject(values),
            };
            dispatch(sensorsAC.addSensorNames({device_id: device?.id.toString(), data}));
        } else {
            const data = {
                "sensor_names": values,
            };
            dispatch(sensorsAC.addSensorNames({device_id: device?.id.toString(), data}));
        }
    };


    const onCancel = () => {
        form.resetFields();
        history.push("/devices");
    };

    useEffect(() => {
        if (!device) {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE));
            return;
        }
        dispatch(sensorsAC.fetchSensorNames(device?.id.toString()));

        return () => {
            dispatch(sensorsAC.setSensorNames(null));
        };
    }, [dispatch, device]);

    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    if (sensorNames) {
        return (
            <React.Fragment>
                <DashboardAlert/>

                <EditSensorsNamesForm form={form}
                                      device_type={device.device_type}
                                      deviceTitle={device?.title}

                                      sensorNames={sensorNames}
                                      onSubmit={onSubmit}
                                      onCancel={onCancel}
                />
            </React.Fragment>
        );
    }
    return <Empty description="Sensor names is empty!"/>;
};
export default EditSensorsNames;
