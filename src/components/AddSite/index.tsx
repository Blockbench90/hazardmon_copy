import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import {Typography} from "antd";

import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import HeaderFormAddSite from "./components/HeaderForm";
import SitesAlert from "../Alerts/sites";
import {LoadingStatus} from "../../store/status";
import Preloader from "../Preloader";
import AddSiteForm from "./components/AddSiteForm";
import {selectSitesState} from "../../store/selectors";

import classes from "./EditSite.module.scss";

const {Title} = Typography;

const AddSite: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const history = useHistory();

    const {status, timezones} = useSelector(selectSitesState);
    const {client} = useCurrentSelection();

    const onSubmit = (values: any) => {
        const data = {
            title: values.title,
            address: values.address,
            full_name: values.full_name,
            email: values.email,
            mobile: values.mobile,
            timezone: values.timezone,
        };
        dispatch(sitesAC.addSite(data));
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/sites");
    };

    useEffect(() => {
        if (!timezones) {
            dispatch(sitesAC.fetchTimezones());
        }
    }, [dispatch, timezones]);


    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <SitesAlert/>
                <div className={clsx("header-link", classes.wrap)}>
                    <Title level={5}> <Link to="/sites">{client?.company || "Client"}</Link></Title>

                    <HeaderFormAddSite/>

                    <AddSiteForm form={form}
                                 onSubmit={onSubmit}
                                 timezones={timezones}
                                 onCancel={onCancel}
                    />

                </div>
            </React.Fragment>
        </Preloader>
    );
};
export default AddSite;
