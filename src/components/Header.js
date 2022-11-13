import React, {useState} from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import PinterestIcon from "@material-ui/icons/Pinterest";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import {PALLET} from "../styledCss/Theme";

function Header({onSubmit, toggleAddImageModal, ...props}) {
    const [input, setInput] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
    };

    return (
        <Wrapper>

            <LogoWrapper>
                <IconButton>
                    <PinterestIcon/>
                </IconButton>
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
            <IconButton style={{backgroundColor: PALLET.RED, color: PALLET.WHITE}}
                        onClick={() => toggleAddImageModal(true)}>
                <AddIcon/>
            </IconButton>
        </Wrapper>
    );
}

export default Header;

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
  padding: 12px 4px 4px 4px;
  background-color: white;
  color: black;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: #e60023;
    font-size: 32px;
    cursor: pointer;
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

