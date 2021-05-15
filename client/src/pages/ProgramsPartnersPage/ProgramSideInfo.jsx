import React from "react";
import Fade from 'react-reveal/Fade';
import {CalendarWeek, GeoAltFill, PencilSquare, PeopleFill} from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
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
} from "../../design-system/components/SideInfo";

const ProgramSideInfo = (props) => {
    const { program, programsColorKey } = props;
    const [ imageBase64, setImageBase64 ] = React.useState(null);

    React.useEffect(() => {
        if(program) setImageBase64(new Buffer.from(program.logo.data).toString("ascii"));
    }, [program]);

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
                    <div style={{margin: "2rem 0"}}>
                        <Avatar src={imageBase64} />
                    </div>
                    <Button variant="info" onClick={() => props.openModal('PartnerToProgram')}>Add Classes
                        <span style={{marginLeft: '0.5rem'}}><PencilSquare/></span>
                    </Button>
                    {/*<Subtitle>*/}
                    {/*    <PeopleFill/><span style={{marginLeft: '1rem'}}>{totalAssigned()} instructors</span>*/}
                    {/*</Subtitle>*/}
                    {/*{ program.session.map((e, idx) =>*/}
                    {/*    <ProgramSection key={idx} programColor={programsColorKey[e.program]}>*/}
                    {/*        <Subtitle>{e.partner}</Subtitle>*/}
                    {/*        <Text><CalendarWeek/><span style={{marginLeft: '1rem'}}>{formatAvailability(e.time)}</span></Text>*/}
                    {/*        <Text>*/}
                    {/*            <PeopleFill/><span style={{marginLeft: '1rem'}}>{e.instructorCount}/{e.slotCount}  instructors</span>*/}
                    {/*        </Text>*/}
                    {/*        <TagContainer>*/}
                    {/*            {e.type === "Private" && <Badge pill variant="success">Private</Badge>}*/}
                    {/*            {e.type === "Public" && <Badge pill variant="warning">Public</Badge>}*/}
                    {/*            {e.type === "DFS" && <Badge pill variant="info">DFS</Badge>}*/}
                    {/*            {e.type === "Housing" && <Badge pill variant="secondary">Housing</Badge>}*/}
                    {/*            {e.type === "Non-profit" && <Badge pill variant="primary">Non-Profit</Badge>}*/}
                    {/*            {e.district && <Badge pill variant="info">{e.district}</Badge>}*/}
                    {/*        </TagContainer>*/}
                    {/*    </ProgramSection>*/}
                    {/*)}*/}
                </div>
            </Fade>
        </Wrapper>
    )
}

export default ProgramSideInfo;