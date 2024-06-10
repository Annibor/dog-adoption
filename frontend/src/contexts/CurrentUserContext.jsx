import { useState, useEffect, createContext, useContext, useMemo, useCallback } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const LogoutContext = createContext();


export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useLogout = () => useContext(LogoutContext); 

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");

  
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // This block is intentionally empty
    }
  };

 
  useEffect(() => {
    handleMount();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setLogoutMessage("Bye, hope we see you soon!");
      console.log('Logout message set:', "You have successfully logged out.");
    } catch (err) {
      console.error('Failed to log out:', err);
    } finally {
      setCurrentUser(null);
    }
  }, []);

 
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (!currentUser) {
          return config;
        }
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          handleLogout();
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && currentUser) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            handleLogout();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [currentUser, handleLogout]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, logoutMessage }}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <LogoutContext.Provider value={handleLogout}>
          {children}
        </LogoutContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};