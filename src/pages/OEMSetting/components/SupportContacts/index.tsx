import React, { useEffect } from "react";
import Empty from "antd/lib/empty";
import ContactSupportForm from "./ContactSupportForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "../../../../store/selectors";
import { userAC } from "../../../../store/branches/user/actionCreators";
import { LoadingStatus } from "../../../../store/status";
import Spinner from "../../../../components/Spinner";


const SupportContacts: React.FC = () => {
    const dispatch = useDispatch();
    const {support_contacts, status} = useSelector(selectUserState);

    const onSubmit = (values: any) => {
        dispatch(userAC.addSupportContact(values))
    };

    useEffect(() => {
        dispatch(userAC.fetchSupportContacts());

        return () => {
            dispatch(userAC.setSupportContacts(null));
        };
    }, [dispatch]);

    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    if (support_contacts) {
        return <ContactSupportForm onSubmit={onSubmit}
                                   support_contacts={support_contacts}
        />;
    }
    return <Empty description="An error has occurred, check your internet connection!"/>;
};
export default SupportContacts;

