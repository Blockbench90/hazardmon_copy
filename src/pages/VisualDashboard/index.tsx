import React from "react";
import clsx from "clsx";
import HeaderVisualDashboard from "./components/HeaderVisualDashaboard";

import classes from "./VisualDashboard.module.scss";
import {Route, Switch} from "react-router-dom";
import urls from "../../constants/urls";
import SchemasList from "../../containers/SchemasList/SchemasList";
import Editor from "../../containers/Editor/Editor";
import SchemaDetails from "../../containers/SchemaDetails/SchemaDetails";
import MachineDetails from "../../containers/MachineDetails/MachineDetails";
import AppWrapper from "../../components/AppWrapper/AppWrapper";

const DashboardRoute = (props: any) => {
    const Component = props.component;
    const render = (matchProps: any) => (
        <Component {...matchProps} />
    );

    return (
        <Route
            {...props}
            component={undefined}
            render={render}
        />
    );
};

const VisualDashboard: React.FC = () => {

    return (
        <div className={clsx("header-link", classes.wrap)}>
            <HeaderVisualDashboard/>

            <AppWrapper>
                <Switch>
                    <DashboardRoute path={urls.schemasList} component={SchemasList} exact={true}/>
                    <DashboardRoute path={urls.newSchema} component={Editor} />
                    <DashboardRoute path={urls.schemaDetails} component={SchemaDetails} exact={true} />
                    <DashboardRoute path={urls.tabNew} component={Editor} />
                    <DashboardRoute path={urls.tabEdit} component={Editor} />
                    <DashboardRoute path={urls.machineDetails} component={MachineDetails} />
                </Switch>
            </AppWrapper>
        </div>
    );
};

export default VisualDashboard;
