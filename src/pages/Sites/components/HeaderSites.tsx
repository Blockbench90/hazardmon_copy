import React from "react";
import {Typography} from "antd";
import { useCurrentSelection } from "../../../hooks/useCurrentSelection";

const {Title} = Typography;

const HeaderSites: React.FC = () => {
    const { client } = useCurrentSelection()

    return (
        <React.Fragment>
            <div className="block-title">
                <Title level={5}>{client?.company || 'Client'}</Title>
                <Title level={2} className="title-fs-24">{client?.company || 'Client'} - Sites</Title>
            </div>
        </React.Fragment>
    )
}

export default HeaderSites
