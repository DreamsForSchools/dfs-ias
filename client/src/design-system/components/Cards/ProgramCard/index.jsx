import React from "react";
import { Wrapper, Title, Image} from './Styled';
import {ProgramSection, TagContainer} from "../../SideInfo";
import {Badge} from "react-bootstrap";
// dummy data


export const ProgramCard = ({ item, onClick }) => {
   return (
        <Wrapper onClick={() => onClick(item)}>
            <Image src={item.logo}/>
            <Title>{item.name}</Title>
        </Wrapper>
    )
}