import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextProps {
    user: User | null
    isAuth: boolean
    isLoading: boolean
    signOut:() => void
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }:{ children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const isAuth = !!user;

    function signOut(){
        localStorage.removeItem('token')
        setUser(null)
    }

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token')
            if(!token) {
                setIsLoading(false)
                return
            }

            try {
                const res = await api.get('/auth/me')
                setUser(res.data)

            } catch (error) {
                signOut();
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser();
    }, [])

    return (
        <AuthContext.Provider
        value={{ user, isAuth, isLoading, signOut }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}