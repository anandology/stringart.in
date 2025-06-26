import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AppData } from '../types';

interface AppDataContextType {
    appData: AppData | null;
    loading: boolean;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appData, setAppData] = useState<AppData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hash = import.meta.env.VITE_APP_JSON_HASH || '';
        fetch(`/app.json?v=${hash}`)
            .then(res => res.json())
            .then(data => {
                setAppData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load app data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <AppDataContext.Provider value={{ appData, loading }}>
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
}; 