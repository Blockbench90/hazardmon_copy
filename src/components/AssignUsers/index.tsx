import React from "react"
import clsx from "clsx"
import {Link} from "react-router-dom"

import AssignUsersTable from "../AssignUsersTable"
import {AssignUser} from "../../store/branches/sites/stateTypes"

import classes from "./AssignUsers.module.scss"

const AssignUsers: React.FC<{users: AssignUser[]}> = ({users}) => {
    return (
        <div className={classes.wrap}>
            <div className={clsx("d-flex", classes.head)}>
                <div>Assign users</div>
                <div className={classes.addUser}>
                    <Link to="/sites/add/user">
                        <span>Add User +</span>
                    </Link>
                </div>
            </div>
            <div className={classes.table}>
                <AssignUsersTable users={users}/>
            </div>

        </div>
    )
}
export default AssignUsers
