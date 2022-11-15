import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import {
    QueryClient,
    QueryClientProvider
} from 'react-query'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path='*' element={<App/>}></Route>
                </Routes>
            </Router>

        </QueryClientProvider>

    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
