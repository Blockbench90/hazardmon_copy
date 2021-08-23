import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import EmailHeader from "./components/EmailHeader";
import EmailNotificationsTable from "./components/EmailNotificationsTable";
import {userAC} from "../../store/branches/user/actionCreators";
import {selectUserState} from "../../store/selectors";
import Preloader from "../Preloader";
import {LoadingStatus} from "../../store/types";


const EmailNotifications: React.FC = () => {
    const dispatch = useDispatch();
    const {email_notifications, status} = useSelector(selectUserState);

    const handleChangeEmailNotification = (event: React.MouseEvent<HTMLElement>, id: number) => {
        console.log("id email notification", id);
    }

    useEffect(() => {
        dispatch(userAC.fetchEmailNotifications());
    }, [dispatch]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <EmailHeader/>

                <EmailNotificationsTable clientsData={email_notifications} onChangeClient={handleChangeEmailNotification}/>
            </React.Fragment>
        </Preloader>
    );
};

export default EmailNotifications;