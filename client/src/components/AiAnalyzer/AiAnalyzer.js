
import { useState } from "react";
import axios from "axios";
import { DNA } from 'react-loader-spinner';
import TableComponent from "../FoodTable";
import './AiAnalyzer.css';

export default function AiAnalyzer() {
    const [file, setFile] = useState();
    const [displayFile, setDisplayFile] = useState();
    const [calorieData, setCalorieData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({inputType: "image", textPrompt: "I had 2 apple slices with yoghurt for breakfast, a chicken shawarma wrap for lunch and a sphagetti carbonara for dinner"});

    const upload = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("http://localhost:8080/image-calories", formData);
            setCalorieData(response.data)
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    const submitPrompt = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:8080/text-calories", {textPrompt: formData.textPrompt});
            setCalorieData(response.data);
            setIsLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setDisplayFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleChange = (e) => {
        setFormData((prevFormData) => {
            return { ...prevFormData, [e.target.name]: e.target.value }
        })
    }

    return (
    <div className="ai-analyzer-container">
        <select name="inputType" id="inputType" onChange={handleChange}>
        <option value="image">Image</option>
        <option value="text">Text</option>
        </select>
        <div className="loader">
            <DNA
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
            />
        </div>
        {formData.inputType === "text" && <div className="text-prompt-container">
            <textarea
                name="textPrompt"
                type="text"
                className="prompt-input"
                onChange={handleChange}
                value={formData.textPrompt}
                placeholder="Enter what you ate here"
            />
            <button onClick={submitPrompt}>Submit</button>
            </div>}
        {formData.inputType === "image" && <div className="image-upload-container">
            {!isLoading && displayFile && <img src={displayFile} alt="preview of user upload"/>}
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
            />
            <button type="button" onClick={upload}>
                Upload
            </button>
        </div>}
        {calorieData.description && <h4>
            Description: {calorieData.description}
        </h4>}
        <div className='table-container'>
            {calorieData.calories?.length > 0 && <TableComponent data={calorieData.calories}/>}
        </div>
    </div>
    )
}