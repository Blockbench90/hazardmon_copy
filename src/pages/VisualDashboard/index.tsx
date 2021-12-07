// @ts-nocheck
import React, { useEffect } from "react";
import clsx from "clsx";
import {Route, Switch} from "react-router-dom";

import urls from "../../constants/urls";
import SchemasList from "../../containers/SchemasList/SchemasList";
import Editor from "../../containers/Editor/Editor";
import SchemaDetails from "../../containers/SchemaDetails/SchemaDetails";
import MachineDetails from "../../containers/MachineDetails/MachineDetails";
import AppWrapper from "../../components/AppWrapper/AppWrapper";
import HeaderVisualDashboard from "./components/HeaderVisualDashaboard";

import classes from "./VisualDashboard.module.scss";
import { useDispatch } from "react-redux";
import * as authConstants from "../../constants/actions/authConstants";

const VisualDashboard: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: authConstants.GET_LAYOUT_SETTINGS});
    }, [dispatch])

    return (
        <div className={clsx("header-link", classes.wrap)}>
            <HeaderVisualDashboard/>

            <AppWrapper>
                <Switch>
                    <Route path={urls.schemasList} component={SchemasList} exact={true}/>
                    <Route path={urls.newSchema} component={Editor}/>
                    <Route path={urls.schemaDetails} component={SchemaDetails} exact={true}/>
                    <Route path={urls.tabNew} component={Editor}/>
                    <Route path={urls.tabEdit} component={Editor}/>
                    <Route path={urls.machineDetails} component={MachineDetails} exact/>
                </Switch>
            </AppWrapper>
        </div>
    );
};

export default VisualDashboard;
