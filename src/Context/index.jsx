import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Jaipur');
    const [thisLocation, setLocation] = useState('');

    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                q: place,
                units: 'metric',
                appid: import.meta.env.VITE_API_KEY,
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const thisData = response.data;
            setLocation(thisData.name);
            setValues([thisData]); // For consistency, wrap thisData in an array
            setWeather(thisData);
        } catch (e) {
            console.error(e);
            // if the api throws error.
            alert('This place does not exist');
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [place]);

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);