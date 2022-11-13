import React, {useCallback, useState} from "react";
import "./Pin.css";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import {IconButtonStyled} from '../styledCss/ButtonStyled'
import {PALLET} from "../styledCss/Theme";
import Forum from "@material-ui/icons/Forum";
import FileSaver from 'file-saver'
import {FlexStyled} from "../styledCss/FlexStyled";
import {TextStyled} from "../styledCss/TextStyled";
import Comment from "./Comment";
import {ArrowDownward, CloudDownload} from "@material-ui/icons";
import AddComment from "./AddComment";


function Pin(props) {
    let {urls, imageName, alt_description, created_at, updated_at} = props;
    const [isZoomIn, toggleZoomIn] = useState(false);
    const [showCommentList, toggleShowComment] = useState(false);
    const [isEdit, toggleEdit] = useState(false);
    const [commentLists, setCommentList] = useState([
        {
            author: "Abc",
            content: "Wow anh dep qua di!",
            time: '13/11/2022'
        },
        {
            author: "HOho",
            content: "Cam on nha",
            time: '11/11/2022'
        },
    ])
    const handleDownload = useCallback((e) => {
        e.stopPropagation();
        if (urls.regular) {
            /* TODO : need change name image to unique */
            FileSaver.saveAs(urls?.regular, "image")
        }
    }, [props.urls])
    /* TODO : call api load comment */
    return (
        <>
            <div className="pin">
                <div className="pin__container" onClick={() => toggleZoomIn(true)}>
                    <img src={urls?.regular} alt="pin"/>
                    <div className='pin__itemOverlay'>
                        <IconButtonStyled padding={'8px'} bgColor={PALLET.RED} color={PALLET.WHITE}
                                          onClick={handleDownload}>
                            <CloudDownload/>
                        </IconButtonStyled>

                        <div style={{color: PALLET.WHITE, fontWeight: 700, display: 'flex', alignItems: 'center'}}>
                            4 <Forum/>
                        </div>
                    </div>
                </div>
            </div>
            <ModalStyled open={isZoomIn} onClose={() => toggleZoomIn(false)}>
                <Fade in={isZoomIn}>
                    <BoxStyled>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} style={{padding: '20px'}}>
                                <img src={urls?.regular} alt="pin"/>
                            </Grid>
                            <Grid item xs={12} md={6} style={{padding: '20px'}}>
                                {
                                    !isEdit ?
                                        <>
                                            {/*====================Action==================================*/}
                                            <FlexStyled justifyContent='space-between' alignItems='center'>
                                                <FlexStyled gap={'4px'}>
                                                    <IconButtonStyled bgColor={PALLET.RED} color={PALLET.WHITE}
                                                                      onClick={handleDownload}>Download</IconButtonStyled>
                                                    <IconButtonStyled bgColor={PALLET.GRAY}
                                                                      onClick={() => toggleEdit(true)}>Edit</IconButtonStyled>
                                                </FlexStyled>


                                                <TextStyled fontSize={'12px'} fontWeight={400}
                                                            color='gray'>{new Date(updated_at).toLocaleString()}</TextStyled>
                                            </FlexStyled>
                                            <br/>
                                            {/*===================Description===============================*/}
                                            {
                                                imageName ? <TextStyled fontSize={'36px'}
                                                                        fontWeight={700}>{imageName}</TextStyled>
                                                    : <TextStyled fontSize={'36px'}
                                                                  fontWeight={700}
                                                                  color={PALLET.GRAY}>{'Not have name yet'}</TextStyled>

                                            }
                                            <br/>
                                            {
                                                alt_description ? <TextStyled fontSize={'16px'}
                                                                              fontWeight={400}>{alt_description}</TextStyled>
                                                    : <TextStyled fontSize={'16px'}
                                                                  fontWeight={400}
                                                                  color={PALLET.GRAY}>Not have description yet</TextStyled>
                                            }


                                            {/*==================Comment============================*/}
                                            <br/>
                                            <br/>
                                            <FlexStyled gap={'8px'} alignItems={'center'}>
                                                <TextStyled fontWeight={600}
                                                            fontSize={'20px'}>{commentLists.length} Comments</TextStyled>
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
                                            <br/>
                                            {showCommentList &&
                                                <FlexStyled flexDirection={'column'} gap={'24px'}>
                                                    {commentLists.map((comment, index) => <Comment comment={comment}
                                                                                                   key={index}/>)}
                                                </FlexStyled>
                                            }
                                            <br/>
                                            <br/>
                                            <AddComment/>
                                        </>
                                        : <>
                                            Editing
                                            <FlexStyled gap={'4px'} justifyContent={'center'}>
                                                <IconButtonStyled bgColor={PALLET.RED}
                                                                  color={PALLET.WHITE}>Save</IconButtonStyled>
                                                <IconButtonStyled bgColor={PALLET.GRAY} onClick={()=>toggleEdit(false)}>Cancel</IconButtonStyled>
                                            </FlexStyled>
                                        </>
                                }
                            </Grid>
                        </Grid>
                    </BoxStyled>
                </Fade>
            </ModalStyled>
        </>
    );
}

export default Pin;

export const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  width: 65vw;
  min-width: 350px;
  height: 85vh;
  outline: 0;
  overflow: hidden;
  overflow-y: auto;
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
export const ModalStyled = styled(Modal)`
  outline: 0;
`;
