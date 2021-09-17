import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import {useDispatch, useSelector} from "react-redux";
import Empty from "antd/lib/empty";

import {sensorsAC} from "../../store/branches/sensors/actionCreators";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import EditSensorsSettingsForm from "./components/EditSensorsSettingsForm";
import DashboardAlert from "../Alerts/dachboard";
import {LoadingStatus} from "../../store/status";
import {selectSensorsState} from "../../store/selectors";
import Spinner from "../Spinner";


const EditSensorsSettings: React.FC = () => {
    const [form] = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const {device} = useCurrentSelection();
    const {status, sensorSettings, units} = useSelector(selectSensorsState);
    
    const isCorrectDevice = ["0005", "0006"].includes(device?.device_type);

    const onSubmit = (values: any) => {
        const arrayFromObject = Object.entries(values);

        const obj: any = {};
        arrayFromObject.forEach((item: any) => {
            const valueId: string = item[0].split(" ")[0];
            const valueName: string = item[0].split(" ")[1];
            const newValue = item[1] === "Digital" ? "BOOL" : item[1] === "Analog" ? "NUMERIC" : item[1];

            if (!obj[valueId]) {
                obj[valueId] = {[valueName]: newValue};
            }
            obj[valueId][valueName] = newValue;
        });

        dispatch(sensorsAC.addSensorSettings({device_id: device.id, data: {"sensor_types": obj}}));
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/dashboard");
    };

    useEffect(() => {
        if (!device) {
            dispatch(sensorsAC.setSensorsStatusOperation(LoadingStatus.FETCH_SENSORS_WITHOUT_DEVICE));
            return;
        }

        dispatch(sensorsAC.fetchSensorSettings(device.id));

        return () => {
            dispatch(sensorsAC.setSensorSettings(null));
        };
    }, [dispatch, device]);

    useEffect(() => {
        if (device && !isCorrectDevice) {
            history.push("/dashboard");
        }

    }, [device, history, isCorrectDevice]);

    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    if (sensorSettings) {
        return (
            <React.Fragment>
                <DashboardAlert/>

                <EditSensorsSettingsForm form={form}
                                         onSubmit={onSubmit}
                                         onCancel={onCancel}

                                         sensorSettings={sensorSettings}
                                         units={units}
                                         deviceTitle={device.title}
                                         deviceType={device?.device_type}
                />
            </React.Fragment>
        );
    }
    return <Empty description="Sensor names is empty!"/>;
};
export default EditSensorsSettings;
