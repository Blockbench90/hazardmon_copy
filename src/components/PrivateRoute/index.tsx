import React, {useEffect} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {LoadingStatus} from "../../store/status";
import {userAC} from "../../store/branches/user/actionCreators";
import {WinStorage} from "../../services/AuthSrorage";
import {usePermissions} from "../../hooks/usePermissions";
import {selectUserState} from "../../store/selectors";

import {LandingPage} from "../../pages/LandingPage";
import LayoutComponent from "../Layout";
import Preloader from "../Preloader";
import {adminRoutes, privateRoutes} from "./components/routes";
import {LANDING_PAGE} from "./components/constants";
import SendFeedback from "../SendFeedback";


interface RouteProps {
    path: string | string[];
    Component: React.FC<any>;
}

const PrivateRoute: React.FC<{ isTablet: boolean }> = ({isTablet}) => {

    const location = useLocation();
    const dispatch = useDispatch();

    const token = WinStorage.getToken();
    const {auth_key} = useSelector(selectUserState);
    const {status} = useSelector(selectUserState);
    const isReady = status === LoadingStatus.LOADING;

    const {
        isSuperUser,
        isOEM,
    } = usePermissions();

    useEffect(() => {
        if (auth_key) {
            if (auth_key !== token) {
                dispatch(userAC.logOut());
            }
        }
    }, [location, auth_key, dispatch, token]);

    return (
        <Preloader isLoaded={isReady && !auth_key}>
            <React.Fragment>
                {token
                    ?
                    <Switch>
                        {auth_key && (
                            <LayoutComponent isTablet={isTablet}>
                                {location.pathname === "/" && <Redirect to="/sites"/>}

                                {privateRoutes.map(({path, Component}: RouteProps) =>
                                    <Route key={path + "private"} path={path} component={Component} exact/>,
                                )}

                                {(isSuperUser || isOEM) && adminRoutes.map(({path, Component}: RouteProps) =>
                                    <Route key={path + "admin"} path={path} component={Component} exact/>,
                                )}
                            </LayoutComponent>
                        )}
                    </Switch>
                    :
                    <React.Fragment>
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/feedback" component={SendFeedback}/>
                        <Redirect to={LANDING_PAGE}/>
                    </React.Fragment>}
            </React.Fragment>
        </Preloader>
    );
};
export default PrivateRoute;
