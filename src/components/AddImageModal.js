import React, {useRef, useState} from 'react';
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import {FlexStyled} from "../styledCss/FlexStyled";
import {IconButtonStyled} from "../styledCss/ButtonStyled";
import {PALLET} from "../styledCss/Theme";
import {BoxStyled, ModalStyled} from "./Pin";
import {FormWrapper} from "./AddComment";
import styled from "styled-components";
import ImageUploading from "react-images-uploading";
import {Close, CloudUploadOutlined} from "@material-ui/icons";
import {TextStyled} from "../styledCss/TextStyled";
import IconButton from "@material-ui/core/IconButton";

function AddImageModal({visible, setVisible}) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const [image, setImage] = useState()
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImage(imageList);
    };

    function handleUploadImage() {
        if (!titleRef) {

        }
        if (!descriptionRef) {

        } else {
            /* TODO : upload image*/
        }
    }

    return (
        <ModalStyled open={visible} onClose={() => setVisible(false)}>
            <Fade in={visible}>
                <BoxExtendStyled>
                    <Grid container spacing={2} >
                        <Grid item xs={12} md={6} style={{padding: '20px'}}>
                            <FlexStyled alignItems={'center'} justifyContent={'center'}
                                        flexDirection={'column'} style={{height : '100%'}} >
                                <ImageUploading
                                    multiple
                                    value={image}
                                    onChange={onChange}
                                    maxNumber={1}
                                    dataURLKey="data_url"
                                    acceptType={["jpg"]}
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
                        </Grid>
                        <Grid item xs={12} md={6} style={{padding: '32px'}}>
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
                                <IconButtonStyled bgColor={PALLET.GRAY}
                                                  onClick={() => setVisible(false)}>Cancel</IconButtonStyled>
                            </FlexStyled>

                        </Grid>
                    </Grid>
                </BoxExtendStyled>
            </Fade>
        </ModalStyled>
    );
}

const FormAddImage = styled(FormWrapper)`
  label {
    width: 70px;
  }

`
const BoxExtendStyled = styled(BoxStyled)`
  
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
`
export default AddImageModal;