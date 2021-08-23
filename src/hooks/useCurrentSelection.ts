import { useSelector } from "react-redux";
import { selectUserState } from "../store/selectors";

export const useCurrentSelection = () => {
    const { userData } = useSelector(selectUserState);

    return {
        client: userData?.current_client || null,
        site: userData?.current_location || null,
        device: userData?.current_device || null,
    }
}
