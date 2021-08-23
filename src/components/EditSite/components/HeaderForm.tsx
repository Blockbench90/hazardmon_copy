import React from "react"
import clsx from "clsx"
import {Typography} from "antd"
import {CustomButton} from "../../Button"
import {DeleteFilled} from "@ant-design/icons"
import {Site} from "../../../store/branches/sites/stateTypes"

const {Title} = Typography

interface HeaderFormProps {
    onDeactivateSite: () => void
    onRemoveSite: () => void
    is_suspended: boolean
    currentLocation: Site
}

const HeaderFormEditSite: React.FC<HeaderFormProps> = ({
   onDeactivateSite,
   onRemoveSite,
   is_suspended = false,
   currentLocation,
}) => {
    return (
        <div className={clsx("d-flex", "d-flex-w")}>
            <div>
                <Title level={2}>{currentLocation?.title} - Edit Site</Title>
            </div>
            <div>
                <CustomButton width="170px"
                              height="40px"
                              padding="0"
                              color="gray"
                              htmlType="button"
                              onClick={onDeactivateSite}
                              className="mar-right-10">
                    {is_suspended ? <span>REACTIVATE SITE</span> : <span>DEACTIVATE SITE</span>}

                </CustomButton>
                <CustomButton width="170px"
                              height="40px"
                              padding="0"
                              htmlType="button"
                              onClick={onRemoveSite}
                              color="red">
                    <DeleteFilled className="mar-right-5"/>
                    <span>REMOVE SITE</span>
                </CustomButton>
            </div>
        </div>
    )
}

export default HeaderFormEditSite
