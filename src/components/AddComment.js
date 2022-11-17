import React, {useContext, useImperativeHandle, useRef, useState} from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import styled from "styled-components";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";
import {ImageContext} from "./ImageDetail";

function AddComment({setShowFormReply, parentId, isReply, ...props}) {
    const {imageId, createCommentFunc  } = useContext(ImageContext)
    const [showForm, toggleShowForm] = useState(!!isReply)
    const nameRef = useRef()
    const contentRef = useRef()

    function handleSubmit() {
        const userName = nameRef.current.value;
        const content = contentRef.current.value
        if (!userName) {
            nameRef.current.focus()
            return false
        }
        if (!content) {
            contentRef.current.focus()
            return false

        }
        if (userName && content) {
            if (isReply && parentId) {
                createCommentFunc({
                    username: userName,
                    content: content,
                    image_id: parentId,
                    createdAt: Date.now(),
                    send : 'replyComment'
                })
            } else {
                createCommentFunc({username: userName, content: content, image_id: imageId, createdAt: Date.now()})
            }
        }
    }

    return (
        <>
            {
                (!showForm && !isReply) ?
                    <IconButtonStyled bgColor={PALLET.GRAY} color={PALLET.BLACK} onClick={() => toggleShowForm(true)}>
                        Add Comment</IconButtonStyled>
                    :
                    <FormWrapper flexDirection='column'>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='userName'>Name</label>
                            <input type="text" name="userName" ref={nameRef}/>
                        </FlexStyled>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='content'>Content</label>
                            <textarea name="content" id="content" cols="30" rows="5" ref={contentRef}/>
                        </FlexStyled>

                        <FlexStyled justifyContent='center'>
                            <IconButtonStyled bgColor={PALLET.RED} color={PALLET.WHITE} type='submit'
                                              onClick={() => handleSubmit()}>Send</IconButtonStyled>
                            <IconButtonStyled bgColor={PALLET.GRAY}
                                              onClick={() => {
                                                  toggleShowForm(false)
                                                  if (setShowFormReply) {
                                                      setShowFormReply(false)
                                                  }
                                              }}>Cancel</IconButtonStyled>
                        </FlexStyled>
                    </FormWrapper>
            }
        </>


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
    max-width: 80px;
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