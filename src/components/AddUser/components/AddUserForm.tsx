import React from "react";
import clsx from "clsx";
import {Form, Input, Typography} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import AccessBlock from "./AccessBlock";
import InputWrap from "../../InputWrap";
import SitesAlert from "../../Alerts/sites";
import HeaderFormAddUser from "./HeaderForm";

import {useCurrentSelection} from "../../../hooks/useCurrentSelection";
import {selectSitesState} from "../../../store/selectors";

import classes from "../AddUser.module.scss";
import {SiteAccess} from "../../../store/branches/sites/stateTypes";

const {Title} = Typography;


interface AddUserFormProps {
    onSubmit?: (values: any) => void
    onCancel?: () => void
    onSaveHasAccess?: (id: number, has_access: boolean) => void
    onSavePermission?: (id: number, permission: SiteAccess["permission"]) => void
    locationAccess?: SiteAccess[]
    form?: any
}

const AddUserForm: React.FC<AddUserFormProps> = ({
                                                     onSubmit,
                                                     onCancel,
                                                     form,
                                                     locationAccess = [],
                                                     onSaveHasAccess,
                                                     onSavePermission,
                                                 }) => {
    const {client} = useCurrentSelection();
    const {current_location: currentLocation} = useSelector(selectSitesState);

    return (
        <div className={clsx("header-link", classes.addUserWrap)}>
            <SitesAlert/>
            <Form name="addUser"
                  form={form}
                  initialValues={{remember: true}}
                  onFinish={onSubmit}
            >

                <Title level={5}> <Link to="/sites">{client?.company}/</Link> {currentLocation?.title || "Site"}</Title>

                <HeaderFormAddUser onCancel={onCancel}/>

                <div className={classes.addUserInputsWrap}>
                    <div className={classes.container}>
                        <div className={classes.groupInputs}>
                            <div className={classes.blockWrap}>

                                <InputWrap title="Full name*">
                                    <Form.Item name="full_name"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your full name",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Email Address*">
                                    <Form.Item name="email"
                                               rules={[{
                                                   type: "email",
                                                   required: true,
                                                   message: "The input is not valid E-mail!",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>


                                <InputWrap title="Company*">
                                    <Form.Item name="company"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your company!",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Phone*">
                                    <Form.Item name="phone"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your phone!",
                                               }]}>
                                        <Input/>
                                    </Form.Item>
                                </InputWrap>

                                <InputWrap title="Address*">
                                    <Form.Item name="address"
                                               rules={[{
                                                   required: true,
                                                   message: "Please input your address!",
                                               }]}>
                                        <TextArea autoSize={{minRows: 6, maxRows: 6}}/>
                                    </Form.Item>
                                </InputWrap>
                            </div>

                            <div className={classes.siteAccessWrap}>
                                <div className={classes.titleBlock}>
                                    <span className={classes.title}>Site Access</span>
                                </div>
                                <div className={"d-flex"}>
                                    <div className={classes.subTitle}>
                                        <span>Site</span>
                                    </div>

                                    <div className={classes.subTitle}>
                                        <span>Has Access</span>
                                    </div>

                                    <div className={classes.subTitle}>
                                        <span className={classes.subTitle}>Permissions</span>
                                    </div>
                                </div>

                                {locationAccess?.map((item, index) => (
                                    <AccessBlock onSavePermission={onSavePermission}
                                                 onSaveHasAccess={onSaveHasAccess}
                                                 key={item.id + index + item.site}
                                                 locationAccess={item}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default AddUserForm;