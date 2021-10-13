import React, {useEffect} from "react";
import {Form, Input} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useHistory} from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";

import HeaderForm from "./HeaderForm";
import InputWrap from "../../../../components/InputWrap";

import classes from "./RSSEdit.module.scss";
import { support_contacts } from "../../../../store/branches/user/stateTypes";

interface WrapProps {
    onSubmit: (values: any) => void
    support_contacts?: support_contacts

}

const ContactSupportForm: React.FC<WrapProps> = ({
                                                     support_contacts,
                                              onSubmit,
                                          }) => {
    const history = useHistory();
    const [form] = useForm();

    const handleSubmit = async (values: any) => {
        onSubmit(values);
    };

    const handleCancel = () => {
        history.push("/oem/setting");
    };

    useEffect(() => {
        form.setFieldsValue(support_contacts);
    }, [form, support_contacts]);

    return (
        <React.Fragment>

            <Form name="support_contacts"
                  form={form}
                  initialValues={{support_contacts: support_contacts}}
                  onFinish={handleSubmit}
            >
                <HeaderForm onCancel={handleCancel}/>

                <div className={classes.inputsWrap}>
                    <div className={classes.container}>

                            <InputWrap title="Support address">
                                <Form.Item name="support_address"
                                           rules={[
                                               {
                                                   message: "Ensure this field has no more than 255 characters",
                                                   max: 255,
                                               }]}>
                                    <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Support phone">
                                <Form.Item name="support_phone">
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Support email">
                                <Form.Item name="support_email"
                                           rules={[{
                                               type: "email",
                                               message: "The input is not valid E-mail!",
                                           }]}>
                                    <Input/>
                                </Form.Item>
                            </InputWrap>
                    </div>
                </div>
            </Form>
        </React.Fragment>
    );
};

export default ContactSupportForm;

