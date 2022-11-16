import React, {useRef, useState} from 'react';
import {FlexStyled} from "../styledCss/FlexStyled";
import {TextStyled} from "../styledCss/TextStyled";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import AddComment from "./AddComment";
import {PALLET} from "../styledCss/Theme";
import ReplyIcon from '@material-ui/icons/ReplyRounded';

const defaultComment = {
    username: "Abc",
    content: "Wow anh dep qua di!",
    createdAt: '13/11/2022',
    _id: '123123',
    image_id: '123123asdsdqwe',
    reply: []
}
const RenderComment = ({localComment, isChild}) => {
    const [isShowFormReply, setShowFormReply] = useState(false)
    return (
        <>
            <FlexStyled gap={'4px'} alignItems={'start'}>
                <TextStyled fontWeight={700} className={'mr-1 w-max truncate'} style={{width : '70px'}}>{localComment.username || 'anonymous'}</TextStyled>
                <TextStyled fontWeight={400} fontSize='12px' className='ml-4'><p
                    dangerouslySetInnerHTML={{__html: localComment.content}}/></TextStyled>
            </FlexStyled>
            <div className='mt-1'/>
            <FlexStyled gap={'8px'} alignItems={'center'} justifyContent={'space-between'}>
                <TextStyled fontSize={'12px'} className={'mr-4'}
                            color={PALLET.GRAY}>{new Date(localComment.createdAt).toLocaleString()}</TextStyled>

                {
                    !isChild && <IconButtonStyled padding={'4px'} bgColor='#f5f5f5' className='ml-4' onClick={() => {
                        setShowFormReply(true)
                    }}>
                        <ReplyIcon fontSize='small'/>
                    </IconButtonStyled>
                }

            </FlexStyled>


            {isShowFormReply &&
                <AddComment isReply={true} parentId={localComment._id} setShowFormReply={setShowFormReply}/>}
        </>
    )
}

function Comment({comment = defaultComment, ...props}) {

    return (
        <FlexStyled justifyContent='space-between' flexDirection={'column'} gap={'8px'}>
            <div className='w-full '>
                <RenderComment localComment={comment}/>
                <div className='ml-3'>
                    {comment.reply.length > 0 && comment.reply.map((item, index) => <RenderComment key={index}
                                                                                                   localComment={item}
                                                                                                   isChild/>)}
                </div>
            </div>

        </FlexStyled>
    );
}

export default Comment;