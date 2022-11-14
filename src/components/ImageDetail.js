import React, {useCallback, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {FlexStyled} from "../styledCss/FlexStyled";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";
import {TextStyled} from "../styledCss/TextStyled";
import {ArrowDownward} from "@material-ui/icons";
import Comment from "./Comment";
import AddComment from "./AddComment";
import FileSaver from 'file-saver'
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const defaultImage = {
    title: "abcasmnd",
    srcImage: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxOTk2Mzl8MHwxfHNlYXJjaHwxMHx8Y2F0c3xlbnwwfHx8fDE2Njg0MzIzMjE&ixlib=rb-4.0.3&q=80&w=1080",
    updated_at: "2018-05-14T22:15:19Z",
    description: 'aabsjakcb',
    category: ' boy'
}


function ImageDetail({...props}) {
    const {id} = useParams()
    const {data, isFetching} = useQuery(['getImageDetail', id], () => {
            return defaultImage
        },
        {
            initialData: defaultImage,
            enabled: !!id
        }
    )
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
        if (data.srcImage) {
            /* TODO : need change name image to unique */
            FileSaver.saveAs(data.srcImage, "image")
        }
    }, [data.srcImage])
    return (
        <BoxStyled>
            <Grid container spacing={2} className='imageWrap'>
                <Grid item xs={12} md={6} style={{padding: '20px'}}>
                    <img src={data?.srcImage} alt="pin"/>
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
                                                color='gray'>{new Date(data?.updated_at).toLocaleString()}</TextStyled>
                                </FlexStyled>
                                <br/>
                                {/*===================Description===============================*/}
                                {
                                    data.title ? <TextStyled fontSize={'36px'}
                                                             fontWeight={700}>{data.title}</TextStyled>
                                        : <TextStyled fontSize={'36px'}
                                                      fontWeight={700}
                                                      color={PALLET.GRAY}>{'Not have name yet'}</TextStyled>

                                }
                                <br/>
                                {
                                    data.description ? <TextStyled fontSize={'16px'}
                                                                   fontWeight={400}>{data.description}</TextStyled>
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
                                    <IconButtonStyled bgColor={PALLET.GRAY}
                                                      onClick={() => toggleEdit(false)}>Cancel</IconButtonStyled>
                                </FlexStyled>
                            </>
                    }
                </Grid>
            </Grid>
        </BoxStyled>
    );
}

export default ImageDetail;

const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 30px;
  .imageWrap{
    box-shadow:rgb(0 0 0 / 10%) 0px 1px 20px 0px ;
    border-radius: 20px;
    width: 65vw;
    height: max-content;
  }
  @media (max-width: 768px){
    padding-top: 10px;
    .imageWrap{
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