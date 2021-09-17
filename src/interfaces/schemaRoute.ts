import {RouteComponentProps} from "react-router-dom";

export interface SchemaRoute extends RouteComponentProps<{
    schemaId: string,
    tabId: string,
    machineId: string
    siteId: string
}> {}