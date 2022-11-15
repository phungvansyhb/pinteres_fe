import React, {useCallback, useState} from 'react';
import {useQuery} from "react-query";
import Image from "../api/Image";
import Mainboard from "./Mainboard";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import CategoryItem, {CategoryItemStyled} from "./CategoryItem";
import {FlexExtend} from "./Home";
import {PALLET} from "../styledCss/Theme";


const K16Category = [
    {label: 'pretty', value: 'pretty'},
    {label: 'oversensitive', value: 'oversensitive'},
    {label: 'ripe', value: 'ripe'}
]
const K16Member = [
    {label: "  Bùi An", value: "bui - an"},
    {label: "  Duy Anh     ", value: "  duy - anh"},
    {label: "  Lan Anh     ", value: "  lan - anh"},
    {label: "  Ngọc Ánh    ", value: "   ngoc - anh"},
    {label: "  Đặng Dung   ", value: "   dang - dung"},
    {label: "  Tuấn Dũng   ", value: "  tuan - dung"},
    {label: "  Đức Duy     ", value: "  duc - duy"},
    {label: "  Hải Đăng    ", value: " hai - dang"},
    {label: "  Mạnh Đức    ", value: "  manh - duc"},
    {label: "  Đức Hải     ", value: " duc - hai"},
    {label: "  Vương Hải   ", value: "  vuong - hai"},
    {label: "  Kiều Hoa    ", value: "  kieu - hoa"},
    {label: "  Nguyễn Hòa  ", value: "  nguyen - hoa"},
    {label: "  Thu Hoài    ", value: "  thu - hoai"},
    {label: "  Phùng Hoàng ", value: "  phung - hoang"},
    {label: "  Nguyễn Lan  ", value: "   nguyen - lan"},
    {label: "  Lê Linh     ", value: "  le - linh"},
    {label: "  Phí Minh    ", value: "  phi - minh"},
    {label: "  Đỗ Nguyệt   ", value: "  do - nguyet"},
    {label: "  Nguyễn Nhàn ", value: "  nguyen - nhan"},
    {label: "  Yến Nhi     ", value: "  yen - nhi"},
    {label: "  Mai Phương  ", value: "  mai - phuong"},
    {label: "  Đỗ Thảo     ", value: "  do - thao"},
    {label: "  Kiều Thảo   ", value: "   kieu - thao"},
    {label: "  Nguyễn Thảo ", value: "    nguyen - thao"},
    {label: "  Thanh Thảo  ", value: "   thanh - thao"},
    {label: "  Phí Thảo    ", value: "    phi - thao"},
    {label: "  Phùng Thảo  ", value: "    phung - thao"},
    {label: " Nguyễn Thuyết", value: "   nguyen - thuyet"},
    {label: "  Kiều Trang  ", value: "      kieu - trang"},
    {label: "  Kiều Trinh  ", value: "      kieu - trinh"},
    {label: "  Mạnh Tuấn   ", value: "        manh - tuan"},
    {label: "  Anh Tuyến   ", value: "      anh - tuyen"},
    {label: "  Hoàng Vân   ", value: "      hoang - van"},
    {label: "  Hoàng Viên  ", value: "    hoang - vien"},
    {label: "  Đức Việt    ", value: "      duc - viet"},
    {label: "  Kiều Vũ     ", value: "      kieu - vu"}
]
const TYPE_FILTER = {
    CATEGORY: 'CATEGORY',
    MEMBER: 'MEMBER',
}

function K16({...props}) {
    const [nameMember, setNameMember] = useState();
    const [activeCategory, setActiveCategory] = useState();
    const {
        data,
        isFetching
    } = useQuery(['getK16Only', activeCategory, nameMember], () => {
        if (!activeCategory && !nameMember) {
            return Image.getK16Only()
        }
        if(activeCategory){
            return Image.searchByCategory(activeCategory)
        }else{
            return Image.searchByName(nameMember)
        }
    }, {initialData: []})
    const toggleState = useCallback((value, type) => {
        if (type === TYPE_FILTER.CATEGORY) {
            if (activeCategory !== value) {
                setActiveCategory(value)
                setNameMember(null)
            }
        }
        if (type === TYPE_FILTER.MEMBER) {
            if (nameMember !== value) {
                setActiveCategory(null)
                setNameMember(value)
            }
        }

    }, [])

    return (
        <K16Wrapper>
            <FlexExtend gap={'24px'} justifyContent={'center'}>
                {K16Category.map((item, index) => <CategoryItem category={item.label} activeKey={activeCategory}
                                                                toggleCategory={(value) => toggleState(value, TYPE_FILTER.CATEGORY)}
                                                                key={index}/>)}
                <CategoryItemStyled bgColor={nameMember ? PALLET.BLUE : '#fff'}
                                    color={nameMember ? PALLET.WHITE : PALLET.BLACK}
                                    className='memberBtn'
                >

                    <div>{nameMember || 'By Name'}</div>
                    <div className='memberList'>
                        {K16Member.map((item, index) => <CategoryItem category={item.label} activeKey={activeCategory}
                                                                      toggleCategory={(value) => toggleState(value, TYPE_FILTER.MEMBER)}
                                                                      key={index}/>)}
                    </div>
                </CategoryItemStyled>

            </FlexExtend>
            {isFetching ? <CircularProgress color="primary" className='selfCenter'/> :
                <Mainboard pins={data.data.images}/>
            }
        </K16Wrapper>

    );
}

const K16Wrapper = styled.div`
  .memberBtn {
    position: relative;
  }
  
  .memberList {
    display: none;
    position: relative;
    z-index: 10;
    top: 20px;
    left: 50%;
    transform: translate(-50%,0);
    column-count: 5;
    gap: 12px;
  }
  .memberBtn:hover , :active{
    .memberList{
      display: block;
    }
  }


`
const WrapSearchBoxStyled = styled.div`
  display: flex;
  gap: 12px;
  padding-left: 32px;
  padding-right: 32px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export default K16;