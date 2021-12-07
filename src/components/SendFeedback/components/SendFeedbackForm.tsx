import React, {useState} from "react";
import {Form, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import InputWrap from "../../InputWrap";
import {CustomButton} from "../../Button";
import ReCAPTCHA from "react-google-recaptcha";

import classes from "../SendFeedback.module.scss";


interface AddSiteProps {
    form: any
    onSubmit: (values: any) => void
    onCancel: () => void
}

const {Option} = Select;

const SendFeedbackForm: React.FC<AddSiteProps> = ({form, onSubmit, onCancel}) => {
    const [isEnabled, setEnabled] = useState<boolean>(true)
    const selectChoice = ["Website usage", "Feature request", "Issue", "Other"];
    const recaptchaKey = process.env.NODE_ENV === "development" ? "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" : process.env.REACT_APP_RECAPTCHA_KEY;

    function onChange(value) {
        if(value){
            setEnabled(false)
        }
        console.log("Captcha value:", value);
    }

    return (
        <div className={classes.wrap}>
            <Form name="send_feedback"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}>

                <div className={classes.container}>
                    <div className={classes.groupInputs}>

                        <div className={classes.blockWrap}>
                            <InputWrap title="About">
                                <Form.Item name="about"
                                           initialValue={selectChoice[0]}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please input title",
                                               },
                                               {
                                                   message: "Ensure this field has no more than 255 characters",
                                                   max: 255,
                                               }]}
                                >
                                    <Select>
                                        {selectChoice.map((item: string, index: number) => (
                                            <Option value={item} key={`${item}_choice_${index}`}>
                                                {item}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Message">
                                <Form.Item name="message"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please input your message",
                                               },
                                               {
                                                   message: "Ensure this field has no more than 1500 characters",
                                                   max: 1500,
                                               }]}>
                                    <TextArea autoSize={{minRows: 6, maxRows: 15}}/>
                                </Form.Item>
                            </InputWrap>

                            <div className={classes.captcha}>
                                <ReCAPTCHA
                                    sitekey={recaptchaKey}
                                    onChange={onChange}
                                />
                            </div>
                            <div className={classes.button}>
                                <Form.Item>
                                    <CustomButton width="123px"
                                                  height="40px"
                                                  padding="2px 2px"
                                                  fontSize="13px"
                                                  htmlType="submit"
                                                  className="mar-right-10"
                                                  disabled={isEnabled}
                                    >
                                        SEND
                                    </CustomButton>
                                </Form.Item>
                                <Form.Item>
                                    <CustomButton width="94px"
                                                  height="40px"
                                                  padding="2px 2px"
                                                  color="gray"
                                                  fontSize="13px"
                                                  htmlType="button"
                                                  onClick={onCancel}
                                    >
                                        <span>CANCEL</span>
                                    </CustomButton>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default SendFeedbackForm;
