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

function Pin({srcImage, title, description, createdAt, updatedAt, _id, amountComment, ...props}) {
    const navigate = useNavigate()
    const handleDownload = useCallback((e) => {
        e.stopPropagation();
        if (srcImage) {
            FileSaver.saveAs(srcImage, title || 'image' + Date.now().toString())
        }
    }, [srcImage])
    /* TODO : call api load comment */
    return (
        <>
            <div className="pin">
                <div className="pin__container" onClick={() => navigate(`/image/${_id}`)}>
                    <img src={srcImage} alt="pin"/>
                    <div className='pin__itemOverlay'>
                        <IconButtonStyled padding={'8px'} bgColor={PALLET.RED} color={PALLET.WHITE}
                                          onClick={handleDownload}>
                            <CloudDownload/>
                        </IconButtonStyled>

                        <div style={{color: PALLET.WHITE, fontWeight: 700, display: 'flex', alignItems: 'center'}}>
                            {amountComment} <Forum/>
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
