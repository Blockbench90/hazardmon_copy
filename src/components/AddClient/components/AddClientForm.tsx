import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import clsx from "clsx";
import {Checkbox, Form, Input} from "antd";

import TextArea from "antd/lib/input/TextArea";
import {Client} from "../../../store/branches/clients/stateTypes";
import {LoadingStatus} from "../../../store/status";
import InputWrap from "../../InputWrap";
import Preloader from "../../Preloader";
import HeaderFormAddClient from "./HeaderForm";
import {selectClientsState} from "../../../store/selectors";
import {clientsAC} from "../../../store/branches/clients/actionCreators";

import classes from "../AddClient.module.scss";

interface UserSettingFormProps {
    onSubmit?: (values: any) => void
    onCancel?: () => void
    onChecked?: () => void
    form?: any
    isChecked: boolean
}


const AddClientForm: React.FC<UserSettingFormProps> = ({
                                                           onSubmit,
                                                           onCancel,
                                                           form,
                                                           isChecked,
                                                           onChecked,
                                                       }) => {

    const dispatch = useDispatch();


    const {current_client, status} = useSelector(selectClientsState);
    const {next_client_number} = useSelector(selectClientsState);
    const {id}: any = useParams();

    const [client, setClient] = useState<Client>(null);

    const onRemoveClient = () => {
        dispatch(clientsAC.removeClient(id));
    };

    useEffect(() => {
        if (!!current_client) {
            setClient(current_client);
        }

        form.setFieldsValue(client);

        return () => {
            setClient(null);
            form.resetFields();
        };
    }, [form, current_client, client, dispatch]);

    useEffect(() => {
        if (id && !current_client) {
            dispatch(clientsAC.fetchCurrentClient(id));
        }

        return () => {
            if (current_client) {
                dispatch(clientsAC.clearCurrentClient());
            }
        };
    }, [dispatch, current_client, id]);

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <div className={clsx("header-link")}>
                <Form name="user_setting"
                      form={form}
                      initialValues={{remember: true}}
                      onFinish={onSubmit}
                >
                    <HeaderFormAddClient onCancel={onCancel}
                                         currentClient={current_client}
                                         onRemoveClient={onRemoveClient}
                    />

                    <div className={classes.addClientWrap}>
                        <div className={classes.container}>

                            <div className={classes.description}>
                                <span>Person with the filled email address will have administrative permissions. Account activations settings will be emailed to that person.</span>
                            </div>

                            <div className={classes.groupInputs}>
                                <div className={classes.blockWrap}>

                                    <InputWrap title="Account Number*">
                                        <Form.Item name="number"
                                                   initialValue={!client && next_client_number}
                                                   rules={[{
                                                       required: true,
                                                       message: "Please input your number",
                                                   }]}>
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Company">
                                        <Form.Item name="company"
                                                   rules={[{
                                                       required: true,
                                                       message: "Please input your company",
                                                   }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Address">
                                        <Form.Item name="address"
                                                   rules={[{
                                                       required: true,
                                                       message: "Please input your address",
                                                   }]}>
                                            <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                                        </Form.Item>
                                    </InputWrap>
                                </div>

                                <div className={classes.bigBlock}>
                                    <InputWrap title="Phone*">
                                        <Form.Item name="phone" rules={[{
                                            required: true,
                                            message: "Please input your phone number",
                                        }]}>
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Full name*">
                                        <Form.Item name="full_name"
                                                   rules={[{
                                                       required: true,
                                                       message: "Please input your name",
                                                   }]}>
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Email*">
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
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap>
                                        <Form.Item name="is_active">
                                            <Checkbox checked={isChecked} onChange={onChecked}>Active</Checkbox>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Emergency Name">
                                        <Form.Item name="alternative_name">
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Emergency Email">
                                        <Form.Item name="alternative_email"
                                                   rules={[
                                                       {
                                                           type: "email",
                                                           message: "The input is not valid E-mail!",
                                                       }]}>
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>

                                    <InputWrap title="Emergency Phone">
                                        <Form.Item name="alternative_phone">
                                            <Input/>
                                        </Form.Item>
                                    </InputWrap>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </Preloader>
    );
};

export default AddClientForm;