import Clients from "../../../pages/Clients";
import Sites from "../../../pages/Sites";
import EditSite from "../../EditSite";
import Devices from "../../../pages/Devices";
import SensorDashboard from "../../../pages/SensorDashboard";
import SensorGraphsPage from "../../../pages/SensorGraphs";
import Notifications from "../../../pages/Notifications";
import Analytics from "../../../pages/Analytics";
import VisualDashboard from "../../../pages/VisualDashboard";
import {
    ADD_CLIENT,
    ADD_DEVICE,
    ADD_EMAIL_NOTIFICATIONS,
    ADD_SITE,
    ADD_USER,
    ANALYTICS,
    CLIENTS,
    CURRENT_DEVICES,
    CUSTOM_HISTORICAL_GRAPHS,
    DEVICES,
    EDIT_CLIENT,
    EDIT_DEVICE,
    EDIT_EMAIL_NOTIFICATIONS,
    EDIT_SENSORS_NAMES,
    EDIT_SENSORS_TYPES,
    EDIT_SITES,
    EDIT_WARNINGS,
    EMAIL_NOTIFICATIONS,
    FEEDBACK,
    HISTORICAL,
    NOTIFICATIONS, OEM_PAGE_CSS,
    OEM_SETTING, OEM_SETTING_CONTACTS,
    OEM_SETTING_RSS_EDIT,
    SENSOR_DASHBOARD,
    SENSOR_GRAPHS,
    SITES,
    USER_SETTING,
    VISUAL_DASHBOARD,
} from "./constants";
import AddUser from "../../AddUser";
import UserSetting from "../../UserSetting";
import AddDevice from "../../AddDevice";
import EditDevice from "../../EditDevice";
import EditSensorsNames from "../../EditSensorNames";
import EditWarnings from "../../EditWarnings";
import EditSensorsSettings from "../../EditSensorSettings";
import Historical from "../../Historical";
import AddClient from "../../AddClient";
import CustomHistoricalGraphs from "../../CustomHistoricalGraphs";
import AddSite from "../../AddSite";
import EmailNotifications from "../../EmailNotificationsTable";
import AddEmailNotification from "../../AddEmailNotification";
import urls from "../../../constants/urls";
import SendFeedback from "../../SendFeedback";
import OEMSetting from "../../../pages/OEMSetting";
import RSSEdit from "../../../pages/OEMSetting/components/RSSEdit";
import SupportContacts from "../../../pages/OEMSetting/components/SupportContacts";
import CssPage from "../../../pages/OEMSetting/components/CssPage";


export const privateRoutes = [
    {
        path: CLIENTS,
        Component: Clients,
    },
    {
        path: ADD_CLIENT,
        Component: AddClient,
    },
    {
        path: EDIT_CLIENT,
        Component: AddClient,
    },
    {
        path: SITES,
        Component: Sites,
    },
    {
        path: ADD_SITE,
        Component: AddSite,
    },
    {
        path: EDIT_SITES,
        Component: EditSite,
    },
    {
        path: EDIT_WARNINGS,
        Component: EditWarnings,
    },
    {
        path: HISTORICAL,
        Component: Historical,
    },
    {
        path: EDIT_SENSORS_NAMES,
        Component: EditSensorsNames,
    },
    {
        path: EDIT_SENSORS_TYPES,
        Component: EditSensorsSettings,
    },
    {
        path: ADD_USER,
        Component: AddUser,
    },
    {
        path: USER_SETTING,
        Component: UserSetting,
    },
    {
        path: EMAIL_NOTIFICATIONS,
        Component: EmailNotifications,
    },
    {
        path: ADD_EMAIL_NOTIFICATIONS,
        Component: AddEmailNotification,
    },
    {
        path: EDIT_EMAIL_NOTIFICATIONS,
        Component: AddEmailNotification,
    },
    {
        path: [DEVICES, CURRENT_DEVICES],
        Component: Devices,
    },
    {
        path: ADD_DEVICE,
        Component: AddDevice,
    },
    {
        path: EDIT_DEVICE,
        Component: EditDevice,
    },
    {
        path: SENSOR_DASHBOARD,
        Component: SensorDashboard,
    },
    {
        path: SENSOR_GRAPHS,
        Component: SensorGraphsPage,
    },
    {
        path: CUSTOM_HISTORICAL_GRAPHS,
        Component: CustomHistoricalGraphs,
    },
    {
        path: NOTIFICATIONS,
        Component: Notifications,
    },
    {
        path: FEEDBACK,
        Component: SendFeedback,
    },
];


export const adminRoutes = [
    {
        path: ANALYTICS,
        Component: Analytics,
    },
    {
        path: VISUAL_DASHBOARD,
        Component: VisualDashboard,
    },
    {
        path: urls.newSchema,
        Component: VisualDashboard,
    },
    {
        path: urls.schemaDetails,
        Component: VisualDashboard,
    },
    {
        path: urls.tabNew,
        Component: VisualDashboard,
    },
    {
        path: urls.tabEdit,
        Component: VisualDashboard,
    },
    {
        path: urls.machineDetails,
        Component: VisualDashboard,
    },
    {
        path: OEM_SETTING,
        Component: OEMSetting,
    },
    {
        path: OEM_SETTING_RSS_EDIT,
        Component: RSSEdit,
    },
    {
        path: OEM_SETTING_CONTACTS,
        Component: SupportContacts,
    },
    {
        path: OEM_PAGE_CSS,
        Component: CssPage,
    },
];
