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
    Trash, Clipboard
} from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge, Modal } from 'react-bootstrap';
import Dot from '../../design-system/dots';
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import { Wrapper, Title, Image, Subtitle, PartnerProgramSection, Text, BadgeContainer, PartnerSymbol } from "../../design-system/components/SideInfo";
import {partnerSymbols} from "../../constant";

const PartnerSideInfo = (props) => {
    const { partner, onDeletePress } = props;
    const [ deleteShow, setDeleteShow ] = React.useState(false);

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

    const onDuplicatePartner= (data, duplicate) => {
        const partnerData = { ...data, duplicate };
        props.openModal('Partners', partnerData);
    }

    const onDeletePartner = () => {
        onDeletePress("PARTNER", partner.partnerId)
        setDeleteShow(false);
    }

    return (
        <Wrapper>
            <Fade right duration={200}>
                <div>
                    <Badge style={{marginTop: '1rem', display: 'block'}} variant="secondary">{partner.district}</Badge>
                    <Title>
                        { partner.name }
                    </Title>
                    <div style={{ margin: '1rem 0' }}>
                        <Button  style={{ width: '12rem' }} onClick={() => onDuplicatePartner(partner, false)} data-testid="editPartner">Edit Partner
                            <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                        </Button>
                    </div>
                    <div style={{ margin: '1rem 0' }}>
                        <Button  style={{ width: '12rem' }} variant="danger" onClick={() => setDeleteShow(true)} data-testid="deletePartner">Delete Partner
                            <span style={{marginLeft: '0.5rem'}}><Trash/></span>
                        </Button>
                    </div>
                    <div style={{ margin: '1rem 0' }}>
                        <Button style={{ width: '12rem' }} variant="success" onClick={() => onDuplicatePartner(partner, true)} data-testid="duplicatePartner">Duplicate Partner
                            <span style={{marginLeft: '0.5rem'}}><Clipboard/></span>
                        </Button>
                    </div>
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

                    <Modal show={deleteShow}
                           onHide={() => setDeleteShow(false)}
                           aria-labelledby="contained-modal-title-vcenter"
                           centered>
                        <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                            <Modal.Title>Delete Confirm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{padding: '1rem 3rem'}}>Do you want to delete this partner?</Modal.Body>
                        <Modal.Footer style={{border: '0'}}>
                            <Button variant="light" onClick={() => setDeleteShow(false)}>
                                Close
                            </Button>
                            <Button variant="danger"
                                    onClick={() => onDeletePartner()} data-testid="deletePartnerConfirm">
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Fade>
        </Wrapper>
    )
}

export default PartnerSideInfo;
