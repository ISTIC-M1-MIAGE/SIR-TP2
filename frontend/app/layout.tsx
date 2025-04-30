import type {Metadata} from "next";
import {Funnel_Display} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/layouts/Footer";
import {ReactNode} from "react";

const funnelDisplay = Funnel_Display({
    variable: "--font-funnel-display",
    //subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Eventizer",
    description: "Application web de gestion d'évènements et ventes de tickets en ligne",
};


export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="fr" suppressHydrationWarning={true}>
        <body className={` light antialiased`} suppressHydrationWarning={true}>
        <CustomNavbar/>
        <Providers>
            {children}
        </Providers>
        <Footer/>
        </body>
        </html>
    );
}
