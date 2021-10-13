import React, {useState} from "react";
import {Form, Input} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useDispatch} from "react-redux";

import {CustomButton} from "../Button";
import {userAC} from "../../store/branches/user/actionCreators";

import classes from "./Login.module.scss";
import ForgotPassword from "../ForgotPasswordModal";

export interface LoginValues {
    username: string
    password: string
}

const LoginForm: React.FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();

    const [isModal, setModal] = useState<boolean>(false);

    const onSubmit = (values: LoginValues) => {
        if (values) {
            dispatch(userAC.signIn({
                username: values.username,
                password: values.password,
            }));
        }
        form.resetFields();
    };
    const onForgotPassword = () => {
        setModal((isModal) => !isModal);
    };

    const onSendEmail = (message: string) => {
        dispatch(userAC.resetPassword(message));
        setModal(false);
    };

    const onCancel = () => {
        setModal(false);
    };

    return (
        <React.Fragment>
            <Form name="login"
                  className="login-form"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}
            >

                <div className={classes.inputTitle}>Email Or Username*</div>
                <Form.Item name="username"
                           rules={[{
                               required: true,
                               message: "Please input your Email Or Username!",
                           }]}>
                    <Input placeholder="Email Or Username" className={classes.loginInput}/>
                </Form.Item>

                <div className={classes.inputTitle}>Password*</div>
                <Form.Item name="password"
                           rules={[{
                               required: true,
                               message: "Please input your Password!",
                           }]}>
                    <Input.Password type="password" placeholder="Password" className={classes.loginInput}/>
                </Form.Item>

                <Form.Item>
                    <CustomButton width="100%"
                                  htmlType="submit"
                                  className={classes.button}
                    >
                        LOGIN
                    </CustomButton>
                </Form.Item>
            </Form>

            <div className={classes.forgotPassword} onClick={onForgotPassword}>
                Forgot your password?
            </div>

            <ForgotPassword isModal={isModal} onSubmit={onSendEmail} onCancel={onCancel}/>

        </React.Fragment>
    );
};
export default LoginForm;
