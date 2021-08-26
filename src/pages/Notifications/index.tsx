import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "antd/lib/form/Form";
import {isEqual} from "lodash";

import HeaderNotifications from "./components/HeaderNotifications";
import SearchBlock from "./components/SearchBlock";
import NotificationsForm from "./components/NotificationsForm";
import {mapNotificationsData} from "./components/Colums";
import TableNotifications from "./components/TableNotifications";
import {userAC} from "../../store/branches/user/actionCreators";
import {LoadingStatus} from "../../store/types";
import Preloader from "../../components/Preloader";

import {Site} from "../../store/branches/sites/stateTypes";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import {devicesAC} from "../../store/branches/devices/actionCreators";
import DeviceAlert from "../../components/Alerts/device";
import {selectDevicesState, selectSitesState, selectUserState} from "../../store/selectors";

import classes from "./Notifications.module.scss";

interface ISorting {
    column: string;
    order: "ascend" | "descend" | false;
}

interface IFilterData {
    date_created_from: string,
    date_created_to: string,
    location: string,
    device: string,
    event_type: string
}

const initialFilterData: IFilterData = {
    date_created_from: null,
    date_created_to: null,
    location: null,
    device: null,
    event_type: null,
};

const Notifications: React.FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();

    const [searchData, setSearchData] = useState<IFilterData>(initialFilterData);

    const {status, notifications: {results: notifications = [], count: countNotifications}, notificationsFilter: {isActive}} = useSelector(selectUserState);

    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState({page: 1, pageSize: 20});
    const [sorting, setSorting] = useState<ISorting>({column: "date_created", order: "descend"});

    useEffect(() => {
        dispatch(userAC.searchNotifications({
            limit: pagination.pageSize,
            offset: (pagination.page - 1) * pagination.pageSize,
            search: searchTerm,
            is_active: isActive,
            ...searchData,
            ordering: `${sorting.order === "descend" ? "-" : ""}${sorting.column}`,
        }));
    }, [dispatch, sorting.order, sorting.column, searchTerm, pagination, isActive, searchData]);

    useEffect(() => {
        dispatch(sitesAC.fetchSites());
        dispatch(devicesAC.fetchDevices());
    }, [dispatch]);

    const {sitesData} = useSelector(selectSitesState);
    const {devicesDate} = useSelector(selectDevicesState);
    const sites: Site[] = sitesData?.results;

    const onChangeSearch = useCallback((value: string) => {
        setSearchTerm(value);
    }, []);

    const onChangePagination = useCallback((page: number, pageSize: number) => {
        setPagination({page, pageSize});
    }, []);

    const onChangeSort = useCallback((sorter) => {
        setSorting({order: sorter.order, column: sorter?.column?.dataIndex});
    }, []);

    const onChangeLocation = useCallback((value: any, option: any) => {
        if (option.props === "All") {
            return;
        }
        setSearchData(prev => ({...prev, location: option.props}));
    }, []);

    const onClearFilters = useCallback(() => {
        form.resetFields();
        setSearchTerm("");
        setSearchData({
            date_created_from: null,
            date_created_to: null,
            location: null,
            device: null,
            event_type: null,
        });
    }, [form]);

    const handSelectDate = (value: Array<any>) => {
        let date_created_from: string = null;
        let date_created_to: string = null;

        if (value) {
            const [from, to] = value;
            date_created_from = from ? from.format("YYYY-MM-DD") : null;
            date_created_to = to ? to.format("YYYY-MM-DD") : null;
        }

        setSearchData(prev => ({
            ...prev,
            date_created_from,
            date_created_to,
        }));
    };

    const handSelectDevice = (value: any, option: any) => {
        if (option.props === "All") {
            return;
        }
        setSearchData(prev => ({...prev, device: option.props}));
    };

    const handSelectType = (value: any, option: any) => {
        if (option.props === "All") {
            return;
        }
        setSearchData(prev => ({...prev, event_type: option.props}));
    };

    const tableData = useMemo(() => {
        return mapNotificationsData(notifications || [], isActive);
    }, [notifications, isActive]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <div className={classes.wrap}>
                <DeviceAlert/>
                <HeaderNotifications/>
                <SearchBlock onSearch={onChangeSearch}
                             value={searchTerm}
                             count={countNotifications}
                             searchPayload={{
                                 limit: pagination.pageSize,
                                 offset: (pagination.page - 1) * pagination.pageSize,
                                 search: searchTerm,
                                 is_active: isActive,
                                 ...searchData,
                                 ordering: `${sorting.order === "descend" ? "-" : ""}${sorting.column}`,
                             }}
                />

                <NotificationsForm form={form}
                                   onClearFilters={onClearFilters}
                                   isClearFilters={searchTerm !== "" || !isEqual(initialFilterData, searchData)}
                                   handSelectDate={handSelectDate}
                                   handSelectSite={onChangeLocation}
                                   handSelectDevice={handSelectDevice}
                                   handSelectType={handSelectType}
                                   sites={sites}
                                   devices={devicesDate?.results}
                />

                <TableNotifications data={tableData}
                                    count={countNotifications}
                                    pageNumber={pagination.page}
                                    onPagesChange={onChangePagination}
                                    sorting={sorting}
                                    onChangeSort={onChangeSort}
                />
            </div>
        </Preloader>
    );
};

export default Notifications;
