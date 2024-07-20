import { useState, useEffect, createContext, useContext, useMemo, useCallback } from "react";
import axios from "axios";
import { axiosRes, axiosReq } from "../api/axiosDefaults";

// Creating contexts for user, set user, and logout
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const LogoutContext = createContext();

// Custom hooks to use the contexts
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useLogout = () => useContext(LogoutContext);

// Function to get a specific cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Ensuring axios sends cookies with requests
axios.defaults.withCredentials = true;

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");

 // Function to fetch and set the current user on mount
 const handleMount = async () => {
  try {
    const { data } = await axiosRes.get("/dj-rest-auth/user/");
    console.log("Mount User Data:", data);

    // Check if user data contains profile_id, then fetch profile data
    if (data && data.profile_id) {
      const profileResponse = await axiosRes.get(`/profile/${data.profile_id}/`);
      console.log("Profile Data on Mount:", profileResponse.data);
      setCurrentUser({ ...data, ...profileResponse.data });
    } else {
      console.error("User data does not contain 'profile_id'.");
    }
  } catch (err) {
    console.error("Failed to mount user:", err.response ? err.response.data : err.message);
  }
};

// Use effect to call handleMount on component mount
useEffect(() => {
  handleMount();
}, []);

// Function to handle user login
const handleLogin = async ({ username, password }) => {
  try {
    console.log("Attempting to login...");
    const response = await axios.post('/dj-rest-auth/login/', { username, password });
    console.log("Full Login Response:", response.data);
    const userData = response.data.user;
    console.log("Logged In User Data:", userData);

    // Check if user data contains profile_id, then fetch profile data
    if (userData && userData.profile_id) {
      const profileResponse = await axiosRes.get(`/profile/${userData.profile_id}/`);
      console.log("Profile Data on Login:", profileResponse.data);
      setCurrentUser({ ...userData, ...profileResponse.data });
      // Set greeting message with username
      setGreetingMessage(`Successfully signed in as ${currentUser.username}`);
    } else {
      console.error("User data does not contain 'profile_id'.");
    }
    return response;
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : error.message);
    throw error;
  }
};

  // Function to handle user logout
  const handleLogout = useCallback(async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setLogoutMessage("Bye, hope we see you soon!");
    } catch (err) {
      console.error('Failed to log out:', err.response ? err.response.data : err.message);
    } finally {
      setCurrentUser(null);
    }
  }, []);

  // useMemo to create interceptors for axios requests and responses
  useMemo(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
          config.headers['X-CSRFToken'] = csrfToken;
        } else {
          console.error('CSRF token not found in cookies.');
        }
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
              const response = await axios.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });
              const newAccessToken = response.data.access;
              err.config.headers.Authorization = `Bearer ${newAccessToken}`;
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

    // Clean up interceptors on unmount
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser]);

  // Provide context values to children components
  return (
    <CurrentUserContext.Provider value={{ currentUser, logoutMessage, handleLogin, greetingMessage }}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <LogoutContext.Provider value={handleLogout}>
          {children}
        </LogoutContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
