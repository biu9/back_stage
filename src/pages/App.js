import { Provider } from "react-redux";
import store from "../store/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login.js";
import FormOverView from "./FormOverview.js";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/formOverview" element={<FormOverView />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}