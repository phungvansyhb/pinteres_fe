import React, {useCallback, useEffect, useImperativeHandle, useState} from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import CategoryItem from "./CategoryItem";
import Mainboard from "./Mainboard";
import styled from "styled-components";
import Image from '../api/Image'
import {useQuery} from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";

const category = ["ocean", "Tokyo", "dogs", "cats", 'ball']

const Home = React.forwardRef(({...props}, ref) => {
    const [activeCategory, setActiveCategory] = useState()
    const {
        data,
        isFetching
    } = useQuery(['getAllExcludeK16', activeCategory], () => {
        if (!activeCategory) {
            return Image.getAllExcludeK16()
        }
        return Image.searchByCategory(activeCategory)
    }, {initialData: []})

    const toggleMenuCategory = useCallback((category) => {
        if (activeCategory !== category) {
            setActiveCategory(category)
        }
    }, [category, activeCategory])
    useImperativeHandle(ref, () => {
        return {
            onSearchSubmit: (category) => setActiveCategory(category)
        }
    },[{}])

    return (
        <>

            <FlexExtend gap={'24px'} justifyContent={'center'}>
                {category.map((item, index) => <CategoryItem category={item} activeKey={activeCategory}
                                                             toggleCategory={toggleMenuCategory} key={index}/>)}
            </FlexExtend>

            {isFetching ? <CircularProgress color="primary" className='selfCenter'/> :
                <Mainboard pins={data.data.images}/>
            }
        </>
    );
})

export const FlexExtend = styled(FlexStyled)`
  overflow: auto;
  gap: 6px;
`

export default Home;