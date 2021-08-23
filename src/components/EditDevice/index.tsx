import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import {useDispatch, useSelector} from "react-redux";

import EditDeviceForm from "./components/EditDeviceForm";
import {devicesAC} from "../../store/branches/devices/actionCreators";
import {Device} from "../../store/branches/devices/stateTypes";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import DeviceAlert from "../Alerts/device";
import {usePermissions} from "../../hooks/usePermissions";
import {LoadingStatus} from "../../store/types";
import Preloader from "../Preloader";
import {selectDevicesState, selectSitesState} from "../../store/selectors";
import {getKeyByValue} from "../../helpers/getKeyByValue";


const EditDevice: React.FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const {id}: any = useParams();

    const [device, setDevice] = useState<Device>(null);
    const [deviceType, setDeviceType] = useState<string>("");
    const [selectedLocationId, setSelected] = useState<number>(null);

    const {isSuperUser, isOEM} = usePermissions();

    const {status, current_device} = useSelector(selectDevicesState);
    const {all_devices} = useSelector(selectDevicesState);
    const {sitesData} = useSelector(selectSitesState);
    const locations = sitesData?.results;

    const onSubmit = (values: any) => {
        const data = {
            id: device.id,
            location: selectedLocationId,
            title: values.title,
            serial_number: values.serial_number,
            code: values.code,
            device_type: deviceType,
            ip_address: values.ip_address,
            udf_id: values.udf_id,
            is_emulated_as: values.is_emulated_as,
        };
        dispatch(devicesAC.updateCurrentDevice(data));
        form.resetFields();
    };

    const DEVICE_TYPE = {
        "F500": "F500",
        "0300": "WDC4",
        "0005": "ETH-NODE-1",
        "0006": "ETH-NODE-2",
        "F500-UDF": "F500 UDF",
    };

    const handleSelectDeviceType = (value: any, option: any) => {
        const key = getKeyByValue(DEVICE_TYPE, option.key);
        setDeviceType(key);
    };

    const handSelectLocation = (value: any, option: any) => {
        setSelected(Number(option.key));
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/devices");

    };

    useEffect(() => {
        if (current_device) {
            setDevice(current_device);
            setDeviceType(current_device.device_type);
        }

        return () => {
            setDevice(null);
            form.resetFields();
        };
    }, [form, current_device, setDevice, device]);


    useEffect(() => {
        if (device) {
            setSelected(device.location);
        }
    }, [device]);

    useEffect(() => {
        if (!locations) {
            dispatch(sitesAC.fetchSites());
        }
    }, [dispatch, locations]);


    useEffect(() => {
        if (!current_device) {
            dispatch(devicesAC.fetchCurrentDevice(id));
        }
    }, [dispatch, id, current_device]);

    useEffect(() => {
        dispatch(devicesAC.fetchAllDevices());
    }, [dispatch]);

    const onDeactivateDevice = () => {
        dispatch(devicesAC.deactivateDevice(id));
    };

    const onRemoveDevice = () => {
        dispatch(devicesAC.removeDevice(id));
    };

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <DeviceAlert/>
                <EditDeviceForm form={form}
                                locations={locations}
                                device={device}
                                isSuperUser={isSuperUser}
                                isOEM={isOEM}
                                device_type={DEVICE_TYPE}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                                handSelectLocation={handSelectLocation}
                                handleSelectDeviceType={handleSelectDeviceType}
                                onDeactivateDevice={onDeactivateDevice}
                                onRemoveDevice={onRemoveDevice}
                                isEmulatedAs={all_devices}
                                currentDeviceType={deviceType}
                />
            </React.Fragment>
        </Preloader>
    );
};
export default EditDevice;
