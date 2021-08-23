import React, {useState} from "react";
import clsx from "clsx";
import {Dropdown, Menu, Modal} from "antd";
import {useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {DownOutlined, SettingFilled, ToolFilled} from "@ant-design/icons";

import {EDIT_SENSORS_NAMES, EDIT_SENSORS_TYPES, EDIT_WARNINGS} from "../PrivateRoute/components/constants";
import {ReactComponent as Key} from "../../assets/icons/key_setting.svg";
import {CustomButton} from "../Button";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import { selectSensorsState } from "../../store/selectors";

import classes from "./SettingPopup.module.scss";

const SettingPopup: React.FC = () => {
    const [modal, setModal] = useState(false);
    const history = useHistory();

    const {warnings} = useSelector(selectSensorsState);
    const {device} = useCurrentSelection();

    const setVisible = () => {
        setModal(true);
    };

    const onCancel = () => {
        setModal(false);
    };

    const onAddWarning = () => {
        history.push(EDIT_WARNINGS);
    };

    const title = (
        <div>
            <Key/><span className={classes.modalTitle}>Warnings</span>
        </div>
    );

    const menu = (
        <Menu>
            <Menu.Item key="0" icon={<ToolFilled/>} onClick={setVisible}>
                <span>Warnings</span>
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>

            <Menu.Item key="1" icon={<ToolFilled/>}>
                <Link to={EDIT_SENSORS_NAMES}>Sensor Names</Link>
            </Menu.Item>
            <Menu.Divider className={classes.driver}/>

            {
                ["0005", "0006"].includes(device?.device_type)
                &&
                <Menu.Item key="2" icon={<ToolFilled/>}>
                    <Link to={EDIT_SENSORS_TYPES}>Sensor Settings</Link>
                </Menu.Item>
            }
        </Menu>
    );

    const warningsList = (warnings && warnings?.map((item: any, index: number) => (
            <div key={`warning_sensor_${item.id}${index}}`} className={classes.mapShortNames}>
                <div className={classes.mapName}>
                    {item?.name}
                </div>
                <div className={classes.mapSign}>
                    <div>
                        {item?.sign}
                    </div>
                    <div>
                        {item?.value}
                    </div>
                </div>
            </div>
        ))
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
            <Modal
                wrapClassName={classes.modalWrap}
                footer={null}
                title={title}
                centered
                visible={modal}
                onCancel={() => onCancel()}
            >
                <div className={classes.modalSubTitleWrap}>
                    <span className={classes.modalSubTitle}>{device && (device?.title || "Device")}</span>
                </div>
                <div className={classes.modalDescriptionWrap}>
                    <span className={classes.modalDescription}>
                        {
                            warnings?.length > 0
                                ?
                                <div>
                                    <div style={{marginBottom: "10px"}}>
                                        <span>There are {warnings?.length} warnings for this device:</span>
                                    </div>
                                    {warningsList}
                                </div>
                                :
                                "There are no warnings for this device"
                        }
                    </span>
                </div>
                <div className={classes.modalButton}>
                    <CustomButton width="70px"
                                  height="40px"
                                  padding="0"
                                  htmlType="button"
                                  onClick={onAddWarning}
                    >
                        { warnings?.length > 0 ? "MODIFY" : "ADD"}
                    </CustomButton>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default SettingPopup;
