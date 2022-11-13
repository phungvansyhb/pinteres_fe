import React from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import {TextStyled} from "../styledCss/TextStyled";

const defaultComment={
    author : "Abc",
    content : "Wow anh dep qua di!",
    time : '13/11/2022'
}

function Comment({ comment = defaultComment, ...props}) {
    return (
        <FlexStyled justifyContent='space-between' alignItems={'center'} >
            <div>
                <TextStyled fontWeight={700} className={'mr-1'}>{comment.author}</TextStyled>
                <TextStyled fontWeight={400}>{comment.content}</TextStyled>
            </div>
            <TextStyled fontSize={'12px'}>{comment.time}</TextStyled>

        </FlexStyled>
    );
}

export default Comment;