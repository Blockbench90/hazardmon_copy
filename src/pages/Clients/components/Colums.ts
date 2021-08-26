import {ClientsState} from "../../../store/branches/clients/stateTypes"


export const mapClientsData = (table: ClientsState["clientsData"]["results"] = []) => {
    const clientsTableData: any = []
    table.forEach(el => {
        clientsTableData.push({
            id: el.id,
            key: el.id.toString(),
            account: el.number,
            emailAddress: el.email,
            fullName: el.full_name,
            company: el.company,
            address: el.address,
            phoneNumber: el.phone,
        })
    })
    return clientsTableData
}
