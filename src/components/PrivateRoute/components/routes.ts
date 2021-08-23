import Clients from "../../../pages/Clients"
import Sites from "../../../pages/Sites"
import EditSite from "../../EditSite"
import Devices from "../../../pages/Devices"
import SensorDashboard from "../../../pages/SensorDashboard"
import SensorGraphsPage from "../../../pages/SensorGraphs"
import Notifications from "../../../pages/Notifications"
import Analytics from "../../../pages/Analytics"
import VisualDashboard from "../../../pages/VisualDashboard"
import {
    ADD_CLIENT,
    ADD_DEVICE, ADD_SITE,
    ADD_USER,
    ANALYTICS,
    CLIENTS,
    CURRENT_DEVICES, CUSTOM_HISTORICAL_GRAPHS,
    DEVICES, EDIT_CLIENT,
    EDIT_DEVICE, EDIT_SENSORS_NAMES, EDIT_SENSORS_TYPES,
    EDIT_SITES, EDIT_WARNINGS, EMAIL_ADD_NOTIFICATIONS, EMAIL_NOTIFICATIONS, HISTORICAL,
    NOTIFICATIONS,
    SENSOR_DASHBOARD,
    SENSOR_GRAPHS,
    SITES,
    USER_SETTING,
    VISUAL_DASHBOARD,
} from "./constants";
import AddUser from "../../AddUser"
import UserSetting from "../../UserSetting"
import AddDevice from "../../AddDevice"
import EditDevice from "../../EditDevice"
import EditSensorsNames from "../../EditSensorNames"
import EditWarnings from "../../EditWarnings"
import EditSensorsSettings from "../../EditSensorSettings"
import Historical from "../../Historical"
import AddClient from "../../AddClient"
import CustomHistoricalGraphs from "../../CustomHistoricalGraphs"
import AddSite from "../../AddSite"
import EmailNotifications from "../../EmailNotifications";
import AddEmailNotificationForm from "../../AddEmailNotification/AddEmailNotificationForm";


export const privateRoutes = [
    {
        path: CLIENTS,
        Component: Clients
    },
    {
        path: ADD_CLIENT,
        Component: AddClient
    },
    {
        path: EDIT_CLIENT,
        Component: AddClient
    },
    {
        path: SITES,
        Component: Sites
    },
    {
        path: ADD_SITE,
        Component: AddSite
    },
    {
        path: EDIT_SITES,
        Component: EditSite
    },
    {
        path: EDIT_WARNINGS,
        Component: EditWarnings
    },
    {
        path: HISTORICAL,
        Component: Historical
    },
    {
        path: EDIT_SENSORS_NAMES,
        Component: EditSensorsNames
    },
    {
        path: EDIT_SENSORS_TYPES,
        Component: EditSensorsSettings
    },
    {
        path: ADD_USER,
        Component: AddUser
    },
    {
        path: USER_SETTING,
        Component: UserSetting
    },
    {
        path: EMAIL_NOTIFICATIONS,
        Component: EmailNotifications
    },
    {
        path: EMAIL_ADD_NOTIFICATIONS,
        Component: AddEmailNotificationForm
    },
    {
        path: [DEVICES, CURRENT_DEVICES],
        Component: Devices
    },
    {
        path: ADD_DEVICE,
        Component: AddDevice
    },
    {
        path: EDIT_DEVICE,
        Component: EditDevice
    },
    {
        path: SENSOR_DASHBOARD,
        Component: SensorDashboard
    },
    {
        path: SENSOR_GRAPHS,
        Component: SensorGraphsPage
    },
    {
        path: CUSTOM_HISTORICAL_GRAPHS,
        Component: CustomHistoricalGraphs
    },
    {
        path: NOTIFICATIONS,
        Component: Notifications
    }
]

export const adminRoutes = [
    {
        path: ANALYTICS,
        Component: Analytics
    },
    {
        path: VISUAL_DASHBOARD,
        Component: VisualDashboard
    }
]