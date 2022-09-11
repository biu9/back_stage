import { Provider } from "react-redux";
import store from "../store/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login.js";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}