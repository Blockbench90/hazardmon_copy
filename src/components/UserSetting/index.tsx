import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";

import UserSettingForm from "./components/UserSettingForm";
import {useDispatch, useSelector} from "react-redux";
import {userAC} from "../../store/branches/user/actionCreators";
import {LoadingStatus} from "../../store/status";
import UserAlert from "../Alerts/user";
import Empty from "antd/lib/empty";
import {WinStorage} from "../../services/AuthSrorage";
import {selectUserState} from "../../store/selectors";
import {ChangePassword} from "../../store/branches/user/stateTypes";
import Spinner from "../Spinner";


const UserSetting: React.FC = () => {
    const [form] = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const token = WinStorage.getToken();

    const {userData, status} = useSelector(selectUserState);

    const onSubmit = (values: any) => {
        if (values?.old_password) {
            const data: ChangePassword = {
                old_password: values.old_password,
                new_password1: values.new_password,
                new_password2: values.new_password,
            };
            dispatch(userAC.updateUserPassword(data));
        }

        const data = {
            full_name: values.userName,
            company: values.company,
            phone: values.phone,
            email: userData.email,
            address: values.address,
        };
        dispatch(userAC.updateUserData({data, user_id: userData.id}));
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/sites");
    };

    const userName = (userData?.first_name || userData?.last_name) ? (`${userData?.first_name} ${userData?.last_name}`) : "";


    useEffect(() => {
        if (token) {
            dispatch(userAC.fetchUserData());
        }
    }, [dispatch, token]);

    if (status === LoadingStatus.LOADING) {
        return <Spinner/>;
    }

    if (userData) {
        return (
            <React.Fragment>
                <UserAlert/>
                <UserSettingForm form={form}
                                 onSubmit={onSubmit}
                                 onCancel={onCancel}
                                 userData={userData}
                                 userName={userName}
                />
            </React.Fragment>
        );
    }

    return <Empty/>;
};
export default UserSetting;
