import React, {useCallback, useEffect, useImperativeHandle, useState} from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import CategoryItem from "./CategoryItem";
import Mainboard from "./Mainboard";
import unsplash from "../api/unsplash";
import styled from "styled-components";

const category = ["ocean", "Tokyo", "dogs", "cats",'ball']

const Home = React.forwardRef(({...props}, ref) => {
    const [pins, setNewPins] = useState([]);

    const getImages = (term) => {
        return unsplash.get("https://api.unsplash.com/search/photos", {
            params: {query: term},
        });
    };
    const onSearchSubmit = (term) => {
        getImages(term).then((res) => {
            let results = res.data.results;
            let newPins = [
                ...results,
                ...pins
            ]
            /* TODO shuffle array */
            newPins.sort(function (a, b) {
                return 0.5 - Math.random();
            });
            setNewPins(newPins);
        })
    };

    const getNewPins = () => {
        let promises = [];
        let pinData = [];
        category.forEach((pinTerm) => {
            promises.push(
                getImages(pinTerm).then((res) => {
                    let results = res.data.results;
                    pinData = pinData.concat(results)
                    pinData.sort(function (a, b) {
                        return 0.5 - Math.random();
                    });
                })
            );
        });
        Promise.all(promises).then(() => {
            setNewPins(pinData);
        });
    };

    useEffect(() => {
        getNewPins();
    }, []);
    const [activeCategory, setActiveCategory] = useState(category[0])

    const toggleMenuCategory = useCallback((category) => {
        if (activeCategory !== category) {
            setActiveCategory(category)
            onSearchSubmit(category)
        }
    }, [category, activeCategory])

    useImperativeHandle(ref , ()=>{return {
        onSearchSubmit : onSearchSubmit
    }})

    return (
        <>
            <FlexExtend gap={'24px'} justifyContent={'center'}>
                {category.map((item, index) => <CategoryItem category={item} activeKey={activeCategory}
                                                             toggleCategory={toggleMenuCategory} key={index}/>)}
            </FlexExtend>
            <Mainboard pins={pins}/>
        </>
    );
})

const FlexExtend = styled(FlexStyled)`
  overflow: auto;
  gap : 6px;
`

export default Home;