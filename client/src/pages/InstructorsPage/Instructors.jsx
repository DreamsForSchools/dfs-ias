import React, {useContext, useState} from 'react';
import './Instructors.scss';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import {Page, SideInfoWrapper, Wrapper} from '../../design-system/layout/Styled';
import {getRandomInstructorSet} from "../../util/sampleData";
import {FormControl, InputGroup, Button} from "react-bootstrap";
import {PlusCircle, Filter, Search, FileEarmarkTextFill, CloudUploadFill} from 'react-bootstrap-icons';
import AddInstructorManuallyModal from "../../components/AddInstructorManuallyModal";
import {PROGRAM_COLOR_KEYS as program_color_keys} from '../../data/PROGRAMS';
import {Modal} from "react-bootstrap";
import {parseCSV} from "../../util/csvParse.js";
import {GlobalContext} from "../../context/GlobalContextProvider";


function Instructors() {
    const [instructorFocus, setInstructorFocus] = useState();
    const [instructorData, setInstructorData] = useState(null);
    const [showInputModal, setShowInputModal] = useState();
    const [addInstructorMethod, setAddInstructorMethod] = useState(null);
    const [csvHighlighted, setCsvHighlighted] = React.useState(false);
    const {seasonIdSelected} = useContext(GlobalContext);

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
                        <div
                            style={{
                                borderRadius: '6px',
                                border: '4px dashed #B5B8BF',
                                backgroundColor: csvHighlighted ? '#F5F7FB' : '#FFFFFF',
                                height: '300px',
                                width: '300px',
                                textAlign: 'center',
                                margin: '40px 230px 0px',
                                hover: 'scale(1.1)'
                            }}
                            onDragEnter={() => {
                                setCsvHighlighted(true);
                            }}
                            onDragLeave={() => {
                                setCsvHighlighted(false);
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                setCsvHighlighted(false);

                                Array.from(e.dataTransfer.files)
                                    .filter((file) => file.type === "text/csv")
                                    .forEach(async (file) => {
                                        const text = await file.text();
                                        console.log(text);
                                        let instructors = parseCSV(text, instructorData, setInstructorData, seasonIdSelected);
                                        console.log(instructors);
                                        // setInstructorData([...instructors, ...instructorData])
                                        setShowInputModal(false);
                                    });
                            }}
                        >
                            <div style={{ marginTop: '70px'}}>
                                <CloudUploadFill size={95} color={'#0099FF'}/>
                                <h5 style={{marginTop: '1rem'}}>Drag and Drop .CSV</h5>
                            </div>

                        </div>
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