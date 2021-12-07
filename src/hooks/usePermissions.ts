import {useSelector} from "react-redux";
import {selectUserState} from "../store/selectors";

export const usePermissions = () => {
    const {userData: user} = useSelector(selectUserState);

    return {
        isSuperUser: user?.is_superuser || false,
        isOEM: user?.is_oem || false,
        isAccountManager: user?.is_accounts_management || false,
        isManager: user?.is_manager || false,
        isVisualDashboard: user?.visual_dashboard_enabled || false,
        isEngineer: user?.is_engineer || false,
    };
};
