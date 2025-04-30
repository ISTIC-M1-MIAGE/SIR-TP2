import { createContext, useContext, useEffect, useState } from 'react';
import {logoutAction} from "@/app/actions/logoutAction";
import {getCurrentUserAction} from "@/app/actions/getCurrentUserAction";

const AuthContext = createContext<{
    user: { [key: string]: any } | null;
    setUser: React.SetStateAction<{ [key: string]: any } | null>;
    loading: boolean;
    logout: () => Promise<void>;
} | null>(null);
export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    }, []);

    const logout = async () => {
        await logoutAction()
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
