import React, {useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import CategoryItem from "./CategoryItem";
import Mainboard from "./Mainboard";
import styled from "styled-components";
import Image from '../api/Image'
import {useQuery, useInfiniteQuery} from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";
import Pin from "./Pin";

const category = ["boy", "girl", "sexy", "wendy", "cute", "anime", "gamming", "meme", "food", "natura", "west-lake", "ho-tan-xa", "afternoon-sky", "flower" ,"dog","motivation"]

const Home = React.forwardRef(({...props}, ref) => {
    const [activeCategory, setActiveCategory] = useState()
    const {
        data,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        fetchNextPage,
        isFetching
    } = useInfiniteQuery(['getAllExcludeK16', activeCategory], async ({pageParam}) => {
        let result = {}
        if (!activeCategory) {
            result = await Image.getAllExcludeK16(pageParam)
        } else {
            result = await Image.searchByCategory(activeCategory, pageParam)
        }
        return [...result.data?.images]
    }, {
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1
            return nextPage
        }

    })

    const toggleMenuCategory = useCallback((category) => {
        if (activeCategory !== category) {
            setActiveCategory(category)
        }
    }, [category, activeCategory])
    useImperativeHandle(ref, () => {
        return {
            onSearchSubmit: (category) => setActiveCategory(category)
        }
    }, [{}])
    useEffect(() => {
        let fetching = false;
        const handleScroll = async (e) => {
            const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement;
            console.log(scrollHeight - scrollTop - clientHeight)
            if (!fetching && scrollHeight - scrollTop - clientHeight <= 100) {
                fetching = true
                if (hasNextPage) await fetchNextPage()
                fetching = false
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [fetchNextPage, hasNextPage])
    return (
        <>

            <FlexExtend gap={'24px'} justifyContent={'center'}>
                {category.map((item, index) => <CategoryItem category={item} activeKey={activeCategory}
                                                             toggleCategory={toggleMenuCategory} key={index}/>)}
            </FlexExtend>
            <div className='mainboard'>
                <div className="mainboard__container">
                    {
                        data?.pages.map((group, i) => group.sort(function (a, b) {
                            return 0.5 - Math.random();
                        }).map((pin, index) => {
                            let {srcImage} = pin;
                            return <Pin urls={srcImage} {...pin} key={index}/>;
                        }))
                    }
                </div>
            </div>


        </>
    );
})

export const FlexExtend = styled(FlexStyled)`
  overflow: auto;
  gap: 6px;
`

export default Home;