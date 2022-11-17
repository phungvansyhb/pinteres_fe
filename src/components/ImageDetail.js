import React, {createContext, useCallback, useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {FlexStyled} from "../styledCss/FlexStyled";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";
import {TextStyled} from "../styledCss/TextStyled";
import {ArrowDownward} from "@material-ui/icons";
import Comment from "./Comment";
import AddComment, {FormWrapper} from "./AddComment";
import FileSaver from 'file-saver'
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import ImageModel from "../api/Image";
import CommentModel from "../api/Comment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Mainboard from "./Mainboard";
import socketIO from 'socket.io-client'

const socket = socketIO(process.env.REACT_APP_BASE_URL);
const SOCKET_EVENT = {
    CONNECT: 'connect',
    JOIN_ROOM: 'joinRoom',
    CREATE_COMMENT: 'createComment',
    // REPLY_COMMENT: 'replyComment',
    SEND_REPLY_TO_CLIENT: 'sendReplyCommentToClient',
    SEND_COMMENT_TO_CLIENT: 'sendCommentToClient',
    EDIT_HEADER: 'editHeader',
    SEND_EDIT_HEADER_TO_CLIENT: 'sendEditHeaderToClient',
    DISCONNECT: 'disconnect'

}

export const ImageContext = createContext({
    imageId: null,
    createCommentFunc: () => {
    },
    editHeader: () => {
    }
})


function ImageDetail({...props}) {
    const {id} = useParams()
    const {data: {detail, references}, isFetching , refetch : refetchImage} = useQuery(['getImageDetail', id], async () => {
            const result = await ImageModel.getDetail(id)
            const [detail, ...references] = result.data.images
            return {detail, references}
        },
        {
            initialData: {},
            enabled: !!id
        }
    )
    const {data: comments, isFetching: fetchingComment , refetch : refetchComment} = useQuery(['getComment', id], async () => {
        const result = await CommentModel.getCommentByImageId(id)
        return result.data.comments
    }, {
        initialData: [],
        enabled: !!id
    })
    const [showCommentList, toggleShowComment] = useState(false);
    const [isEdit, toggleEdit] = useState(false);

    const handleDownload = useCallback((e) => {
        e.stopPropagation();
        if (detail.srcImage) {
            /* TODO : need change name image to unique */
            FileSaver.saveAs(detail.srcImage, "image")
        }
    }, [])
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        console.log('effect run1')
        socket.on(SOCKET_EVENT.CONNECT, (e) => {
            setIsConnected(true);
        })
        socket.on(SOCKET_EVENT.DISCONNECT, () => {
            setIsConnected(false);
        });
        return () => {
            socket.off(SOCKET_EVENT.CONNECT);
            socket.off(SOCKET_EVENT.DISCONNECT);
        };
    }, [])

    useEffect(() => {
        console.log('effect run2')

        if (isConnected) {
            socket.emit(SOCKET_EVENT.JOIN_ROOM, id);
            socket.on(SOCKET_EVENT.SEND_COMMENT_TO_CLIENT, (newComment) => {
                // setCommentSt([newComment,...commentsSt ])
                refetchComment()
                console.log('nhan duoc comment khac tu server', newComment)
            })

            socket.on(SOCKET_EVENT.SEND_REPLY_TO_CLIENT, (newComment) => {
                refetchComment()
                // setCommentSt([newComment,...commentsSt])
                console.log('nhan duoc comment reply khac tu server', newComment)
            })
            socket.on(SOCKET_EVENT.SEND_EDIT_HEADER_TO_CLIENT, (newHeader) => {
                refetchImage()
                toggleEdit(false)
                console.log('nhan duoc header moi tu server', newHeader)

            })
        }
        return () => {
            socket.off(SOCKET_EVENT.JOIN_ROOM);
            socket.off(SOCKET_EVENT.SEND_COMMENT_TO_CLIENT);
            socket.off(SOCKET_EVENT.SEND_REPLY_TO_CLIENT);
            socket.off(SOCKET_EVENT.SEND_EDIT_HEADER_TO_CLIENT);
        }
    }, [socket, isConnected , id])

    function createComment(comment) {
        socket.emit(SOCKET_EVENT.CREATE_COMMENT, comment)
    }

    const titleInputEditRef = useRef()
    const descriptionInputEditRef = useRef()

    function editHeader(headerContent) {
        const title = titleInputEditRef.current.value;
        const description = descriptionInputEditRef.current.value
        if (!title) {
            titleInputEditRef.current.focus()
            return false
        }
        if (!description) {
            descriptionInputEditRef.current.focus()
            return false

        }
        socket.emit(SOCKET_EVENT.EDIT_HEADER, { title , description , id : id})
    }


    if (isFetching || fetchingComment) return <CircularProgress className='selfCenter'/>
    if (!detail) return <h1> ID invalid </h1>
    return (
        <ImageContext.Provider value={
            {
                imageId: id,
                createCommentFunc: createComment,
                editHeader: editHeader
            }
        }>
            <BoxStyled>
                <Grid container spacing={2} className='imageWrap'>
                    <Grid item xs={12} md={6} style={{padding: '20px'}}>
                        <img src={detail?.srcImage} alt="pin"/>
                    </Grid>
                    <Grid item xs={12} md={6} style={{padding: '20px'}}>
                        {
                            !isEdit ?
                                <>
                                    {/*====================Action==================================*/}
                                    <FlexStyled justifyContent='space-between' alignItems='center'>
                                        <FlexStyled gap={'4px'}>
                                            <IconButtonStyled bgColor={PALLET.GRAY} color={PALLET.BLACK}
                                                              onClick={handleDownload}>Download</IconButtonStyled>
                                            <IconButtonStyled bgColor={PALLET.GRAY}
                                                              onClick={() => toggleEdit(true)}>Edit</IconButtonStyled>
                                        </FlexStyled>


                                        <TextStyled fontSize={'12px'} fontWeight={400}
                                                    color='gray'>{new Date(detail?.updatedAt).toLocaleString()}</TextStyled>
                                    </FlexStyled>
                                    <br/>
                                    {/*===================Description===============================*/}
                                    {
                                        detail.title ? <TextStyled fontSize={'36px'}
                                                                   fontWeight={700}>{detail.title}</TextStyled>
                                            : <TextStyled fontSize={'36px'}
                                                          fontWeight={700}
                                                          color={PALLET.GRAY}>{'Not have name yet'}</TextStyled>

                                    }
                                    <br/>
                                    {
                                        detail.description ? <TextStyled fontSize={'16px'}
                                                                         fontWeight={400}>{detail.description}</TextStyled>
                                            : <TextStyled fontSize={'16px'}
                                                          fontWeight={400}
                                                          color={PALLET.GRAY}>Not have description yet</TextStyled>
                                    }


                                    {/*==================Comment============================*/}
                                    <br/>
                                    <FlexStyled gap={'8px'} alignItems={'center'}>
                                        <TextStyled fontWeight={600}
                                                    fontSize={'20px'}>{comments.length} Comments</TextStyled>
                                        <BtnArrowIconStyled bgColor={'#fff'}
                                                            onClick={() => toggleShowComment(!showCommentList)}>
                                            <ArrowDownward
                                                style={{
                                                    transition: 'all 0.3s ease',
                                                    transform: showCommentList ? "rotate(0deg)" : "rotate(-90deg)"
                                                }}/>
                                        </BtnArrowIconStyled>
                                    </FlexStyled>
                                    <br/>
                                    {showCommentList &&
                                        <CommentBlockWrapper flexDirection={'column'} gap={'20px'}>
                                            {comments.map((comment, index) => <Comment comment={comment}
                                                                                       key={index}/>)}
                                        </CommentBlockWrapper>
                                    }
                                    <br/>
                                    <br/>
                                    <AddComment/>
                                </>
                                : <>
                                <FormWrapper flexDirection='column'>
                                    <FlexStyled alignItems='center'>
                                        <label htmlFor='title'>Title</label>
                                        <input type="text" name="title" ref={titleInputEditRef}/>
                                    </FlexStyled>
                                    <FlexStyled alignItems='center'>
                                        <label htmlFor='description'>Description</label>
                                        <textarea name="description" id="description" cols="30" rows="5" ref={descriptionInputEditRef}/>
                                    </FlexStyled>
                                    <FlexStyled gap={'4px'} justifyContent={'center'}>
                                        <IconButtonStyled bgColor={PALLET.RED}
                                                          color={PALLET.WHITE} onClick={()=>editHeader()}>Save</IconButtonStyled>
                                        <IconButtonStyled bgColor={PALLET.GRAY}
                                                          onClick={() => toggleEdit(false)}>Cancel</IconButtonStyled>
                                    </FlexStyled>
                                </FormWrapper>
                                </>
                        }
                    </Grid>
                </Grid>
            </BoxStyled>
            <br/>
            <br/>
            <TextStyled fontWeight={700} fontSize={'24px'} className={'ml-4'}>More like this</TextStyled>
            <Mainboard pins={references}/>
        </ImageContext.Provider>

    );
}

export default ImageDetail;

const CommentBlockWrapper = styled(FlexStyled)`
  box-sizing: border-box;
  height: 500px;
  //overflow: hidden;
  overflow-y: scroll;
`

const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 30px;

  .imageWrap {
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
    border-radius: 20px;
    width: 65vw;
    height: max-content;
  }

  @media (max-width: 768px) {
    padding-top: 10px;
    .imageWrap {
      width: 90vw;
    }
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
`;


const BtnArrowIconStyled = styled(IconButtonStyled)`
  :hover {
    background-color: #d9d9d9;
  }
`