import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authToken = Cookies.get('AuthToken');
        if (authToken) {
            axios.get('https://goatwiki-backend-production.up.railway.app/api/CheckAuth', { params: { Code: authToken } })
                .then(response => {
                    if (response.data.msg === "Authentication Successful!") {
                        setIsLoggedIn(true);
                    }
                })
                .catch(() => setIsLoggedIn(false))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <AdminAuthContext.Provider value={{ isLoggedIn, isLoading}}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);