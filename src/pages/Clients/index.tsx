import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {LoadingStatus} from "../../store/status";
import HeaderClients from "./components/HeaderClients";
import {sitesAC} from "../../store/branches/sites/actionCreators";
import ClientAlert from "../../components/Alerts/clients";
import Preloader from "../../components/Preloader";
import {WinStorage} from "../../services/AuthSrorage";
import TableClients from "./components/TableClients";
import {selectClientsState} from "../../store/selectors";
import {clientsAC} from "../../store/branches/clients/actionCreators";
import {mapClientsData} from "./components/Colums";
import {useCurrentSelection} from "../../hooks/useCurrentSelection";
import {Input} from "antd";

const {Search} = Input;

const Clients: React.FC = () => {
    const dispatch = useDispatch();

    let pageNumber = useRef<number>(1);

    const [searchString, setSearchString] = useState<string>("");

    const {clientsData, status} = useSelector(selectClientsState);
    const {client} = useCurrentSelection();
    const clients = mapClientsData(clientsData?.results);

    const onSelectClient = (id: string) => {
        dispatch(sitesAC.selectClient(id));
        WinStorage.setClient(id);
    };

    const onChangeClient = (event: React.MouseEvent<HTMLElement>, id: number) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(clientsAC.fetchCurrentClient(id));
    };

    const onPagesChange = (page: number, pageSize: number) => {
        pageNumber.current = page;
        dispatch(clientsAC.fetchClients({limit: pageSize, offset: page * pageSize}));
    };

    useEffect(() => {
        dispatch(clientsAC.fetchClients({limit: 20, offset: 0}));

        return () => {
            dispatch(clientsAC.clearClients());
        };
    }, [dispatch]);

    const onSearch = (value) => {
        dispatch(clientsAC.searchClients(value));
    };

    const onSearchChange = (e) => {
        setSearchString(e?.target?.value);
    };

    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <ClientAlert/>
                <HeaderClients/>


                <div style={{display: "flex", justifyContent: "flex-end", margin: "15px 0"}}>
                    <Search
                        placeholder="search"
                        enterButton="Search"
                        size="large"
                        onChange={onSearchChange}
                        value={searchString}
                        style={{width: 300}}
                        onSearch={onSearch}
                    />
                </div>

                <TableClients clients={clients}
                              selectedClient={client}
                              clientsData={clientsData}
                              onSelectSites={onSelectClient}
                              onChangeClient={onChangeClient}
                              onPagesChange={onPagesChange}
                              pageNumber={pageNumber}
                />
            </React.Fragment>
        </Preloader>
    );
};

export default Clients;
