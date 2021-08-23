import React, {useEffect, useState} from "react";
import {Typography} from "antd";
import {useForm} from "antd/lib/form/Form";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import AddDeviceForm from "./components/AddDeviceForm";
import {devicesAC} from "../../store/branches/devices/actionCreators";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import DeviceAlert from "../Alerts/device";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectSitesState} from "../../store/selectors";
import {getKeyByValue} from "../../helpers/getKeyByValue";

const {Title} = Typography;


const AddDevice: React.FC = () => {
    const [form] = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const [selectedLocationId, setSelected] = useState<number>(null);
    const [deviceType, setDevice] = useState<string>("");

    const {sitesData} = useSelector(selectSitesState);
    const locations = sitesData?.results;
    const {client, site} = useCurrentSelection();

    const onSubmit = (values: any) => {
        const data = {
            location: selectedLocationId ?? locations[0].id,
            title: values.title,
            serial_number: values.serial_number,
            code: values.code,
            device_type: deviceType,
            ip_address: values.ip_address,
            udf_id: values.udf_id,
        };
        dispatch(devicesAC.addDevice(data));
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/devices");
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
        setDevice(key);
    };

    const handSelectLocation = (value: any, option: any) => {
        setSelected(Number(option.key));
    };


    useEffect(() => {
        if (!locations) {
            dispatch(sitesAC.fetchSites());
        }
    }, [dispatch, locations]);

    useEffect(() => {
        setDevice("F500");
    }, []);

    return (
        <React.Fragment>
            <Title level={5} className="header-link">
                <Link to="/sites">{client?.company || "Client"}</Link>/
                <Link to="/devices">{site?.title || "Site"}</Link>
            </Title>
            <DeviceAlert/>
            <AddDeviceForm form={form}
                           device_type={DEVICE_TYPE}
                           handleSelectDeviceType={handleSelectDeviceType}
                           handSelectLocation={handSelectLocation}
                           onCancel={onCancel}
                           onSubmit={onSubmit}
            />
        </React.Fragment>
    );
};
export default AddDevice;
