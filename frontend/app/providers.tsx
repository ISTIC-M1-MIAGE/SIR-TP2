'use client';

import {HeroUIProvider, ToastProvider} from '@heroui/react';
import {ReactNode} from "react";
import { AuthProvider } from './context/AuthContext';


export function Providers({children}: { children: ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider />
            <AuthProvider>
                {children}
            </AuthProvider>
        </HeroUIProvider>
    );
}