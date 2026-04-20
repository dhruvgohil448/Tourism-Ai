import axios from "axios";
import { useState, useEffect } from "react";


export const API_ENDPOINT = new URL('http://127.0.0.1:8000');
export const axiosAuthorized = axios.create({
    baseURL: API_ENDPOINT.toString(),
    withCredentials: false
});

export const useAxios = (configParams) => {
    const [resData, setResData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    /*
    Usage :
    const [data, error, isReady] = useAxios({
        url: 'url-here/',
        method: "",
        data: if any post data
    });
    */
    const fetchDataUsingAxios = async (configParams) => {
        await axiosAuthorized.request(configParams)
            .then(res => setResData(res.data))
            .catch(err => setError(err))
            .finally(() => setIsLoaded(true))
    }

    const reloadAPI = (newUrl) => {
        // Update configParams with the new URL
        const newConfigParams = {
            ...configParams,
            url: newUrl,
        };
        setResData(null); // Clear previous data
        setError(null); // Clear previous error
        setIsLoaded(false); // Reset isLoaded to false
        fetchDataUsingAxios(newConfigParams); // Fetch data with the updated configParams
    };

    useEffect(() => {
        fetchDataUsingAxios(configParams);
    }, []);

    return [resData, error, isLoaded, reloadAPI];
};