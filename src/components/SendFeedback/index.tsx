import React from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";

import SendFeedbackForm from "./components/SendFeedbackForm";
import UserAlert from "../Alerts/user";
import {useDispatch} from "react-redux";
import {userAC} from "../../store/branches/user/actionCreators";
import LandingFooter from "../LandingFooter";


import classes from "./SendFeedback.module.scss";
import {WinStorage} from "../../services/AuthSrorage";
import {Typography} from "antd";

const {Title} = Typography;
const SendFeedback: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const history = useHistory();

    const token = WinStorage.getToken();

    const onSubmit = (values: any) => {
        const data = {
            about: values.about,
            text: values.message,
        };
        dispatch(userAC.sendFeedback(data));
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/");
    };

    return (
        <React.Fragment>
            <UserAlert/>

            <div className={classes.titlePage}>
                <Title level={3}>Send Feedback</Title>
            </div>
            <SendFeedbackForm form={form}
                              onSubmit={onSubmit}
                              onCancel={onCancel}
            />


            {
                !token
                &&
                <div className={classes.footer}>
                    <LandingFooter/>
                </div>
            }
        </React.Fragment>
    );
};
export default SendFeedback;
