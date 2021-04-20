import React from "react";
import { Wrapper, Title, Image, DotWrapper } from './Styled';
import Dot from '../../../dots';

// dummy data
import { PROGRAM_COLOR_KEYS } from "../../../../data/PROGRAMS";

export const PartnerCard = ({ item, onClick }) => {
   return (
        <Wrapper onClick={() => onClick(item)}>
            <Image src={item.logo} className={"partner-image"}/>
            <Title>{item.name}</Title>
            <DotWrapper>
                {item.session.map((el, idx) =>
                    <Dot color={PROGRAM_COLOR_KEYS[el.program]} key={idx}/>
                )}
            </DotWrapper>
        </Wrapper>
    )
}