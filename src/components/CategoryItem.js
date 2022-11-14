import React, {useMemo} from 'react';
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import styled from "styled-components";
import {PALLET} from "../styledCss/Theme";



function CategoryItem({category, activeKey, toggleCategory, ...props}) {
    const isActive = useMemo(() => {
        if (activeKey === category) return true;
        return false
    }, [activeKey, category])
    return (
        <CategoryItemStyled bgColor={isActive ? PALLET.RED : '#fff'}
                            color={isActive ? PALLET.WHITE : PALLET.BLACK}
                            onClick={() => toggleCategory(category)}>{category}</CategoryItemStyled>
    );
}

const CategoryItemStyled = styled(IconButtonStyled)`
  @media (max-width: 768px){
    border-radius: 8px;
    padding: 8px;
  }
  :hover {
    background-color: #d9d9d9;
  }
`

export default CategoryItem;