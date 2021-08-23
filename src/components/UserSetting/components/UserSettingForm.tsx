import React from "react";
import clsx from "clsx";
import {Form, Input} from "antd";
import TextArea from "antd/lib/input/TextArea";

import InputWrap from "../../InputWrap";
import HeaderFormUserSetting from "./HeaderForm";

import classes from "../UserSetting.module.scss";

interface UserSettingFormProps {
    onSubmit?: (values: any) => void;
    onCancel?: () => void;
    form?: any;
    userData?: any;
    userName?: string;
}

const UserSettingForm: React.FC<UserSettingFormProps> = ({
                                                             onSubmit,
                                                             onCancel,
                                                             form,
                                                             userData,
                                                             userName,
                                                         }) => {
    return (
        <div className={clsx("header-link", classes.userSettingWrap)}>
            <Form name="user_setting"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}
            >
                <HeaderFormUserSetting onCancel={onCancel}/>

                <div className={classes.settingUserInputsWrap}>
                    <div className={classes.container}>
                        <div className={classes.groupInputs}>
                            <div className={classes.blockWrap}>

                                <InputWrap title="Full name*">
                                    <Form.Item name="userName"
                                               initialValue={userName}
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your full name",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Company">
                                    <Form.Item name="company" initialValue={userData?.company}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Phone">
                                    <Form.Item name="phone"
                                               initialValue={userData?.phone}
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your full phone",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Address">
                                    <Form.Item name="address" initialValue={userData?.address}
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your full address",
                                               }]}>
                                        <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                                    </Form.Item>
                                </InputWrap>
                            </div>

                            <div className={classes.passwordsBlock}>
                                <InputWrap title="Old Password">
                                    <Form.Item name="old_password">
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="New Password">
                                    <Form.Item
                                        name="new_password"
                                        hasFeedback
                                    >
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Confirm Password">
                                    <Form.Item
                                        name="confirm"
                                        dependencies={["new_password"]}
                                        hasFeedback
                                        rules={[
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue("new_password") === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default UserSettingForm;