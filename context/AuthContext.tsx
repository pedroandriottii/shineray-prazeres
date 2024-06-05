'use client';
import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import jwt from 'jsonwebtoken';

interface AuthContextType {
    accessToken: string | null;
    role: string | null;
    userId: string | null;
    setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [role, setRole] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwt.decode(token);
            if (decoded) {
                const { userId, role } = decoded as { userId: string, role: string };
                setRole(role);
                setUserId(userId);
                setAccessToken(token);
                console.log(decoded);
            }
        }
    }, []);

    const handleSetAccessToken = (token: string | null) => {
        if (token) {
            localStorage.setItem('accessToken', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);
            console.log(role, userId)
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
        }
        setAccessToken(token);
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken: handleSetAccessToken, role, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
