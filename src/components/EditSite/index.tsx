import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import {Typography} from "antd";

import {sitesAC} from "../../store/branches/sites/actionCreators";
import EditSiteInputs from "../EditSiteInputs";
import HeaderFormEditSite from "./components/HeaderForm";
import SitesAlert from "../Alerts/sites";
import {LoadingStatus} from "../../store/types";
import Preloader from "../Preloader";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectSitesState} from "../../store/selectors";

import classes from "./EditSite.module.scss";

const {Title} = Typography;

const EditSite: React.FC = () => {
    const dispatch = useDispatch();

    const {current_location: currentLocation} = useSelector(selectSitesState);
    const {status} = useSelector(selectSitesState);
    const {client} = useCurrentSelection();

    const {id}: any = useParams();

    const onDeactivateSite = () => {
        dispatch(sitesAC.deactivateCurrentLocation(id));
        dispatch(sitesAC.changeActivateCurLoc(!currentLocation?.is_suspended));
    };

    const onRemoveSite = () => {
        dispatch(sitesAC.removeCurrentLocation(id));
    };

    useEffect(() => {
        dispatch(sitesAC.fetchAssignUsers(id));
        dispatch(sitesAC.fetchCurrentLocation(id));
    }, [dispatch, id]);

    useEffect(() => {

        return () => {
            dispatch(sitesAC.clearAssignUsers());
        };
    }, [dispatch]);


    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <SitesAlert/>
                <div className={clsx("header-link", classes.wrap)}>
                    <Title level={5}> <Link to="/sites">{client?.company}/</Link> {currentLocation?.title || "Site"}
                    </Title>

                    <HeaderFormEditSite onRemoveSite={onRemoveSite}
                                        onDeactivateSite={onDeactivateSite}
                                        is_suspended={currentLocation?.is_suspended}
                                        currentLocation={currentLocation}

                    />

                    <EditSiteInputs/>

                </div>
            </React.Fragment>
        </Preloader>

    );
};
export default EditSite;
