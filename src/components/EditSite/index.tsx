import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import {Typography} from "antd";

import {sitesAC} from "../../store/branches/sites/actionCreators";
import EditSiteInputs from "../EditSiteInputs";
import HeaderFormEditSite from "./components/HeaderForm";
import SitesAlert from "../Alerts/sites";
import {LoadingStatus} from "../../store/status";
import Preloader from "../Preloader";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {selectSitesState} from "../../store/selectors";

import classes from "./EditSite.module.scss";

const {Title} = Typography;

const EditSite: React.FC = () => {
    const dispatch = useDispatch();

    const [isModal, setModal] = useState<boolean>(false);
    const [isDeactivateModal, setDeactivateModal] = useState<boolean>(false);

    const {current_location: currentLocation} = useSelector(selectSitesState);
    const {status} = useSelector(selectSitesState);
    const {client} = useCurrentSelection();
    const loc = useLocation()
    console.log("loc ==>", loc)

    const {id}: any = useParams();
    console.log("id ==>", id)

    const onDeactivateSite = () => {
        dispatch(sitesAC.deactivateCurrentLocation(id));
        dispatch(sitesAC.changeActivateCurLoc(!currentLocation?.is_suspended));
        setDeactivateModal(false)
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

    const onOpenModal = () => {
        setModal(true);
    };

    const onOpenDeactivateModal = () => {
        setDeactivateModal(true);
    };

    const onCancelModal = () => {
        setModal(false);
    };
    const onCancelDeactivateModal = () => {
        setDeactivateModal(false);
    };

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <SitesAlert/>


                <div className={clsx("header-link", classes.wrap)}>
                    <Title level={5}> <Link to="/sites">{client?.company}/</Link> {currentLocation?.title || "Site"}
                    </Title>

                    <HeaderFormEditSite onRemoveSite={onOpenModal}
                                        onDeactivateSite={onOpenDeactivateModal}
                                        is_suspended={currentLocation?.is_suspended}
                                        currentLocation={currentLocation}

                    />

                    <EditSiteInputs onRemoveSite={onRemoveSite}
                                    onDeactivateSite={onDeactivateSite}
                                    onCancelModal={onCancelModal}
                                    onCancelDeactivateModal={onCancelDeactivateModal}
                                    isModal={isModal}
                                    is_suspended={currentLocation?.is_suspended}
                                    isDeactivateModal={isDeactivateModal}
                    />

                </div>
            </React.Fragment>
        </Preloader>

    );
};
export default EditSite;
