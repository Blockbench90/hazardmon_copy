import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUserState} from "../../../../store/selectors";
import {LoadingStatus} from "../../../../store/status";
import {userAC} from "../../../../store/branches/user/actionCreators";
import RSSEditForm from "./RSSEditForm";
import Spinner from "../../../../components/Spinner";
import Empty from "antd/lib/empty";


const RSSEdit: React.FC = () => {
    const dispatch = useDispatch();
    const {oem_settings, status} = useSelector(selectUserState);

    const onSubmit = async (values: any) => {
        dispatch(userAC.addOEMSetting(values.oem_settings))
        console.table("values =>", values.oem_settings);
    };

    useEffect(() => {
        dispatch(userAC.fetchOEMSettings());

        return () => {
            dispatch(userAC.setOEMSettings(null));
        };
    }, [dispatch]);

    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    if (oem_settings) {
        return <RSSEditForm onSubmit={onSubmit} oem_settings={oem_settings}/>;
    }
    return <Empty description="An error has occurred, check your internet connection!"/>;
};
export default RSSEdit;

