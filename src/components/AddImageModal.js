import React, {useRef, useState} from 'react';
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import {FlexStyled} from "../styledCss/FlexStyled";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";
import { ModalStyled} from "./Pin";
import {FormWrapper} from "./AddComment";
import styled from "styled-components";
import ImageUploading from "react-images-uploading";
import {Close, CloudUploadOutlined} from "@material-ui/icons";
import {TextStyled} from "../styledCss/TextStyled";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Image from "../api/Image";
import {useMutation} from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";
import {BoxStyled} from "./K16";

function AddImageModal({...props}) {
    // const titleRef = useRef();
    // const descriptionRef = useRef();
    // const categoryRef = useRef();
    const [image, setImage] = useState()
    const [isShowMsg, showMsg] = useState();
    const [msg, setMsg] = useState();
    const onChange = (imageList, addUpdateIndex) => {
        setImage(imageList);
    };
    const uploadImageMutation = useMutation(['uploadImage', image], (data) => Image.uploadToCloudinary(data), {})

    function handleUploadImage() {
        if (!image) {
            showMsg(true)
            setMsg(' Vui lòng chọn ảnh ' )
        } else {
            const formData = new FormData;
            formData.append('file',image)
            uploadImageMutation.mutate(formData , {
                onSuccess : ()=>{
                    showMsg(true)
                    setMsg('Tải ảnh lên thành công ' )
                },
                onError : ()=>{
                    showMsg(true)
                    setMsg('Tải ảnh lên thất bại ' )
                }
            })

        }
    }
    const keyRef = useRef();
    const errorRef = useRef();
    const key = process.env.REACT_APP_KEY_UPLOAD
    const [showModalCheckKey , setShowModalCheckKey] = useState(false)
    function checkKey() {
        if (keyRef.current.value === key) {
            setShowModalCheckKey(false)
            handleUploadImage()
        }
        else{
            errorRef.current.innerText='Key không chính xác'
        }
    }



    return (
        <BoxExtendStyled>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={isShowMsg}
                autoHideDuration={3000}
                onClose={() => showMsg(false)}
                message={msg}

            />
            <ModalStyled open={showModalCheckKey} onClose ={()=>setShowModalCheckKey(false)}>
                <Fade in={showModalCheckKey}>
                    <BoxStyled>
                        <FormWrapper style={{gap:'16px'}}>
                            <FlexStyled alignItems='center'>
                                <label htmlFor='keyK16'>Key</label>
                                <input type="text" name="keyK16" ref={keyRef}/>
                            </FlexStyled>
                            <p ref={errorRef} style={{color:"red" , fontWeight:600 , textAlign:'center'}}></p>

                            <FlexStyled justifyContent='center'>
                                <IconButtonStyled bgColor={PALLET.BLACK} color={PALLET.WHITE} type='submit'
                                                  onClick={() => checkKey()}>Check</IconButtonStyled>
                            </FlexStyled>
                        </FormWrapper>
                    </BoxStyled>
                </Fade>
            </ModalStyled>

            <Grid container spacing={2} className='formCreate'>
                <Grid item xs={12} style={{padding: '20px'}}>
                    <FlexStyled alignItems={'center'} justifyContent={'center'}
                                flexDirection={'column'} style={{minHeight: '400px'}}>
                        <ImageUploading
                            multiple
                            value={image}
                            onChange={onChange}
                            maxNumber={1}
                            dataURLKey="data_url"
                            // acceptType={["jpg , png , jpeg , svg , webp"]}
                        >
                            {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps
                              }) => (
                                <>
                                    {
                                        imageList.length === 0 && <>
                                            <CloudUploadOutlined fontSize='large' color='disabled'
                                                                 onClick={onImageUpload}
                                            />
                                            <TextStyled fontSize={'20px'} color={PALLET.GRAY}>Click Here To Upload
                                                Image
                                            </TextStyled>
                                        </>
                                    }
                                    {imageList.map((image, index) => (
                                        <div key={index} style={{padding: '12px'}}
                                             className='imageUploadContainer'>
                                            <img src={image.data_url} alt="imageUpload"/>
                                            <IconButton onClick={() => onImageRemove(index)}
                                                        className='removeImageUpload'>
                                                <Close/>
                                            </IconButton>
                                        </div>
                                    ))}
                                </>
                            )}

                        </ImageUploading>
                    </FlexStyled>
                    <FlexStyled gap={'4px'} justifyContent={'center'}>
                        <IconButtonStyled bgColor={PALLET.RED}
                                          color={PALLET.WHITE}
                                          onClick={()=>{
                                              if(image){
                                                  setShowModalCheckKey(true)
                                              }
                                          }}>{uploadImageMutation.isLoading ?
                            <CircularProgress /> : 'Save'} </IconButtonStyled>
                        <IconButtonStyled bgColor={PALLET.GRAY}>Cancel</IconButtonStyled>
                    </FlexStyled>
                </Grid>
                {/* <Grid item xs={12} md={6} style={{padding: '32px'}}>
                    <FormAddImage flexDirection='column'>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='imageTitle'>Image title</label>
                            <input type="text" name="imageTitle" ref={titleRef}/>
                        </FlexStyled>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='category'>Category</label>
                            <input type="text" name="category" ref={categoryRef}/>
                        </FlexStyled>
                        <FlexStyled alignItems='center'>
                            <label htmlFor='description'>Description </label>
                            <textarea name="description" id="content" cols="30" rows="5" ref={descriptionRef}/>
                        </FlexStyled>

                    </FormAddImage>
                    <br/>
                    <br/>
                    <FlexStyled gap={'4px'} justifyContent={'center'}>
                        <IconButtonStyled bgColor={PALLET.RED}
                                          color={PALLET.WHITE}
                                          onClick={handleUploadImage}>Save</IconButtonStyled>
                        <IconButtonStyled bgColor={PALLET.GRAY}>Cancel</IconButtonStyled>
                    </FlexStyled>

                </Grid> */}
            </Grid>
        </BoxExtendStyled>
    );
}

const FormAddImage = styled(FormWrapper)`
  label {
    width: 70px;
  }

`
const BoxExtendStyled = styled.div`
  background-color: #E9E9E9;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;

  .imageUploadContainer {
    position: relative;

    img {
      height: auto;
      width: 100%;
      position: relative;
    }
  }

  .removeImageUpload {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .formCreate {
    background-color: #fff;
    border-radius: 20px;
    width: 65vw;
    height: max-content;
  }

  @media (max-width: 768px) {
    padding-top: 20px;
    .formCreate {
      width: 90vw;
    }
  }
`
export default AddImageModal;