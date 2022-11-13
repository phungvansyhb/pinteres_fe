import React, {useMemo} from 'react';
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import styled from "styled-components";
import {PALLET} from "../styledCss/Theme";

const CategoryItemStyled = styled(IconButtonStyled)`
  :hover {
    background-color: #d9d9d9;
  }
`


function CategoryItem({category, activeKeys, toggleCategory, ...props}) {
    const isActive = useMemo(() => {
        if (activeKeys.includes(category)) return true;
        return false
    }, [activeKeys, category])
    return (
        <CategoryItemStyled bgColor={isActive ? PALLET.RED : '#fff'}
                            color={isActive ? PALLET.WHITE : PALLET.BLACK}
                            onClick={() => toggleCategory(category)}>{category}</CategoryItemStyled>
    );
}

export default CategoryItem;