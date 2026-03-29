"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { store as reduxStore } from "./index";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chat/ChatBot";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<typeof reduxStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = reduxStore;
    }

    return (
        <Provider store={storeRef.current}>
            <Navbar />
            {children}
            <Chatbot />
            <Footer />
        </Provider>
    );
}