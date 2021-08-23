import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";

import AddUserForm from "./components/AddUserForm";
import {useDispatch, useSelector} from "react-redux";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import {LoadingStatus} from "../../store/types";
import Preloader from "../Preloader";
import {selectSitesState} from "../../store/selectors";
import {SiteAccess, UserData} from "../../store/branches/sites/stateTypes";


const AddUser: React.FC = () => {
    const [locationAccess, setAccessById] = useState<SiteAccess[]>([]);
    const [form] = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const {site_access, status} = useSelector(selectSitesState);
    const siteAccess = site_access?.results;

    const onSubmit = (values: any) => {
        const new_location_access = locationAccess.map(item => ({
            location_id: item.id,
            has_access: item.has_access,
            permission: item.permission,
        }));

        const data: UserData = {
            full_name: values.full_name,
            company: values.company,
            phone: values.phone,
            email: values.email,
            location_access: new_location_access,
            address: values.address,
        };

        dispatch(sitesAC.setUser(data));
        form.resetFields();
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/sites");
    };

    const onSavePermission = (id: number, permission: SiteAccess["permission"]) => {
        setAccessById(
            locationAccess.map(item =>
                item.id === id
                    ? {...item, permission: permission}
                    : item,
            ));
    };


    const onSaveHasAccess = (id: number, has_access: boolean) => {
        setAccessById(
            locationAccess.map(item =>
                item.id === id
                    ? {...item, has_access: has_access}
                    : item,
            ));
    };

    useEffect(() => {
        dispatch(sitesAC.fetchSiteAccess());
    }, [dispatch]);

    useEffect(() => {
        if (siteAccess) {
            siteAccess.map((item) => setAccessById((prev) =>
                [...prev, {
                    id: item?.id,
                    site: item?.title,
                    has_access: false,
                    permission: "User",
                }],
            ));
        }

        return () => {
            setAccessById([]);
        };
    }, [setAccessById, siteAccess]);


    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>

                <AddUserForm onSubmit={onSubmit}
                             onCancel={onCancel}
                             onSavePermission={onSavePermission}
                             onSaveHasAccess={onSaveHasAccess}
                             form={form}
                             locationAccess={locationAccess}

                />
            </React.Fragment>
        </Preloader>
    );
};
export default AddUser;
