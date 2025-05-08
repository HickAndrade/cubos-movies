import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingModal from "./LoadingModal";


export function PrivateRoute({ children }: { children: React.JSX.Element }) {
    const { isAuth, isLoading } = useAuth();

    if(isLoading) return <LoadingModal />

    return isAuth ? children : <Navigate to='/login' />
}