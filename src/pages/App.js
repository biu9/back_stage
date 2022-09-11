import { Provider } from "react-redux";
import store from "../store/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login.js";
import ConsultantForm from "./ConsultantForm.js";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/ConsultantForm" element={<ConsultantForm />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}