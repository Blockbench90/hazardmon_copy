import {axios} from "../axios"
import {Client, ClientsState, PageRequest} from "../../store/branches/clients/stateTypes";


export const ClientsApi = {
    async getClients(payload: PageRequest): Promise<ClientsState["clientsData"]> {
        const {data} = await axios.get<ClientsState["clientsData"]>(`api/v1/clients/?limit=${payload.limit}&offset=${payload.offset}`)
        return data
    },
    async searchClients(payload: string): Promise<ClientsState["clientsData"]> {
        const {data} = await axios.get<ClientsState["clientsData"]>(`api/v1/clients/?q=${payload}`)
        return data
    },
    async getAccountNumber(): Promise<any> {
        const {data} = await axios.get<any>("/api/v1/clients/get-next-number/")
        return data
    },
    async addClient(payload: Client): Promise<any> {
        const {status} = await axios.post<Promise<any>>("api/v1/clients/", payload)
        return status
    },
    async removeClient(payload: string): Promise<any> {
        const {status} = await axios.delete<Promise<any>>(`api/v1/clients/${payload}/`)
        return status
    },
    async updateClient(payload: Client): Promise<any> {
        const data = {
            number: payload.number,
            company: payload.company,
            address: payload.address,
            phone: payload.phone,
            full_name: payload.full_name,
            email: payload.email,
            is_active: payload.is_active,
            alternative_name: payload.alternative_name || null,
            alternative_email: payload.alternative_email || null,
            alternative_phone: payload.alternative_phone || null,
        }
        const {status} = await axios.patch<Promise<any>>(`api/v1/clients/${payload.id}/`, data)
        return status
    },
    async getCurrentClient(payload: any): Promise<any> {
        const {data} = await axios.get<Promise<any>>(`api/v1/clients/${payload}/`)
        return data
    },
}
