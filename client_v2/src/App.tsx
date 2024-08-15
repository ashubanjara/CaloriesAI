import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import Redirect from "./utils/Redirect";

import LoginPage from "@/pages/login";
import IndexPage from "@/pages/index";
import RandomRecipe from "@/pages/randomRecipe";
import Log from "@/pages/log";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route element={<IndexPage />} path="/" />
                <Route element={<RandomRecipe />} path="/random-recipe" />
                <Route element={<Log />} path="/log" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<Redirect />} path="*" />
        </Routes>
    );
}

export default App;
