import React from "react";
import { Wrapper, Title, Image, DotWrapper, ContentWrapper, PartnerSymbol } from './Styled';
import Dot from '../../../dots';
import { partnerSymbols } from "../../../../constant";
import {Badge} from "react-bootstrap";

export const PartnerCard = ({ item, onClick }) => {
   return (
        <Wrapper onClick={() => onClick(item.partnerId)}>
            <PartnerSymbol>{partnerSymbols[item.partnerType]}️</PartnerSymbol>
            <ContentWrapper>
                <Title>{item.name}</Title>
                <Badge style={{margin: '0.5rem 0'}} variant="secondary">{item.district}</Badge>
                <DotWrapper>
                    {item.classes.map((e, idx) =>
                        <Dot color={e.program.color} key={idx}/>
                    )}
                </DotWrapper>
            </ContentWrapper>
        </Wrapper>
    )
}