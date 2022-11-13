import styled from 'styled-components'

export const FlexStyled = styled.div`
    display: flex;
    flex-direction: ${props=>props.flexDirection||'row' };
    gap : ${props=>props.gap || '12px'};
    justify-content: ${props=>props.justifyContent || 'start'};
    align-items: ${props => props.alignItems || 'start'};
    padding : ${props=>props.padding || '0px'};
    width : 100%
`