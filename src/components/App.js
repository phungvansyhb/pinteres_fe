import "./App.css";
import React, {useEffect, useRef, useState} from "react";
import Header from "./Header";
import unsplash from "../api/unsplash";
import AddImageModal from "./AddImageModal";
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ImageDetail from "./ImageDetail";

const category = ["ocean", "Tokyo", "dogs", "cats" , 'K16']

function App() {
    const homeRef = useRef();
    return (
        <div className="app">
            <Header onSubmit={homeRef.current?.onSearchSubmit}/>
            <br/>
            <Router>
                <Routes>
                    <Route path={"/pin/:id"} element={<ImageDetail/>}/>
                    <Route path={"/create"} element={<AddImageModal/>}/>
                    <Route path="*" element={<Home ref = {homeRef}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
