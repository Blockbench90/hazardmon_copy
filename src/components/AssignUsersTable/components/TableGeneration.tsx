import {AssignUser} from "../../../store/branches/sites/stateTypes"

export const tableGenerationAssignUsers = (table: AssignUser[] = [], id: number) => {
    const assignUsersTableData: any = []

    if (table) {
        table.forEach(item => {
            assignUsersTableData.push({
                key: item.id.toString(),
                id: item.id,
                fullName: `${item?.first_name} ${item?.last_name}` || " ",
                emailAddress: item.email,
                company: item.profile.company,
                phoneNumber: item.profile.phone,
                address: item.profile.address,
                hasAccess: item?.location_membership?.has_access,
                permission: item?.location_membership?.permission,
                membership_id: item?.location_membership?.id
            })
        })
    }

    return assignUsersTableData
}
