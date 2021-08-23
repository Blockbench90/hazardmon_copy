import React, {useEffect, useLayoutEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {userAC} from "./store/branches/user/actionCreators";
import PrivateRoute from "./components/PrivateRoute";
import {WinStorage} from "./services/AuthSrorage";

const App: React.FC = () => {
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const dispatch = useDispatch();
    const token = WinStorage.getToken();

    useLayoutEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1000) {
            setIsTablet(true);
        }
    }, [setIsTablet]);

    useEffect(() => {
        if (token) {
            dispatch(userAC.fetchUserData());
        }
    }, [dispatch, token]);


    return <PrivateRoute isTablet={isTablet}/>;
};

export default App;
