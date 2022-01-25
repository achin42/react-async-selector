import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useFetchAboutData = () => {
    const [deviceUuid, setDeviceUuid] = useLocalStorage("device_uuid", "");
    const [authToken, setAuthToken] = useLocalStorage("auth_token", "");

    useEffect(() => {
        console.log(deviceUuid)
    }, []);
};

export default useFetchAboutData;