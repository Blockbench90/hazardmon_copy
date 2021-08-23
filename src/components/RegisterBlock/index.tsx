import React from "react";
import {Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "antd/lib/form/Form";

import {CustomButton} from "../Button";

import {userAC} from "../../store/branches/user/actionCreators";
import {LoadingStatus} from "../../store/types";
import {selectUserState} from "../../store/selectors";

import classes from "./Register.module.scss";


export interface RegisterValues {
    name: string
    company: string
    email: string
}

const RegisterForm: React.FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();

    const {status} = useSelector(selectUserState);
    const isDisabled = status === LoadingStatus.LOADING;

    const onSubmit = (values: RegisterValues) => {
        if (values) {
            dispatch(userAC.signUp(values));
        }
        form.resetFields();
    };

    return (
        <React.Fragment>
            <Form name="register"
                  className="login-form"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}>

                <div className={classes.inputTitle}>Full Name*</div>
                <Form.Item name="name"
                           rules={[{
                               required: true,
                               message: "Full Name!",
                           }]}>
                    <Input placeholder="Full Name" className={classes.loginInput}/>
                </Form.Item>

                <div className={classes.inputTitle}>Company Name*</div>
                <Form.Item name="company"
                           rules={[{
                               required: true,
                               message: "Please input your Company Name!",
                           }]}>
                    <Input placeholder="Company Name" className={classes.loginInput}/>
                </Form.Item>

                <div className={classes.inputTitle}>Email Address*</div>
                <Form.Item name="email"
                           rules={[
                               {
                                   type: "email",
                                   message: "The input is not valid E-mail!",
                               },
                               {
                                   required: true,
                                   message: "Please input your Email Address!",
                               }]}>
                    <Input placeholder="Email Address" className={classes.loginInput}/>
                </Form.Item>

                <Form.Item>
                    <CustomButton width="100%"
                                  htmlType="submit"
                                  disabled={isDisabled}
                                  className={classes.button}
                    >
                        REGISTER
                    </CustomButton>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};
export default RegisterForm;
