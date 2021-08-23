import React, {useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useForm} from "antd/lib/form/Form";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {AssignUser, CurrentLocation} from "../../store/branches/sites/stateTypes";
import {selectSitesState} from "../../store/selectors";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import {CustomButton} from "../Button";
import AssignUsers from "../AssignUsers";
import InputWrap from "../InputWrap";
import {randomInteger} from "../../helpers/getRandomNumber";

import classes from "./EditSiteInputs.module.scss";

const {Option} = Select;

const EditSiteInputs: React.FC = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const [users, setUsers] = useState<AssignUser[]>([]);
    const [currentLocation, setLocation] = useState<CurrentLocation>(null);

    const {assign_users, current_location, timezones} = useSelector(selectSitesState);

    const randomId = randomInteger(1, 1000);

    const onSubmit = (values: any) => {
        const data = {
            id: currentLocation?.id || randomId,
            title: values.title,
            address: values.address,
            full_name: values.full_name,
            email: values.email,
            mobile: values.mobile,
            timezone: values.timezone,
        };
        dispatch(sitesAC.updateCurrentLocation(data));
        form.resetFields();
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/sites");
    };

    useEffect(() => {
        if (assign_users) {
            setUsers(assign_users);
        }
        if (current_location) {
            setLocation(current_location);
        }
        form.setFieldsValue(currentLocation);

        return () => {
            form.resetFields();
        };
    }, [form, assign_users, current_location, currentLocation, dispatch]);

    return (
        <div className={classes.wrap}>
            <Form name="edit_site_inputs"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}>

                <div className={classes.container}>
                    <div className={classes.groupInputs}>

                        <div className={classes.blockWrap}>
                            <InputWrap title="Title*">
                                <Form.Item name="title"
                                           initialValue={currentLocation?.title}
                                           rules={[{
                                               required: true,
                                               message: "Please input your title",
                                           }]}>
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Address*">
                                <Form.Item name="address"
                                           initialValue={currentLocation?.address}
                                           rules={[{
                                               required: true,
                                               message: "Please input your address",
                                           }]}>
                                    <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                                </Form.Item>
                            </InputWrap>
                        </div>

                        <div className={classes.blockWrap}>
                            <InputWrap title="Timezone*">
                                <Form.Item name="timezone"
                                           initialValue={currentLocation?.timezone}
                                           rules={[{
                                               required: true,
                                               message: "Please select your timezone!",
                                           }]}>
                                    <Select
                                        showSearch
                                        value={currentLocation?.timezone}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {timezones?.map((item, index) => (
                                            <Option value={item} key={`${item}_time_${index}`}>{item}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Full name*">
                                <Form.Item name="full_name"
                                           initialValue={currentLocation?.full_name}
                                           rules={[{
                                               required: true,
                                               message: "Please input your full name",
                                           }]}>
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Mobile*">
                                <Form.Item name="mobile"
                                           initialValue={currentLocation?.mobile}
                                           rules={[{
                                               required: true,
                                               message: "Please input your mobile",
                                           }]}>
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Email*">
                                <Form.Item name="email"
                                           initialValue={currentLocation?.email}
                                           rules={[{
                                               type: "email",
                                               required: true,
                                               message: "The input is not valid E-mail!",
                                           }]}>
                                    <Input/>
                                </Form.Item>
                            </InputWrap>
                        </div>

                    </div>
                </div>

                <AssignUsers users={users}/>

                <div className={classes.button}>
                    <Form.Item>
                        <CustomButton width="94px"
                                      height="40px"
                                      padding="2px 2px"
                                      color="gray"
                                      fontSize="13px"
                                      htmlType="button"
                                      onClick={onCancel}
                                      className="mar-right-10"
                        >
                            <span>CANCEL</span>
                        </CustomButton>
                    </Form.Item>
                    <Form.Item>
                        <CustomButton width="123px"
                                      height="40px"
                                      padding="2px 2px"
                                      fontSize="13px"
                                      htmlType="submit"
                        >
                            SAVE CHANGES
                        </CustomButton>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
export default EditSiteInputs;
