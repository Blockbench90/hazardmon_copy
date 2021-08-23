import React from "react";
import {useSelector} from "react-redux";

import {ReactComponent as Ava} from "../../assets/icons/avatar.svg";
import {selectUserState} from "../../store/selectors";

import classes from "./Avatar.module.scss";


const Avatar: React.FC = () => {
    const {userData} = useSelector(selectUserState);

    const getInitials = (name: string) => {
        if (name) {
            const names = name.split(" ");
            let initials = names[0].substring(0, 1).toUpperCase();

            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }
            return initials;
        }
        return null;

    };
    const name = `${userData?.first_name} ${userData?.last_name}`;
    const letters = getInitials(name);

    return (
        <React.Fragment>
            {
                letters ?
                    <div className={classes.avatar}>
                        {letters}
                    </div>
                    :
                    <Ava/>
            }
        </React.Fragment>
    );
};

export default Avatar;