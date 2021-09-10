import * as React from "react";
import * as Modal from "react-modal";
import {Provider} from "react-redux";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

import AppWrapper from "./components/AppWrapper/AppWrapper";

// utils
import history from "./history";
import rootSaga from "./sagas/index";
import urls from "./urls";

// containers
import Editor from "./containers/Editor/Editor";
import Home from "./containers/Home/Home";
import MachineDetails from "./containers/MachineDetails/MachineDetails";
import SchemaDetails from "./containers/SchemaDetails/SchemaDetails";
import SchemasList from "./containers/SchemasList/SchemasList";

import rootReducer from "./reducers/index";

// styles
import "react-toastify/dist/ReactToastify.css";
import "./styles/general-styles.css";


const sagaMiddleware = createSagaMiddleware();

const projectStore = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

// @ts-ignore
Modal.setAppElement("#root");

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

const Visual = () => {
    return (
        <Provider store={projectStore}>
            <AppWrapper>
                <Router history={history}>
                    <Switch>
                        <Redirect from="/" to={urls.home} exact={true}/>
                        <DashboardRoute path={urls.home} component={Home} exact={true}/>
                        <DashboardRoute path={urls.schemasList} component={SchemasList} exact={true}/>
                        <DashboardRoute path={urls.newSchema} component={Editor}/>
                        <DashboardRoute path={urls.schemaDetails} component={SchemaDetails} exact={true}/>
                        <DashboardRoute path={urls.tabNew} component={Editor}/>
                        <DashboardRoute path={urls.tabEdit} component={Editor}/>
                        <DashboardRoute path={urls.machineDetails} component={MachineDetails}/>
                    </Switch>
                </Router>
                <ToastContainer/>
            </AppWrapper>
        </Provider>
    );
};
export default Visual;