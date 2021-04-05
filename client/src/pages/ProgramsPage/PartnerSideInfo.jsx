import React from "react";
import Fade from 'react-reveal/Fade';
import { PencilSquare, CalendarWeek, TelephoneFill, X, Check, GeoAltFill } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from "../../components/Dot";
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import { Wrapper, Title, Image, Subtitle, PartnerProgramSection, Text, BadgeContainer } from "../../design-system/components/SideInfo";

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
                    <Button variant="info">Edit Partner
                        <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>
                    <div style={{margin: "2rem 0"}}>
                        <Image src={partner.logo} />
                    </div>
                    <BadgeContainer>
                        {partner.type === "Private" && <Badge pill variant="success">Private</Badge>}
                        {partner.type === "Public" && <Badge pill variant="warning">Public</Badge>}
                        {partner.type === "DFS" && <Badge pill variant="info">DFS</Badge>}
                        {partner.type === "Housing" && <Badge pill variant="secondary">Housing</Badge>}
                        {partner.type === "Non-profit" && <Badge pill variant="primary">Non-Profit</Badge>}
                        {partner.district && <Badge pill variant="info">{partner.district}</Badge>}
                    </BadgeContainer>
                    <Subtitle>
                        <GeoAltFill/><span style={{marginLeft: '1rem'}}>{partner.address}</span>
                    </Subtitle>
                    { partner.session.map((e, idx) =>
                            <PartnerProgramSection key={idx} programColor={programsColorKey[e.program]}>
                                <Subtitle>{e.program}</Subtitle>
                                <Text><CalendarWeek/><span style={{marginLeft: '1rem'}}>{formatAvailability(e.time)}</span></Text>
                            </PartnerProgramSection>
                    )}
                </div>
            </Fade>
        </Wrapper>
    )
}

export default PartnerSideInfo;