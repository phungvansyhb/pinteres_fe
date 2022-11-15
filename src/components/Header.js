import React, {useState} from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import {PALLET} from "../styledCss/Theme";
import {FlexStyled} from "../styledCss/FlexStyled";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {useNavigate} from "react-router-dom";

function Header({onSubmit, ...props}) {
    const [input, setInput] = useState("");
    const onSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit.onSearchSubmit(input);
    };
    const navigate = useNavigate()

    return (
        <Wrapper>
            <LogoWrapper onClick={()=>navigate("/")}>
                    <img src='/logo-12.png'/>
            </LogoWrapper>

            <SearchWrapper>
                <SearchBarWrapper>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <form>
                        <input type="text" onChange={(e) => setInput(e.target.value)}/>
                        <button type="submit" onClick={onSearchSubmit}>
                            {/*CAN BE LEFT EMPTY*/}
                        </button>
                    </form>
                </SearchBarWrapper>
            </SearchWrapper>
            <div className='flex gap-2'>
                <IconButtonStyledExtend bgColor={PALLET.BLACK} color={PALLET.WHITE} onClick={()=>navigate("/k16")}>K16</IconButtonStyledExtend>
                <IconButtonStyledExtend style={{backgroundColor: PALLET.RED, color: PALLET.WHITE}} onClick={()=>navigate("/create")}>
                    <AddIcon/>
                </IconButtonStyledExtend>
            </div>

        </Wrapper>
    );
}

export default Header;


const IconButtonStyledExtend = styled(IconButtonStyled)`
  border-radius: 50px;
  @media (max-width: 500px){
    padding: 4px;
  }
`

const Wrapper = styled.div`
  position: sticky;
  z-index: 678;
  //width: 100%;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  height: 56px;
  padding: 12px 8px 4px 8px;
  background-color: white;
  color: black;
  @media (max-width: 500px){
    gap: 10px;
  }
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    cursor: pointer;
  }
  img{
    width: 48px;
    height: 48px;
  }
  @media (max-width: 500px){
    img{
      width: 30px;
      height: 30px;
    }
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
`;

const SearchBarWrapper = styled.div`
  background-color: #efefef;
  display: flex;
  height: 48px;
  width: 100%;
  border-radius: 50px;
  border: none;
  padding-left: 10px;
  @media (max-width: 500px){
    height: 30px;
    padding-left: 0px;

  }
  form {
    display: flex;
    flex: 1;
  }

  form > input {
    background-color: transparent;
    border: none;
    width: 100%;
    margin-left: 5px;
    font-size: 16px;
  }

  form > button {
    display: none;
  }

  input:focus {
    outline: none;
  }

  input:active {
    outline: none;
  }

  input:hover {
    outline: none;
  }
`;

