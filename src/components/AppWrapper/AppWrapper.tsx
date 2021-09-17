import * as React from "react";
import {connect} from "react-redux";

import * as authConstants from "../../constants/actions/authConstants";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

import "./AppWrapper.css";

export interface AppWrapperProps {
    getCurrentUser: () => void,
    getLayoutSettings: () => void,
    currentUser: any,
    currentUserHasError: boolean,
    currentUserLoading: boolean,
    layoutSettings?: any,
    children?: any,
}

class AppWrapper extends React.Component<AppWrapperProps> {
    public componentDidMount() {
        const {getCurrentUser, getLayoutSettings} = this.props;
        getCurrentUser();
        getLayoutSettings();
    }

    public render() {
        const {currentUser, children, currentUserHasError, currentUserLoading} = this.props;

        return (
            <React.Fragment>
                {
                    currentUser
                    &&
                    (
                        <div id="modalWrapper">
                            {children}
                        </div>
                        ||
                        <div>
                            {currentUserHasError && "Server connection problem"}
                            {currentUserLoading && <LoadingComponent/>}
                        </div>
                    )
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.authReducer.currentUser,
    currentUserHasError: state.authReducer.currentUserHasError,
    currentUserLoading: state.authReducer.currentUserLoading,
    isFullScreen: state.schemasReducer.isFullScreen,
    layoutSettings: state.authReducer.layoutSettings,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCurrentUser: () => {
            dispatch({type: authConstants.GET_CURRENT_USER});
        },
        getLayoutSettings: () => {
            dispatch({type: authConstants.GET_LAYOUT_SETTINGS});
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);