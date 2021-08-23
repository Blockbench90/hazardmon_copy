import React from "react"
import clsx from "clsx"
import {Typography} from "antd"
import { useCurrentSelection } from "../../../hooks/useCurrentSelection";

const {Title} = Typography

const HeaderFormAddSite: React.FC = () => {
    const { client } = useCurrentSelection()

    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>{ client?.company || 'Client'} - Add Site</Title>
            </div>
        </div>
    )
}

export default HeaderFormAddSite
