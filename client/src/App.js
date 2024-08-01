import "./App.css";
import { useState } from 'react';
import AiAnalyzer from "./components/AiAnalyzer/AiAnalyzer"
import RandomRecipe from "./components/RandomRecipe/RandomRecipe";

function App() {
    const [currentSubpage, setCurrentSubpage] = useState('')

    const handleChangeSubpage = (e) => {
        console.log(e)
        setCurrentSubpage(e.target.id)
    }

    console.log(currentSubpage)

    return (
        <div className="App">
            <header className="App-header">
                <h1>NutritionAI</h1>
            </header>
            <div className="tabs-container">
                <div id="randomRecipe" onClick={handleChangeSubpage} className={currentSubpage === "randomRecipe" ? "active" : ""}>
                    Random Recipe
                </div>
                <div id="aiAnalyzer" onClick={handleChangeSubpage} className={currentSubpage === "aiAnalyzer" ? "active" : ""}>
                    AI Analyzer
                </div>
                <div id="log" onClick={handleChangeSubpage} className={currentSubpage === "log" ? "active" : ""}>
                    Log
                </div>
            </div>

            {currentSubpage === "aiAnalyzer" && <AiAnalyzer/>}
            {currentSubpage === "randomRecipe" && <RandomRecipe/>}
        </div>
    );
}

export default App;
