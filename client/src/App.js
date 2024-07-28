import "./App.css";
import { useState } from "react";
import axios from "axios";
import { DNA } from 'react-loader-spinner';
import TableComponent from "./components/FoodTable";

function App() {
    const [file, setFile] = useState();
    const [displayFile, setDisplayFile] = useState();
    const [calorieData, setCalorieData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const upload = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("http://localhost:8080/image-calories", formData);
            setCalorieData(response.data)
            setIsLoading(false);
        } catch (e) {
            throw new Error(e);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setDisplayFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div className="App">
            {console.log(setCalorieData)}
            <header className="App-header">
                <h1>Image to Calories Model</h1>
            </header>
            <DNA
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
            />
            {!isLoading && displayFile && <img src={displayFile} alt="preview of user upload"/>}
            <div>
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <button type="button" onClick={upload}>
                    Upload
                </button>
            </div>
            {calorieData.description && <h4>
                Image Description: {calorieData.description}
            </h4>}
            <div className='table-container'>
                {calorieData.calories?.length > 0 ? <TableComponent data={calorieData.calories}/> : "That is not a picture of Food"}
            </div>
        </div>
    );
}

export default App;
