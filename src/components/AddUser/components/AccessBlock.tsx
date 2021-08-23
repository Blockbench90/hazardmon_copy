import React from "react"
import {Checkbox, Form, Select} from "antd"
import clsx from "clsx"

import classes from "../AddUser.module.scss"
import { SiteAccess } from "../../../store/branches/sites/stateTypes"


interface AccessBlockProps {
    onSaveHasAccess?: (id: number, has_access: boolean) => void
    onSavePermission?: (id: number, permission: SiteAccess["permission"]) => void

    locationAccess: SiteAccess
}

const {Option} = Select

const AccessBlock: React.FC<AccessBlockProps> = ({
                                                     locationAccess,
                                                     onSavePermission,
                                                     onSaveHasAccess,
                                                 }) => {

    const onChangePermission = (permission: SiteAccess["permission"]) => {
        onSavePermission(locationAccess.id, permission)
    }
    const onChangeHaseAccess = (e: any) => {
        onSaveHasAccess(locationAccess.id, e.target.checked)
    }

    return (
        <div className={classes.accessBlock}>
            <div className={clsx(classes.description, classes.titleName)}>
                    <span className={classes.titleName}>
                        {locationAccess?.site}
                    </span>
            </div>

            <div className={classes.description}>
                <Form.Item name="has_access">
                    <Checkbox onChange={onChangeHaseAccess} checked={locationAccess?.has_access}/>
                </Form.Item>
            </div>

            <div className={classes.selectWrap}>
                <Select
                    value={locationAccess?.permission}
                    className={classes.select}
                    onChange={onChangePermission}>

                    <Option value="User">User</Option>
                    <Option value="Engineer">Engineer</Option>
                    <Option value="Manager">Manager</Option>
                </Select>
            </div>
        </div>
    )
}
export default AccessBlock