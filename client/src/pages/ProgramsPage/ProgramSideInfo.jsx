import React from "react";
import Fade from 'react-reveal/Fade';
import {CalendarWeek, GeoAltFill, PencilSquare, PeopleFill} from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from "../../components/Dot";
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import {
    Wrapper,
    Title,
    Avatar,
    Subtitle,
    Text,
    ProgramSection,
    TagContainer
} from "../../design-system/container/SideInfo";

const ProgramSideInfo = (props) => {
    const { program, programsColorKey } = props;

    const totalAssigned = () => {
        let instructorCount = 0;
        let slotCount = 0;
        program.session.forEach((e) => {
            instructorCount += e.instructorCount;
            slotCount += e.slotCount
        })

        return instructorCount.toString() + "/" + slotCount.toString();
    }

    if (!program) {
        return (
            <></>
        )
    }

    return (
        <Wrapper>
            <Fade right duration={200}>
                <div>
                    <Title>
                        {program.name}
                    </Title>
                    <Button variant="info">Edit Program
                        <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>
                    <div style={{margin: "2rem 0"}}>
                        <Avatar src={program.logo} />
                    </div>
                    <Subtitle>
                        <PeopleFill/><span style={{marginLeft: '1rem'}}>{totalAssigned()} instructors</span>
                    </Subtitle>
                    { program.session.map((e, idx) =>
                        <ProgramSection key={idx} programColor={programsColorKey[e.program]}>
                            <Subtitle>{e.partner}</Subtitle>
                            <Text><CalendarWeek/><span style={{marginLeft: '1rem'}}>{formatAvailability(e.time)}</span></Text>
                            <Text>
                                <PeopleFill/><span style={{marginLeft: '1rem'}}>{e.instructorCount}/{e.slotCount}  instructors</span>
                            </Text>
                            <TagContainer>
                                {e.type === "Private" && <Badge pill variant="success">Private</Badge>}
                                {e.type === "Public" && <Badge pill variant="warning">Public</Badge>}
                                {e.type === "DFS" && <Badge pill variant="info">DFS</Badge>}
                                {e.type === "Housing" && <Badge pill variant="secondary">Housing</Badge>}
                                {e.type === "Non-profit" && <Badge pill variant="primary">Non-Profit</Badge>}
                                {e.district && <Badge pill variant="info">{e.district}</Badge>}
                            </TagContainer>
                        </ProgramSection>
                    )}
                </div>
            </Fade>
        </Wrapper>
    )
}

export default ProgramSideInfo;