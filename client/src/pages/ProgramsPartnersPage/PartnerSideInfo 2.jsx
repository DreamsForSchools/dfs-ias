import React from "react";
import Fade from 'react-reveal/Fade';
import {
    PencilSquare,
    CalendarWeek,
    TelephoneFill,
    X,
    Check,
    GeoAltFill,
    PeopleFill,
    Trash
} from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from '../../design-system/dots';
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import { Wrapper, Title, Image, Subtitle, PartnerProgramSection, Text, BadgeContainer, PartnerSymbol } from "../../design-system/components/SideInfo";
import {partnerSymbols} from "../../constant";

const PartnerSideInfo = (props) => {
    const { partner, onDeletePress } = props;

    if (!partner) {
        return (
            <></>
        )
    }

    const totalAssigned = () => {
        let instructorCount = 0;
        partner.classes.forEach((e) => {
            instructorCount += e.instructorsNeeded;
        })

        return instructorCount.toString();
    }

    return (
        <Wrapper>
            <Fade right duration={200}>
                <div>
                    <Badge style={{marginTop: '1rem', display: 'block'}} variant="secondary">{partner.district}</Badge>
                    <Title>
                        { partner.name }
                    </Title>
                    {/*<Button variant="info">Edit Partner*/}
                    {/*    <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>*/}
                    {/*</Button>*/}
                    <Button variant="danger" onClick={() => onDeletePress("PARTNER", partner.partnerId)}>Delete Partner
                        <span style={{marginLeft: '0.5rem'}}><Trash/></span>
                    </Button>
                    <div style={{margin: "2rem 0"}}>
                        <PartnerSymbol>{partnerSymbols[partner.partnerType]}️</PartnerSymbol>
                    </div>
                    <Subtitle>
                        <PeopleFill/><span style={{marginLeft: '1rem'}}>{totalAssigned()} instructors</span>
                    </Subtitle>
                    <Subtitle>
                        <GeoAltFill/><span style={{marginLeft: '1rem'}}>{partner.street}, {partner.city}, {partner.state} {partner.zip}</span>
                    </Subtitle>
                    <Button variant="info" onClick={() => props.openModal('ClassToPartner')}>Add Classes
                        <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>
                    { partner.classes.map((e, idx) =>
                        <PartnerProgramSection key={idx} programColor={e.program.color}>
                            <Subtitle>{e.program.name}</Subtitle>
                            <Text>
                                <PeopleFill/><span style={{marginLeft: '1rem'}}>{e.instructorsNeeded} instructors needed</span>
                            </Text>
                            <Text><CalendarWeek/>

                                { formatAvailability(e.timings).map((e, idx) => {
                                    return (<><span key={idx} style={{marginLeft: '1rem'}}>{e}</span><br/></>)
                                })}
                                </Text>
                        </PartnerProgramSection>
                    )}
                </div>
            </Fade>
        </Wrapper>
    )
}

export default PartnerSideInfo;