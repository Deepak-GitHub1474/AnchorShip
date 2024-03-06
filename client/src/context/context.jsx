import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config.js";

// create context
const Context = createContext();

// use context
export const useJob = () => {
    return useContext(Context);
}

// context provider
export const ContextProvider = ({children}) => {
  
    const [user, setUser] = useState({email: null,});
    const [isLogged, setIsLogged] = useState(false);
    const [coins, setCoins] = useState(0);
    const [refresh, setRefresh] = useState(false);

    axios.defaults.withCredentials = true; // Global Credential

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/`);
            setUser(response.data);
            setIsLogged(true);
          } catch (err) {
            // console.log(err); // Error log if not logged in
            setIsLogged(true);
          }
        };
      
        fetchUser();
      }, []);

    // Updating profile
    const updateDashBoard = () => {
      setRefresh(!refresh);
    };
    
    return (
        <Context.Provider 
          value={{ 
            user, 
            isLogged, 
            setIsLogged, 
            coins, 
            setCoins,
            refresh,
            setRefresh,
            updateDashBoard,
          }}
        >
          {children}
        </Context.Provider>
      );
}