import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LandingLayout from "../layouts/landing";

import { title, subtitle } from "@/components/primitives";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:8080/login", {
                password: formData.password,
            });

            sessionStorage.setItem("JWT", response.data.token);
            login();
        } catch (error) {
            console.error("Login failed", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <LandingLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1>Welcome To</h1>
                    <h1 className={title({ color: "violet" })}>Nutrition AI</h1>
                    <br />
                    <br />
                    <h3 className={subtitle()}>Enter password</h3>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex justify-around items-center">
                        <div className="mr-4 invisible">
                            {isLoading && (
                                <Spinner color="secondary" size="sm" />
                            )}
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="ml-4">
                            {isLoading && (
                                <Spinner color="secondary" size="sm" />
                            )}
                        </div>
                    </div>
                    <Button
                        className="m-4"
                        isDisabled={isLoading}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
            </section>
        </LandingLayout>
    );
}
