import React, {useState} from "react";
import "./Pin.css";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import {ButtonStyled} from '../styledCss/ButtonStyled'
import {PALLET} from "../styledCss/Theme";

function Pin(props) {
    let {urls} = props;
    const [isZoomIn, toggleZoomIn] = useState(false);
    return (
        <>
            <div className="pin">
                <div className="pin__container" onClick={() => toggleZoomIn(true)}>
                    <img src={urls?.regular} alt="pin"/>
                </div>
            </div>
            <ModalStyled open={isZoomIn} onClose={() => toggleZoomIn(false)}>
                <Fade in={isZoomIn}>
                    <BoxStyled>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <ImageBgrStyled img={urls?.regular}/>
                                {/*<img src={urls?.regular} alt="pin"/>*/}
                            </Grid>
                            <Grid item xs={6}>
                                description
                                <ModalFooterStyled>
                                    <ButtonStyled bgColor={PALLET.RED} color={"#fff"}>Ok</ButtonStyled>
                                    <ButtonStyled bgColor={PALLET.WHITE}>Huy</ButtonStyled>
                                </ModalFooterStyled>
                            </Grid>
                        </Grid>
                    </BoxStyled>
                </Fade>
            </ModalStyled>
        </>
    );
}

export default Pin;

const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  min-width: 65vw;
  height: 85vh;
  outline: 0;
  overflow: hidden;

  //img {
  //  display: block;
  //  width: 100%;
  //  height: 100%;
  //}

`;

const ModalStyled = styled(Modal)`
  outline: 0;
`;
const ImageBgrStyled = styled.div`
  width: 100%;
  height: 85vh;
  background-image: url(${props => props.img || ''});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`
const ModalFooterStyled = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center
`