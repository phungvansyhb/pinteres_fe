import "./App.css";
import React, {useEffect, useRef, useState} from "react";

import {Route, Routes} from "react-router-dom";
import Header from "./Header";
import {Backdrop, CircularProgress} from "@material-ui/core";

const AddImageModal = React.lazy(() => import("./AddImageModal"));
const ImageDetail = React.lazy(() => import("./ImageDetail"));
const K16 = React.lazy(() => import('./K16'))
const Home = React.lazy(() => import('./Home'))


function FallBackWrapper({children}) {
    return (<React.Suspense fallback={<Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        // open={open}
        // onClick={handleClose}
    >
        <CircularProgress color="inherit"/>
    </Backdrop>}>{children}</React.Suspense>)
}

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
                <Route path={"/image/:id"} element={<FallBackWrapper> <ImageDetail/> </FallBackWrapper>}/>
                <Route path={"/create"} element={<FallBackWrapper><AddImageModal/></FallBackWrapper>}/>
                <Route path={"/k16"} element={<FallBackWrapper><K16/></FallBackWrapper>}/>
                <Route path="*" element={<FallBackWrapper><Home ref={homeRef}/></FallBackWrapper>}/>
            </Routes>
        </div>
    );
}

export default App;
