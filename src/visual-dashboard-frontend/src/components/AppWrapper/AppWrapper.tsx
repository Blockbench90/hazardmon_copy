import * as React from 'react';
import Fullscreen from 'react-full-screen';
import {connect} from 'react-redux';

// styles
import './AppWrapper.scss';

// icons
import {FaCaretDown, FaCog, FaCommentAlt, FaPowerOff} from 'react-icons/fa';
import {IoIosMail} from 'react-icons/io';

// action constants
import * as authConstants from '../../constants/actions/authConstants';

// images
import banner from '../../assets/img/banner.jpg';
import logo from '../../assets/img/logo.png';

import dashboard from '../../assets/img/dashboard.png';
import notifications from '../../assets/img/notifications.png';
import sites from '../../assets/img/sites.png';
import users from '../../assets/img/users.png';
import visualDashboard from '../../assets/img/visual-dashboard.png';
import * as schemasConstants from '../../constants/actions/schemasConstants';

// components
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import SimpleDropdown from '../SimpleDropdown/SimpleDropdown';

export interface AppWrapperProps {
    getCurrentUser: () => void,
    getLayoutSettings: () => void,
    currentUser: any,
    currentUserHasError: boolean,
    currentUserLoading: boolean,
    logout: () => void,
    layoutSettings?: any,
    isFullScreen: boolean,
    toggleFullScreen: (isFullScreen: boolean) => void
}

class AppWrapper extends React.Component<AppWrapperProps> {
    public componentDidMount() {
        const { getCurrentUser, getLayoutSettings } = this.props;
        getCurrentUser();
        getLayoutSettings();
    }

    public render() {
        const {currentUser, children, currentUserHasError, logout, layoutSettings, isFullScreen, toggleFullScreen, currentUserLoading} = this.props;

        const showSuperUserLinks = currentUser && (currentUser.is_oem || currentUser.is_superuser);

        return (
            <React.Fragment>
                <header className="header base navbar-inner">
                    <div className="container">
                        <div className="nav-urls">
                            <a href="/" className="logo-img"><img src={layoutSettings.logo ? layoutSettings.logo.replace(/\?(.*)/, '') : logo } alt="Logo" /></a>
                            {showSuperUserLinks &&
                            <>
                                <a href="/accounts/clients/" className="nav-url">Clients</a>
                                <a href="/oem/homepage/edit/" className="nav-url">Modify Homepage</a>
                                <a href="/oem/settings/" className="nav-url">Settings</a>
                            </>
                            }
                        </div>
                        <div className="nav-urls">
                            <SimpleDropdown
                                trigger={
                                    <span className="nav-url">
                                        Contact Us
                                        <FaCaretDown/>
                                    </span>
                                }
                            >
                                <div className="dropdown-value">
                                    <a href="/contact-support/">
                                        <IoIosMail size={17} />
                                        Contact Support
                                    </a>
                                    <a href="/feedback/">
                                        <FaCommentAlt/>
                                        Send Feedback
                                    </a>
                                </div>
                            </SimpleDropdown>
                            {currentUser &&
                            <SimpleDropdown
                                trigger={
                                    <span className="nav-url">
                                        {`${currentUser.first_name} ${currentUser.last_name}`} ({currentUser.company})
                                        <FaCaretDown/>
                                    </span>
                                }
                            >
                                <div className="dropdown-value">
                                    <a href="/accounts/profile/settings/">
                                        <FaCog/>
                                        User Profile Settings
                                    </a>
                                    <button onClick={logout}>
                                        <FaPowerOff/>
                                        Logout
                                    </button>
                                </div>
                            </SimpleDropdown>
                            }
                        </div>
                    </div>
                </header>
                <div className="banner-container top-block">
                    <div className="container">
                        <ul className="top-menu">
                            <li className="menu-link active">
                                <a href="/visual-dashboard/">
                                    <img src={visualDashboard} alt="Visual Dashboard" />
                                    <div>Visual Dashboard</div>
                                </a>
                            </li>
                            <li className="menu-link">
                                <a href="/devices/">
                                    <img src={dashboard} alt="Devices" />
                                    <div>Devices</div>
                                </a>
                            </li>
                            <li className="menu-link">
                                <a href="/devices/notifications/">
                                    <img src={notifications} alt="Notifications" />
                                    <div>Notifications</div>
                                </a>
                            </li>
                            <li className="menu-link">
                                <a href="/accounts/sites/">
                                    <img src={sites} alt="Sites" />
                                    <div>Sites</div>
                                </a>
                            </li>
                            {(currentUser && (currentUser.is_manager || currentUser.is_accounts_management)) && <li className="menu-link">
                                <a href="/accounts/users/">
                                    <img src={users} alt="Users" />
                                    <div>Users</div>
                                </a>
                            </li>}
                        </ul>
                        <img src={layoutSettings.banner ? layoutSettings.banner.replace(/\?(.*)/, '') : banner } alt="banner" className="banner" />
                    </div>
                </div>
                <Fullscreen
                    enabled={isFullScreen}
                    onChange={toggleFullScreen}
                >
                    {(currentUser &&
                    <div id="modalWrapper">
                        {children}
                    </div>)
                    || (<div>
                        {currentUserHasError && 'Server connection problem'}
                        {currentUserLoading && <LoadingComponent/>}
                    </div>)}
                </Fullscreen>
                <div id="footer">
                    <div className="container">
                        <div className="muted">© 2019 Hazardmon.com<sup>®</sup></div>
                        {layoutSettings.flatPages &&
                        <ul className="footer-links">
                            {layoutSettings.flatPages.map((flatPage: any) =>
                                <li key={flatPage.id}><a href={flatPage.url}>{flatPage.title}</a></li>
                            )}
                        </ul>
                        }
                    </div>
                </div>
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
        logout: () => {
            dispatch({type: authConstants.LOGOUT});
        },
        toggleFullScreen: (payload: boolean) => {
            dispatch({type: schemasConstants.TOGGLE_FULL_SCREEN, payload});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);