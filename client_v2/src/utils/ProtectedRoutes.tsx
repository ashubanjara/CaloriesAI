import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";

import { useAuth } from "@/providers/AuthProvider";

const ProtectedRoutes = () => {
    const { isAuthenticated, login } = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authToken = sessionStorage.getItem("JWT");

        const validateToken = async () => {
            try {
                const res = await axios.get("http://localhost:8080/validate", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (res.data.valid) {
                    login();
                }
            } catch (error) {
                console.error("Token validation failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [login]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
