import { useState, useEffect, createContext, useContext, useMemo, useCallback } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const LogoutContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useLogout = () => useContext(LogoutContext);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

axios.defaults.withCredentials = true;

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.error("Failed to mount user:", err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await axios.post('/dj-rest-auth/login/', { username, password });
      const userData = response.data.user;
      setCurrentUser(userData);
      console.log('Login successful: User ID:', userData.id);
      return response;
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setLogoutMessage("Bye, hope we see you soon!");
      console.log('Logout message set:', "You have successfully logged out.");
    } catch (err) {
      console.error('Failed to log out:', err.response ? err.response.data : err.message);
    } finally {
      setCurrentUser(null);
    }
  }, []);

  useMemo(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
          config.headers['X-CSRFToken'] = csrfToken;
          console.log('CSRF token set:', csrfToken);
        } else {
          console.error('CSRF token not found in cookies.');
        }
        console.log('Request config with credentials:', config);
        return config;
      },
      (err) => {
        console.error('Request interceptor error:', err);
        return Promise.reject(err);
      }
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401 && currentUser) {
          try {
            const refreshToken = getCookie('refreshToken');
            if (refreshToken) {
              console.log('Attempting to refresh token...');
              const response = await axios.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });
              const newAccessToken = response.data.access;
              err.config.headers.Authorization = `Bearer ${newAccessToken}`;
              console.log('Token refreshed successfully.');
              return axios(err.config);
            } else {
              console.error('No refresh token found.');
            }
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError.response ? refreshError.response.data : refreshError.message);
            // Do not logout the user, just reject the promise
            return Promise.reject(refreshError);
          }
        }
        console.error('Response interceptor error:', err.response ? err.response.data : err.message);
        return Promise.reject(err);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, logoutMessage, handleLogin }}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <LogoutContext.Provider value={handleLogout}>
          {children}
        </LogoutContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
