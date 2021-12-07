import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux";
import {Router} from "react-router-dom"

import {store} from "./store/store";
import App from "./App"

import "antd/dist/antd.css"
import "./styles/globals.scss"
import './styles/general-styles.scss';
import history from "./helpers/history"

ReactDOM.render(
// @ts-ignore
    <Router history={history}>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById("root")
)

