import React, {useState, useContext} from 'react';
import './Instructors.scss';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import {Page, SideInfoWrapper, Wrapper} from '../../design-system/layout/Styled';
import {getRandomInstructorSet} from "../../util/sampleData";
import {FormControl, InputGroup, Button, OverlayTrigger, Popover} from "react-bootstrap";
import {PlusCircle, Filter, Search, FileEarmarkTextFill, CloudUploadFill, Link45deg} from 'react-bootstrap-icons';
import AddInstructorManuallyModal from "../../components/AddInstructorManuallyModal";
import {PROGRAM_COLOR_KEYS as program_color_keys} from '../../data/PROGRAMS';
import {Modal} from "react-bootstrap";
import {GlobalContext} from "../../context/GlobalContextProvider";

function Instructors() {
    const {seasonNameSelected, seasonIdSelected} = useContext(GlobalContext);

    const [instructorFocus, setInstructorFocus] = useState();
    const [instructorData, setInstructorData] = useState(null);
    const [showInputModal, setShowInputModal] = useState();
    const [addInstructorMethod, setAddInstructorMethod] = useState(null);

    const handleCloseInputModal = () => {
        setShowInputModal(false);
    }
    const handleShowInputModal = () => setShowInputModal(true);

    const handleAddInstructorManual = () => setAddInstructorMethod("MANUAL");
    const handleAddInstructorCSV = () => setAddInstructorMethod("CSV");
    const handleAddInstructorReset = () => setAddInstructorMethod(null);

    const handleInstructorRowClicked = (instructor) => {
        setInstructorFocus(instructor);
    }

    const handleAddNewInstructorManually = (instructor) => {
        setInstructorData([instructor, ...instructorData])
        handleCloseInputModal();
    }

    React.useEffect(() => {
        getInstructor();
    }, [])

    const getInstructor = () => {
        setInstructorData(getRandomInstructorSet(12));
    };

    const renderModal = (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Add Instructor</Modal.Title>
            </Modal.Header>
            {!addInstructorMethod && (
                <>
                    <Modal.Body>
                        <div style={{display: 'flex', padding: '1rem 5rem'}}>
                            <div onClick={handleAddInstructorCSV} style={{
                                margin: '1rem',
                                height: '100%',
                                width: '50%',
                                borderRadius: '20px',
                                padding: '2rem',
                                backgroundColor: "#F5F7FB",
                                textAlign: "center"
                            }}>
                                <CloudUploadFill size={95}/>
                                <h5 style={{marginTop: '1rem'}}>Upload .csv</h5>
                            </div>
                            <div onClick={handleAddInstructorManual} style={{
                                margin: '1rem',
                                height: '100%',
                                width: '50%',
                                borderRadius: '20px',
                                padding: '2rem',
                                backgroundColor: "#F5F7FB",
                                textAlign: "center"
                            }}>
                                <FileEarmarkTextFill size={96}/>
                                <h5 style={{marginTop: '1rem'}}>Input manually</h5>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{border: '0', padding: '2rem 3rem'}}>
                    </Modal.Footer>
                </>
            )
            }
            { addInstructorMethod === 'CSV' && (
                <>
                    <Modal.Body>
                        Hello World CSV
                    </Modal.Body>
                    <Modal.Footer style={{border: '0', padding: '2rem 3rem'}}>

                    </Modal.Footer>
                </>
            )
            }
            { addInstructorMethod === 'MANUAL' && (
                <>
                    <AddInstructorManuallyModal handleSubmit={handleAddNewInstructorManually}/>
                </>
            )
            }
        </>
    );

    if (instructorData) {
        return (
            <Page>
                <Wrapper>
                    <div style={{padding: '2rem 5rem', display: 'flex'}}>
                        <InputGroup>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                            <InputGroup.Append>
                                <Button variant="primary"><Search/></Button>
                            </InputGroup.Append>
                        </InputGroup>

                        <InputGroup>
                            <Button variant="outline-primary" style={{marginLeft: 'auto'}}>
                                <Filter style={{marginRight: '0.5rem'}}/>Filter</Button>
                            <Button variant="primary" style={{marginLeft: '2rem'}} onClick={handleShowInputModal}>
                                <PlusCircle style={{marginRight: '0.5rem'}}/><span>Add Instructor</span></Button>
                            <OverlayTrigger
                                trigger="click"
                                placement={'bottom'}
                                overlay={
                                    <Popover>
                                        <Popover.Title as="h3">Onboarding URL</Popover.Title>
                                        <Popover.Content>
                                            <p>Share this URL with instructors to self-onboard
                                                for the <strong>{seasonNameSelected}</strong> season.</p>
                                            <FormControl
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default"
                                                value={`${window.location.hostname}/onboarding/${seasonIdSelected}/${encodeURI(seasonNameSelected)}`}
                                            />
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <Button variant="secondary" style={{marginLeft: '2rem'}}><Link45deg style={{marginRight: '0.5rem'}}/>Self-Onboarding</Button>
                            </OverlayTrigger>
                        </InputGroup>
                    </div>

                    <InstructorsTable
                        handleInstructorRowClicked={handleInstructorRowClicked}
                        data={instructorData}
                        programsColorKey={program_color_keys}
                    />
                </Wrapper>
                <SideInfoWrapper>
                    <InstructorsSideInfo
                        instructor={instructorFocus}
                        programsColorKey={program_color_keys}
                    />
                </SideInfoWrapper>

                <Modal size="lg" show={showInputModal} onHide={handleCloseInputModal} onExited={handleAddInstructorReset}>
                    {renderModal}
                </Modal>
            </Page>
        );
    } else {
        return <></>
    }
}

export default Instructors;