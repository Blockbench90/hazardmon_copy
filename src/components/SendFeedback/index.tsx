import React from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";

import SendFeedbackForm from "./components/SendFeedbackForm";
import UserAlert from "../Alerts/user";
import { useDispatch } from "react-redux";
import {userAC} from "../../store/branches/user/actionCreators";


const SendFeedback: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const history = useHistory();


    const onSubmit = (values: any) => {
        const data = {
            about: values.about,
            text: values.message,
        };
        dispatch(userAC.sendFeedback(data))
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/");
    };


    return (
        <React.Fragment>
            <UserAlert/>
            <SendFeedbackForm form={form}
                              onSubmit={onSubmit}
                              onCancel={onCancel}
            />

        </React.Fragment>
    );
};
export default SendFeedback;
