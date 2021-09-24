import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import AddClientForm from "./components/AddClientForm";
import {useDispatch, useSelector} from "react-redux";
import {LoadingStatus} from "../../store/status";
import Preloader from "../Preloader";
import ClientAlert from "../Alerts/clients";
import {selectClientsState} from "../../store/selectors";
import {clientsAC} from "../../store/branches/clients/actionCreators";


const AddClient: React.FC = () => {
    const [form] = useForm();
    const history = useHistory();
    const dispatch = useDispatch();

    const {current_client, status} = useSelector(selectClientsState);
    const [isChecked, setChecked] = useState<boolean>(false);


    const onSubmit = async (values: any) => {
        const data = {
            number: values.number,
            company: values.company,
            address: values.address,
            phone: values.phone,
            full_name: values.full_name,
            email: values.email,
            is_active: isChecked,
            alternative_name: values.alternative_name,
            alternative_email: values.alternative_email,
            alternative_phone: values.alternative_phone,
        };

        if (current_client) {
            await dispatch(clientsAC.updateCurrentClient({...data, id: current_client.id}));
        } else {
            await dispatch(clientsAC.addClient({...data}));
        }
        form.resetFields();
    };


    const onChecked = () => {
        setChecked((isChecked) => !isChecked);
    };

    const onCancel = () => {
        form.resetFields();
        history.push("/clients");
    };

    useEffect(() => {
        dispatch(clientsAC.fetchAccountNumber());
    }, [dispatch]);

    useEffect(() => {
        if (current_client) {
            setChecked(current_client?.is_active);
        }
    }, [current_client]);


    return (
        <Preloader isLoaded={status === LoadingStatus.LOADING}>
            <React.Fragment>
                <ClientAlert/>
                <AddClientForm form={form}
                               isChecked={isChecked}
                               onChecked={onChecked}
                               onSubmit={onSubmit}
                               onCancel={onCancel}
                />
            </React.Fragment>
        </Preloader>
    );
};
export default AddClient;
