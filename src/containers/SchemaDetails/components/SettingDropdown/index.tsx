import React from "react";
import clsx from "clsx";
import {Dropdown, Menu} from "antd";
import {Link} from "react-router-dom";
import {DownOutlined, SettingFilled, ToolFilled} from "@ant-design/icons";


import classes from "./SettingPopup.module.scss";
import { EDIT_SENSORS_NAMES, EDIT_SENSORS_TYPES } from "../../../../components/PrivateRoute/components/constants";
import urls from "../../../../constants/urls";

interface SettingDropdown {
    currentLocation?: string
    schemaDetails?: any
    modifyLink?: string
}

const SettingDropdown: React.FC<SettingDropdown> = ({
                                                        currentLocation,
                                                        schemaDetails,
                                                        modifyLink,

                                                    }) => {


    const menu = (
        <Menu>
            <Menu.Item key="0" icon={<ToolFilled/>}>
                    <Link to={urls.schemasList.replace(':siteId', `${currentLocation}`)}>Show versions</Link>
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>

            <Menu.Item key="1" icon={<ToolFilled/>}>
                    {schemaDetails && !schemaDetails.is_published && <Link to={modifyLink}>Modify schema</Link>}
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>
            <Menu.Item key="2" icon={<ToolFilled/>}>
                    {/*{schemaDetails && !schemaDetails.is_published && <button onClick={this.modalRef && this.modalRef.showModal}>Delete schema</button>}*/}
            </Menu.Item>
            <Menu.Item key="3" icon={<ToolFilled/>}>
                    {schemaDetails && !schemaDetails.is_published && <Link to={urls.tabNew.replace(':siteId', `${currentLocation}`).replace(':schemaId', `${schemaDetails && schemaDetails.id}`)}>Add tab</Link>}
            </Menu.Item>
        </Menu>
    );

    return (
        <React.Fragment>
            <div>
                <SettingFilled className="mar-right-10"/>

                <Dropdown overlay={menu}
                          trigger={["click"]}
                          placement="bottomLeft"
                          overlayClassName={classes.dropdown}>
                    <span className={clsx("ant-dropdown-link", classes.menuTitle)}
                          onClick={e => e.preventDefault()}
                    >
                        Setting <DownOutlined/>
                    </span>
                </Dropdown>
            </div>
        </React.Fragment>
    );
};

export default SettingDropdown;
