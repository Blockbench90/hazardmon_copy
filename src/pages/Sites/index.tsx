import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Empty} from "antd";

import {sitesAC} from "../../store/branches/sites/actionCreators";
import {selectSitesState} from "../../store/selectors";
import {AddNewBlock} from "../../components/AddNewBlock";
import SitesBlock from "./components/SitesBlock";
import HeaderSites from "./components/HeaderSites";
import Preloader from "../../components/Preloader";
import {LoadingStatus} from "../../store/types";
import SitesAlert from "../../components/Alerts/sites";
import UserAlert from "../../components/Alerts/user";

import classes from "./Sites.module.scss";


const Sites: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {status, isSelected, sitesData} = useSelector(selectSitesState);
    const sites = sitesData?.results;

    const isUpdatedSuccess = status === LoadingStatus.EDIT_SITE_SUCCESS;

    const onAddSite = () => {
        history.push("/sites/add/site");
    };

    useEffect(() => {
        if (!isSelected) {
            dispatch(sitesAC.fetchSites());
        }

        return () => {
            dispatch(sitesAC.clearSelectSites());
            dispatch(sitesAC.clearSites());
        };
    }, [dispatch, isSelected]);

    useEffect(() => {
        if (isUpdatedSuccess) {
            dispatch(sitesAC.fetchSites());
        }
    }, [dispatch, status, isUpdatedSuccess]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <div className={classes.wrap}>
                <SitesAlert/>
                <UserAlert/>
                <HeaderSites/>

                <div className={classes.container}>
                    <div className={classes.mapBlock}>
                        {
                            sites?.length === 0
                                ?
                                <Empty description="location is empty!"/>
                                :
                                sites?.map((site, index) =>
                                    <SitesBlock {...site} key={`${site.title}${index}${site.id}`}/>)
                        }
                    </div>

                    <AddNewBlock text="Add New Site" onClick={onAddSite}/>
                </div>
            </div>
        </Preloader>
    );
};

export default Sites;
