import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DNA } from "react-loader-spinner";

import TableComponent from "../components/FoodTable";
import "./AiAnalyzer.css";
import DefaultLayout from "@/layouts/default";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {Image} from "@nextui-org/image";
import {Textarea} from "@nextui-org/input";
import DropZone  from "../components/DropZone/DropZone";

export default function AiAnalyzer() {
    const [calorieData, setCalorieData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
    const [textPrompt, setTextPrompt] = useState("I had 2 apple slices with yoghurt for breakfast, a chicken shawarma wrap for lunch and a sphagetti carbonara for dinner")

    useEffect(() => {
        const token = sessionStorage.getItem("JWT");

        setAuthToken(token);
    }, []);

    const upload = async (file) => {
        try {
            setIsLoading(true);
            const formData = new FormData();

            formData.append("file", file);
            const response = await axios.post(
                "http://localhost:8080/image-calories",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );
            setCalorieData(response.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const submitPrompt = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                "http://localhost:8080/text-calories",
                {
                    textPrompt,
                },                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );
            setCalorieData(response.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <DefaultLayout>
            <div className="ai-analyzer-container">
                    <div className="flex flex-col">
                            <p className="mb-2">Select Input Type</p>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="shadow"
                                        color="secondary"
                                        className="capitalize w-20"
                                    >
                                        {selectedKeys}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    <DropdownItem key="image">Image</DropdownItem>
                                    <DropdownItem key="text">Text</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                <Card className="p-5 mt-4 flex flex-col justify-center items-center">
                    <CardBody>
                        <div className="loader">
                            {/* <DNA
                                visible={isLoading}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperClass="dna-wrapper"
                            /> */}
                        </div>
                        {selectedKeys.has("text") && (
                            <div className="text-prompt-container">
                                    <Textarea
                                        name="textPrompt"
                                        label="Description"
                                        placeholder="Enter what you ate here"
                                        className="max-w-m"
                                        value={textPrompt}
                                        onValueChange={setTextPrompt}
                                    />
                                <Button isLoading={isLoading} className="mt-4" onClick={submitPrompt}>Submit</Button>
                            </div>
                        )}
                        {selectedKeys.has("image") && (
                            <DropZone isLoading={isLoading} onSubmit={upload}/>
                        )}
                        {calorieData.description && (
                            <h4 className="mt-4">Description: {calorieData.description}</h4>
                        )}
                        <div className="table-container mt-4">
                            {calorieData.calories?.length > 0 && (
                                <TableComponent data={calorieData.calories} />
                            )}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </DefaultLayout>
    );
}
