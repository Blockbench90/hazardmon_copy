import React from "react";
import {Form, Input, Select} from "antd";
import TextArea from "antd/lib/input/TextArea";
import InputWrap from "../../InputWrap";
import {CustomButton} from "../../Button";

import classes from "../../EditSiteInputs/EditSiteInputs.module.scss";

const {Option} = Select;

interface AddSiteProps {
    form: any
    onSubmit: (values: any) => void
    timezones: string[]
    onCancel: () => void
}

const AddSiteForm: React.FC<AddSiteProps> = ({form, onSubmit, timezones, onCancel}) => {

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
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please input your title",
                                               },
                                               {
                                                   message: "Ensure this field has no more than 255 characters",
                                                   max: 255,
                                               }]}
                                >
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Address*">
                                <Form.Item name="address"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please input your address",
                                               },
                                               {
                                                   message: "Ensure this field has no more than 255 characters",
                                                   max: 255,
                                               }]}>
                                    <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                                </Form.Item>
                            </InputWrap>
                        </div>

                        <div className={classes.blockWrap}>
                            <InputWrap title="Timezone*">
                                <Form.Item name="timezone"
                                           rules={[{
                                               required: true,
                                               message: "Please select your timezone!",
                                           }]}>
                                    <Select
                                        showSearch
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

                            <InputWrap title="Full name">
                                <Form.Item name="full_name">
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Mobile">
                                <Form.Item name="mobile">
                                    <Input/>
                                </Form.Item>
                            </InputWrap>

                            <InputWrap title="Email">
                                <Form.Item name="email">
                                    <Input/>
                                </Form.Item>
                            </InputWrap>
                        </div>

                    </div>
                </div>

                <div className={classes.button}>
                    <Form.Item>
                        <CustomButton width="123px"
                                      height="40px"
                                      padding="2px 2px"
                                      fontSize="13px"
                                      htmlType="submit"
                                      className="mar-right-10"
                        >
                            SAVE
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
            </Form>
        </div>
    );
};
export default AddSiteForm;
