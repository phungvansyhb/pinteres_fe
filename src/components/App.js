import "./App.css";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Header from "./Header";
import AddImageModal from "./AddImageModal";
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ImageDetail from "./ImageDetail";
import K16 from "./K16";


function App() {
    const homeRef = useRef(null);
    const [onSubmit, setOnSubmit] = useState()
    useEffect(() => {
        setOnSubmit(homeRef.current)
    }, [])
    return (
        <div className="app">
            <Header onSubmit={onSubmit}/>
            <br/>
            <Routes>
                <Route path={"/image/:id"} element={<ImageDetail/>}/>
                <Route path={"/create"} element={<AddImageModal/>}/>
                <Route path={"/k16"} element={<K16/>}/>
                <Route path="*" element={<Home ref={homeRef}/>}/>
            </Routes>
        </div>
    );
}

export default App;
