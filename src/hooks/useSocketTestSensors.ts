import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {sensorsAC} from "../store/branches/sensors/actionCreators";
import {LoadingStatus} from "../store/status";

export const useSocketSensors = (path: string) => {
    const dispatch = useDispatch()
    const [ws, setSocket] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(`${process.env.REACT_APP_WS_SERVER_URL}${path}`);

        socket.onopen = () => {
            console.log('WS', 'open');
        }

        socket.onclose = () => {
            console.log('WS', 'close');
        }

        socket.onerror = (error: any) => {
            console.log("WebSocket error ", error)
            console.dir(error)
        }

        socket.onmessage = ({data}: any) => {
            dispatch(sensorsAC.setSensorsLoadingStatus(LoadingStatus.LOADING))
            dispatch(sensorsAC.fetchWsSensorsData(JSON.parse(data)))
        }

        setSocket(socket);

        return () => socket.close();
    }, [path, dispatch])

    return ws
}