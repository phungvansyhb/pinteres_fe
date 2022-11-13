import styled from "styled-components";

export const TextStyled = styled.p`
    font-size : ${props=>props.fontSize||"16px"};
    font-weight: ${props=>props.fontWeight || 500};
    color : ${props=>props.color || '#000'};
    word-break: break-word;
`