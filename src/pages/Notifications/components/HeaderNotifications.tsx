import React from "react";
import {Typography} from "antd";
import {Link} from "react-router-dom";
import {useCurrentSelection} from "../../../hooks/useCurrentSelection";

const {Title} = Typography;

const HeaderNotifications: React.FC = () => {
    const {client} = useCurrentSelection();

    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}>
                    <Link to="/sites">{client?.company || "Client"}</Link>
                </Title>
                <Title level={2} className="title-fs-24">Notifications</Title>
            </div>
        </React.Fragment>
    );
};

export default HeaderNotifications;
