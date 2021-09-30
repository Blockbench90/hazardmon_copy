import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useHistory} from "react-router-dom";

import HeaderFormSettings from "./HeaderForm";
import InputWrap from "../../../../components/InputWrap";
import {oem_setting} from "../../../../store/branches/user/stateTypes";

import classes from "./RSSEdit.module.scss";
import {MinusCircleOutlined} from "@ant-design/icons";

interface WrapProps {
    onSubmit: (values: any) => void
    oem_settings: oem_setting[]

}

const RSSEditForm: React.FC<WrapProps> = ({
                                              oem_settings,
                                              onSubmit,
                                          }) => {
    const history = useHistory();
    const [form] = useForm();

    const handleSubmit = async (values: any) => {
        onSubmit(values);
    };

    const handleCancel = () => {
        history.push("/sites");
    };
    useEffect(() => {
        form.setFieldsValue(oem_settings);
    }, [form, oem_settings]);

    return (
        <Form name="oem_settings"
              form={form}
              autoComplete="on"
              initialValues={{oem_settings: oem_settings}}
              onFinish={handleSubmit}
        >
            <HeaderFormSettings onCancel={handleCancel}/>

            <div className={classes.inputsWrap}>
                <div className={classes.container}>
                    <div className={classes.mapBlock}>

                        <Form.List name="oem_settings">
                            {(fields, {add, remove}) => {
                                return (
                                    <React.Fragment>
                                        {fields.map(({key, name, fieldKey, ...restField}) => (
                                            <React.Fragment key={key}>

                                                <InputWrap title="Title*">
                                                    <Form.Item {...restField}
                                                               name={[name, "title"]}
                                                               fieldKey={[fieldKey, "title"]}
                                                               rules={[{
                                                                   required: true,
                                                                   message: "Please input your title",
                                                               }]}>
                                                        <Input/>
                                                    </Form.Item>
                                                </InputWrap>

                                                <InputWrap title="Description*">
                                                    <Form.Item {...restField}
                                                               name={[name, "description"]}
                                                               fieldKey={[fieldKey, "description"]}
                                                               rules={[{
                                                                   required: true,
                                                                   message: "Please input your description",
                                                               }]}>
                                                        <Input/>
                                                    </Form.Item>
                                                </InputWrap>

                                                <InputWrap title="Url*">
                                                    <Form.Item {...restField}
                                                               name={[name, "url"]}
                                                               fieldKey={[fieldKey, "url"]}
                                                               rules={[{
                                                                   required: true,
                                                                   message: "Please input your url",
                                                               }]}>
                                                        <Input/>
                                                    </Form.Item>
                                                </InputWrap>

                                                <InputWrap className={classes.checkbox}>
                                                    <div>
                                                        <MinusCircleOutlined style={{color: "red", marginRight: "5px"}}
                                                                             onClick={() => remove(name)}/>
                                                        DELETE

                                                    </div>
                                                </InputWrap>
                                            </React.Fragment>
                                        ))}

                                        <div className={classes.newField}>
                                            <div/>
                                            <div>
                                                <Form.Item>
                                                    <Button type="primary"
                                                            style={{
                                                                width: "150px",
                                                                height: "40px",
                                                                borderRadius: "7px",
                                                            }}
                                                            onClick={() => add()} block>
                                                        Add field
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            }}
                        </Form.List>
                    </div>
                </div>
            </div>
        </Form>
    );
};
export default RSSEditForm;

