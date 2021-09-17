import classNames from "classnames";
import * as React from "react";
import {connect} from "react-redux";

// styles
import "./DashboardBase.css";

// action constants
import * as schemasConstants from "../../constants/actions/schemasConstants";

// components
// import Locations from "./components/Locations/Locations";

export interface DashboardBaseProps {
    sidebar?: any
    pageTitle?: any,
    className?: string,
    isFullScreen?: boolean,
    children?: any,
    isSchemaList?: boolean
    isDetails?: boolean
    isEditor?: boolean
    toggleFullScreen: (isFullScreen: boolean) => void,
}

export interface DashboardBaseState {
    sidebarHided: boolean
}

class DashboardBase extends React.Component<DashboardBaseProps, DashboardBaseState> {
    constructor(props: DashboardBaseProps) {
        super(props);

        this.state = {
            sidebarHided: props.isFullScreen,
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<DashboardBaseProps>, nextContext: any) {
        if (nextProps.isFullScreen !== this.props.isFullScreen) {
            this.setState({
                sidebarHided: nextProps.isFullScreen,
            });
        }
    }

    public render() {
        const {sidebar, children, className, isFullScreen, isSchemaList, pageTitle, isDetails, isEditor} = this.props;
        const {sidebarHided} = this.state;

        const wrapperClasses = classNames({
            "dashboard-base": true,
            "full-screen": isFullScreen,
            // 'main': true,
            [className]: true,
            "sidebar-hided": sidebarHided,
        });

        // const handleToggleSidebar = () => this.setState({sidebarHided: !sidebarHided});

        return (
            <div className={wrapperClasses}>
                <h1>
                    <div>
                        {pageTitle}
                    </div>
                </h1>
                <div className={classNames("main-wrapper", isSchemaList && "list-wrapper", isDetails && "details-wrapper")}>
                    {
                        !isDetails
                        &&
                        <aside id="sidebar" className={classNames(isEditor && "editor-types")}>
                            {/*{!isSchemaList*/}
                            {/*&&*/}
                            {/*<div className="extend-sidebar-button-container">*/}
                            {/*    <button onClick={handleToggleSidebar}*/}
                            {/*            className="extend-sidebar-button">{sidebarHided ? ">" : "<"}</button>*/}
                            {/*</div>}*/}

                            {!sidebarHided &&
                            <React.Fragment>
                                {/*{!isSchemaList && <Locations/>}*/}
                                {/*{!isEditor && <Locations/>}*/}
                                {sidebar}
                            </React.Fragment>
                            }
                        </aside>
                    }

                    <div className={classNames("content", isSchemaList && "list-content")}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isFullScreen: state.schemasReducer.isFullScreen,
});

const mapDispatchToProps = (dispatch: any) => {
    return ({
        toggleFullScreen: (payload: boolean) => {
            dispatch({type: schemasConstants.TOGGLE_FULL_SCREEN, payload});
        },
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBase);
