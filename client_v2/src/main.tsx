import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./providers/NextUIprovider.tsx";
import "@/styles/globals.css";
import { AuthProvider } from "./providers/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);