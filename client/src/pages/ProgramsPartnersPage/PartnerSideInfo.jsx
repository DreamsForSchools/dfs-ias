import React from "react";
import Fade from 'react-reveal/Fade';
import { PencilSquare, CalendarWeek, TelephoneFill, X, Check, GeoAltFill } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from '../../design-system/dots';
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import { Wrapper, Title, Image, Subtitle, PartnerProgramSection, Text, BadgeContainer, PartnerSymbol } from "../../design-system/components/SideInfo";
import {partnerSymbols} from "../../constant";

const PartnerSideInfo = (props) => {
    const { partner, programsColorKey } = props;

    if (!partner) {
        return (
            <></>
        )
    }

    return (
        <Wrapper>
            <Fade right duration={200}>
                <div>
                    <Title>
                        { partner.name }
                    </Title>
                    {/*<Button variant="info">Edit Partner*/}
                    {/*    <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>*/}
                    {/*</Button>*/}
                    <div style={{margin: "2rem 0"}}>
                        <PartnerSymbol>{partnerSymbols[partner.partnerType]}️</PartnerSymbol>
                    </div>
                    <BadgeContainer>
                        {partner.partnerType === "Private Schools" && <Badge pill variant="success">Private</Badge>}
                        {partner.partnerType === "Public Schools" && <Badge pill variant="warning">Public</Badge>}
                        {partner.partnerType === "DFS Programs" && <Badge pill variant="info">DFS</Badge>}
                        {partner.partnerType === "Housing Communities" && <Badge pill variant="secondary">Housing</Badge>}
                        {partner.partnerType === "Non-profit Partners" && <Badge pill variant="primary">Non-Profit</Badge>}
                        {partner.district && <Badge pill variant="info">{partner.district}</Badge>}
                    </BadgeContainer>
                    <Subtitle>
                        <GeoAltFill/><span style={{marginLeft: '1rem'}}>{partner.street}, {partner.city}, {partner.state} {partner.zip}</span>
                    </Subtitle>
                    <Button variant="info" onClick={() => props.openModal('ProgramToPartner')}>Add Classes
                        <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>
                    {/*{ partner.session.map((e, idx) =>*/}
                    {/*        <PartnerProgramSection key={idx} programColor={programsColorKey[e.program]}>*/}
                    {/*            <Subtitle>{e.program}</Subtitle>*/}
                    {/*            <Text><CalendarWeek/><span style={{marginLeft: '1rem'}}>{formatAvailability(e.time)}</span></Text>*/}
                    {/*        </PartnerProgramSection>*/}
                    {/*)}*/}
                </div>
            </Fade>
        </Wrapper>
    )
}

export default PartnerSideInfo;