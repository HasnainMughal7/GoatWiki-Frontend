import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import Loadinganim from '../../../Components/loadingScreen/Loadinganim';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useAdminAuth()
    const location = useLocation()

    if (isLoading) {
        return (
            <Loadinganim />
        )
    }
    else {
        if (isLoggedIn && (location.pathname === "/Admin/login" || location.pathname === "/admin/login")) {
            return <Navigate to="/Admin"/>
        }
        else if (isLoggedIn && location.pathname !== "/Admin/login") {
            return children
        }
        else if(!isLoggedIn && location.pathname === "/Admin/login"){
            return children
        }
        else if(!isLoggedIn && location.pathname !== "/Admin/login"){
            return <Navigate to="/Admin/login"/>
        }
    }
};

export default ProtectedRoute;
