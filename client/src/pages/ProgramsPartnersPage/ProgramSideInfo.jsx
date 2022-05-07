import React from 'react';
// import Fade from 'react-reveal/Fade';
import {
    CalendarWeek,
    GeoAltFill,
    PencilSquare,
    PeopleFill,
    Trash,
    Clipboard,
} from 'react-bootstrap-icons';
import { Button, Badge, Modal } from 'react-bootstrap';
import { formatAvailability } from '../../util/formatData';
import {
    Wrapper,
    Title,
    Avatar,
    Subtitle,
    Text,
    ProgramSection,
} from '../../design-system/components/SideInfo';
import { partnerSymbols } from '../../constant';

const ProgramSideInfo = (props) => {
    const { program, onDeletePress } = props;
    const [imageBase64, setImageBase64] = React.useState(null);
    const [deleteShow, setDeleteShow] = React.useState(false);
    const [currentClassId, setCurrentClassId] = React.useState(null);

    React.useEffect(() => {
        if (program)
            setImageBase64(
                new Buffer.from(program.logo.data).toString('ascii')
            );
    }, [program]);

    const totalAssigned = () => {
        let instructorCount = 0;
        program.classes.forEach((e) => {
            instructorCount += e.instructorsNeeded;
        });

        return instructorCount.toString();
    };

    if (!program) {
        return <></>;
    }

    /**
     * Returns a string defining how many instructors are needed for a program's class.
     */
    function formatInstructorsNeededString(instructorCount) { 
        return (instructorCount === 0) ? 'No instructor count defined.' : `Instructors needed: ${instructorCount}`
    }

    const onDuplicateClass = (data, duplicate) => {
        const classData = { ...data, duplicate };
        props.openModal('ClassToProgram', classData);
    };

    const onDeleteClass = () => {
        if (currentClassId) {
            onDeletePress('CLASS', currentClassId);
        } else {
            onDeletePress('PROGRAM', program.programId);
        }
        setDeleteShow(false);
    };

    const onDeleteShow = (classId) => {
        setCurrentClassId(classId);
        setDeleteShow(true);
    };

    return (
        <Wrapper>
            {/* <Fade right duration={200}> */}
            <div>
                <Title>{program.name}</Title>
                <Button
                    variant="danger"
                    onClick={() => onDeleteShow(null)}
                    data-testid="deleteProgram">
                    Delete Program
                    <span style={{ marginLeft: '0.5rem' }}>
                        <Trash />
                    </span>
                </Button>
                <div style={{ margin: '2rem 0' }}>
                    <Avatar src={imageBase64} />
                </div>
                <Subtitle>
                    <PeopleFill />
                    <span style={{ marginLeft: '1rem' }}>
                        {totalAssigned()} instructors
                    </span>
                </Subtitle>
                <Button
                    variant="info"
                    onClick={() => props.openModal('ClassToProgram')}
                    data-testid="addClass">
                    Add Classes
                    <span style={{ marginLeft: '0.5rem' }}>
                        <PencilSquare />
                    </span>
                </Button>

                {program.classes.map((e, idx) => (
                    <ProgramSection key={idx}>
                        <Subtitle>
                            {partnerSymbols[e.partner.type]} {e.partner.name}
                        </Subtitle>
                        <Text>
                            <PeopleFill />
                            <span style={{ marginLeft: '1rem' }}>
                                formatInstructorsNeededString(e.instructorsNeeded)
                            </span>
                        </Text>
                        <Text>
                            <CalendarWeek />
                            {formatAvailability(e.timings).map((e, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        <span style={{ marginLeft: '1rem' }}>
                                            {e}
                                        </span>
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </Text>
                        <Badge
                            style={{ marginTop: '1rem' }}
                            variant="secondary">
                            {e.partner.district}
                        </Badge>
                        <div style={{ marginTop: '1rem' }}>
                            <Button
                                size="sm"
                                style={{
                                    marginRight: '0.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                onClick={() => onDuplicateClass(e, false)}
                                data-testid="editClass">
                                Edit
                                <span style={{ marginLeft: '0.5rem' }}>
                                    <PencilSquare />
                                </span>
                            </Button>
                            <Button
                                variant="danger"
                                style={{
                                    marginRight: '0.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                size="sm"
                                onClick={() => onDeleteShow(e.classId)}
                                data-testid="deleteClass">
                                Delete
                                <span style={{ marginLeft: '0.5rem' }}>
                                    <Trash />
                                </span>
                            </Button>
                            <Button
                                variant="success"
                                size="sm"
                                style={{
                                    marginRight: '0.5rem',
                                    marginBottom: '0.5rem',
                                }}
                                onClick={() => onDuplicateClass(e, true)}
                                data-testid="duplicateClass">
                                Duplicate
                                <span style={{ marginLeft: '0.5rem' }}>
                                    <Clipboard />
                                </span>
                            </Button>
                        </div>
                    </ProgramSection>
                ))}

                <Modal
                    show={deleteShow}
                    onHide={() => setDeleteShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header
                        closeButton
                        style={{ padding: '2rem 3rem 0 3rem', border: '0' }}>
                        <Modal.Title>Delete Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '1rem 3rem' }}>
                        Do you want to delete this{' '}
                        {currentClassId ? 'class' : 'program'}?
                    </Modal.Body>
                    <Modal.Footer style={{ border: '0' }}>
                        <Button
                            variant="light"
                            onClick={() => setDeleteShow(false)}>
                            Close
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => onDeleteClass()}
                            data-testid="deleteConfirm">
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* </Fade> */}
        </Wrapper>
    );
};

export default ProgramSideInfo;
