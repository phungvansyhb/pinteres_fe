import React, {useState} from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import {PALLET} from "../styledCss/Theme";

function Header({onSubmit, ...props}) {
    const [input, setInput] = useState("");
    const onSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
    };

    return (
        <Wrapper>

            <LogoWrapper>
                <a href={'/'}>
                    <img src='./logo-11.png' width={48} height={48} />
                </a>
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
                        href={'/create'}>
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
  padding: 12px 8px 4px 8px;
  background-color: white;
  color: black;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
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

