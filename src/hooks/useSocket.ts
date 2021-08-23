import {useEffect, useRef} from "react";

export const useSocket = (path: string) => {
    const socketRef = useRef<WebSocket>();
    const token = window.localStorage.getItem("_token");

    const authCmd = {
        cmd: "auth",
        token: token,
    };

    if (!socketRef.current) {
        socketRef.current = typeof window !== 'undefined' && new WebSocket(`${process.env.REACT_APP_WS_SERVER_URL}${path}`);
    } else {
        socketRef.current.onopen = (event: any) => {
            socketRef.current.send(
                JSON.stringify(authCmd)
            );
            console.log('WS open! Event:', event);
        }

        socketRef.current.onerror = (error: any) => {
            console.log("WebSocket error ", error)
            console.dir(error)
        }
    }
    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.onclose = () => {
                    console.log('WS', 'close');
                }
            }
        };
    }, []);

    return socketRef.current;
};
