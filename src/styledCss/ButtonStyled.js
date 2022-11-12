import styled from "styled-components";

export const ButtonStyled = styled.div`
  display: flex;
  height: 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  cursor: pointer;
  background-color: ${props => props.bgColor || "rgb(17, 17, 17)"};
  font-weight: 700;
  color : ${props => props.color || "#000"}
  // :hover {
  //   background-color: ${props=>props.hoverColor || "gray"};
  // }
`;