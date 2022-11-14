import React, {useCallback} from "react";
import "./Pin.css";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import {IconButtonStyled} from '../styledCss/ButtonStyled'
import {PALLET} from "../styledCss/Theme";
import Forum from "@material-ui/icons/Forum";
import FileSaver from 'file-saver'
import {CloudDownload} from "@material-ui/icons";
import {useNavigate} from "react-router-dom";


function Pin(props) {
    let {urls, imageName, alt_description, created_at, updated_at, id} = props;
    const navigate = useNavigate()
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
                <div className="pin__container" onClick={() => navigate(`/pin/${id}`)}>
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

        </>
    );
}

export default Pin;

export const ModalStyled = styled(Modal)`
  outline: 0;
`;
