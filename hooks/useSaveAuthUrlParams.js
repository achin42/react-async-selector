import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from 'next/router'

const useStoredAuthUrlParams = () => {
    const [storedDeviceUuid, setStoredDeviceUuid] = useLocalStorage("device_uuid", null);
    const [storedAuthToken, setStoredAuthToken] = useLocalStorage("auth_token", null);
    return [storedDeviceUuid, storedAuthToken];
}

const useSaveAuthUrlParams = () => {
    const [storedDeviceUuid, setStoredDeviceUuid] = useLocalStorage("device_uuid", null);
    const [storedAuthToken, setStoredAuthToken] = useLocalStorage("auth_token", null);
    
    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;
        const query = router.query;
        const deviceUuid = query.device_uuid;
        const authToken = query.auth_token;
        if(deviceUuid) setStoredDeviceUuid(deviceUuid)
        if(authToken) setStoredAuthToken(authToken)
    }, [router.isReady, router.query]);
    
    return [storedDeviceUuid, storedAuthToken];
};

export { useSaveAuthUrlParams, useStoredAuthUrlParams };