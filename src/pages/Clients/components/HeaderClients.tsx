import React from "react"
import {Typography} from "antd"
import clsx from "clsx"
import {useHistory} from "react-router-dom"
import {CustomButton} from "../../../components/Button"
import { ADD_CLIENT } from "../../../components/PrivateRoute/components/constants"

const {Title} = Typography

const HeaderClients: React.FC = () => {
    const history = useHistory()

    const onAddClient = () => {
        history.push(ADD_CLIENT)
    }
    return (
        <div className="block-title">
            <div className={clsx("header-link")}>
                <div className={clsx("d-flex", "d-flex-w")}>
                    <div>
                        <Title className="title-fs-24" level={2}>Clients</Title>
                    </div>
                    <div>
                        <CustomButton width="71px"
                                      height="36px"
                                      padding="0"
                                      htmlType="button"
                                      onClick={onAddClient}
                        >
                            <span>+ ADD</span>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderClients
