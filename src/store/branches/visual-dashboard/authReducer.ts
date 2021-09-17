import * as authConstants from '../../../constants/actions/authConstants';

const initialState: any = {
    currentUser: null,
    currentUserHasError: false,
    currentUserLoading: true,
    layoutSettings: {}
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case authConstants.GET_CURRENT_USER:
            return {
                ...state,
                currentUser: null,
                currentUserHasError: false,
                currentUserLoading: true,
            };
        case authConstants.GET_CURRENT_USER_SUCCESS:
            const {is_accounts_management, is_engineer, is_manager, is_superuser} = action.payload;
            return {
                ...state,
                currentUser: {...action.payload, can_edit: is_accounts_management || is_engineer || is_manager || is_superuser},
                currentUserLoading: false
            };
        case authConstants.GET_CURRENT_USER_ERROR:
            return {
                ...state,
                currentUserHasError: true,
                currentUserLoading: false
            };
        case authConstants.GET_LAYOUT_SETTINGS_SUCCESS:
            return {
                ...state,
                layoutSettings: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
