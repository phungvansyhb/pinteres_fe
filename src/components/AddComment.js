import React, {useRef, useState} from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import styled from "styled-components";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";

function AddComment(props) {
    const [showForm, toggleShowForm] = useState(false)
    const nameRef = useRef()
    const contentRef = useRef()
    function handleSubmit(){
        const name = nameRef.current.value;
        const content = contentRef.current.value
        if(!name) {
            nameRef.current.focus()
        }
        if(!content) {
            contentRef.current.focus()
        }else{
            /* TODO : call api*/
        }
    }
    return (
        <form>
            {
                !showForm ?
                    <IconButtonStyled bgColor={PALLET.RED} color={PALLET.WHITE} onClick={() => toggleShowForm(true)}>Add
                        Comment</IconButtonStyled>
                    :
                    <FormWrapper flexDirection='column'>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='author'>Name</label>
                            <input type="text" name="author" ref={nameRef}/>
                        </FlexStyled>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='content'>Content</label>
                            <textarea name="content" id="content" cols="30" rows="5" ref={contentRef}/>
                        </FlexStyled>
                        <FlexStyled justifyContent='center'>
                            <IconButtonStyled bgColor={PALLET.RED} color={PALLET.WHITE} type='submit' onClick={handleSubmit}>Send</IconButtonStyled>
                            <IconButtonStyled bgColor={PALLET.GRAY}
                                              onClick={() => toggleShowForm(false)}>Cancel</IconButtonStyled>
                        </FlexStyled>
                    </FormWrapper>
            }
        </form>


    );
}

export default AddComment;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 12px;

  label {
    font-weight: 600;
    margin-right: 8px;
    width: 50px;
  }

  input {
    border: 1px solid lightgray;
    font-size: 16px;
    height: 30px;
    border-radius: 8px;
    flex-grow: 1;
    padding-left: 8px;
    width: inherit;
  }

  textarea {
    flex-grow: 1;
    width: inherit;
    border: 1px solid lightgray;
    font-size: 16px;
    border-radius: 8px;
    padding-left: 8px;


  }

  textarea, input:focus {
    outline: lightcoral;
    outline-offset: 1px;

  }

  textarea, input:active {
    outline: lightcoral;
    outline-offset: 1px;
  }

  textarea, input:hover {
    outline: none;
  }
`