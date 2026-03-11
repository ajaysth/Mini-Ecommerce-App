"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import Navbar from "../components/layout/Navbar";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Navbar />
            {children}
        </Provider>
    );
}