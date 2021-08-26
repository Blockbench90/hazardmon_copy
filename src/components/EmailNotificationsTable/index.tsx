import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import EmailHeader from "./components/EmailHeader";
import EmailNotificationsTable from "./components/EmailNotificationsTable";
import {userAC} from "../../store/branches/user/actionCreators";
import {selectUserState} from "../../store/selectors";
import Preloader from "../Preloader";
import {LoadingStatus} from "../../store/types";
import {mapEmailNotificationsData} from "./components/Colums";


const EmailNotifications: React.FC = () => {
    const dispatch = useDispatch();

    const {email_notifications, status} = useSelector(selectUserState);
    const notificationsData = mapEmailNotificationsData(email_notifications);

    const handleChangeEmailNotification = (event: React.MouseEvent<HTMLElement>, id: number) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(userAC.fetchCurrentEmailNotification(id));
    };

    useEffect(() => {
        dispatch(userAC.fetchEmailNotifications());
    }, [dispatch]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <EmailHeader/>

                <EmailNotificationsTable notificationsData={notificationsData}
                                         onChangeClient={handleChangeEmailNotification}
                />
            </React.Fragment>
        </Preloader>
    );
};

export default EmailNotifications;