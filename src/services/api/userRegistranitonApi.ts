import axios from "axios";
import {RegisterValues} from "../../components/RegisterBlock";


interface APIResponse {
    data: any;
}

export const registration = async (payload: RegisterValues): Promise<APIResponse> => {
    const data = await axios.post<APIResponse>("/api/v1/register-for-demo/", payload)
    return data
}

