import React, { useState, useContext, useEffect } from 'react';
import './Instructors.scss';
import InstructorsTable from "./InstructorsTable";
import InstructorsSideInfo from "./InstructorsSideInfo";
import {Page, SideInfoWrapper, Wrapper} from '../../design-system/layout/Styled';
import { FormControl, InputGroup, Button, OverlayTrigger, Popover, Form } from "react-bootstrap";
import {PlusCircle, Filter, Search, FileEarmarkTextFill, CloudUploadFill, Link45deg} from 'react-bootstrap-icons';
import AddInstructorManuallyModal from "../../components/AddInstructorManuallyModal";
import {Modal} from "react-bootstrap";
import {parseCSV} from "../../util/csvParse.js";
import {GlobalContext} from "../../context/GlobalContextProvider";
import {toast} from 'react-toastify';
import Lottie from "lottie-react";
import csvLoadingAnimation from '../../assets/idea-into-book-machine.json';
import {saveInstructor, updateInstructor, deleteInstructor} from "../../api";
import InstructorFiltersModal from "../../components/InstructorFiltersModal";


function Instructors() {
    const {
        seasonSelected,
        instructorData,
        programColorMap,
        fetchAllInstructorAggregatedData
    } = useContext(GlobalContext);
    const initialCheckedItems = { name: '', car: [], availability: [], preference: [], year: [], asl: [] };

    const [instructorFocus, setInstructorFocus] = useState();
    const [showInputModal, setShowInputModal] = useState();
    const [addInstructorMethod, setAddInstructorMethod] = useState(null);
    const [csvHighlighted, setCsvHighlighted] = React.useState(false);
    const [csvAnimation, setCsvAnimation] = React.useState(false);
    const [filters, setFilters] = useState(Object.assign({}, initialCheckedItems));
    const [searchText, setSearchText] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filteredInstructors, setFilteredInstructors] = useState([...Object.values(instructorData)]);
    // UseState to show edit modal , when True edit modal is displayed.  Passed down to InstructorsSideinfoprop
    const [ editShowModal, setEditShowModal] = React.useState(false);
    // const [searchFlag, setSearchFlag] = React.useState({});


    const [nameFlag,setNameFlag] = React.useState(true);
    const [yearFlag,setYearFlag] = React.useState(true);
    const [majorFlag, setMajorFlag] = React.useState(true);
    const [uniFlag, setUniFlag] = React.useState(true);

    const [formInput, setFormInput] = React.useState({
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        gender: null,
        ethnicity: null,
        university: null,
        major: null,
        schoolYear: null,
        graduationDate: null,
        firstPref: null,
        secondPref: null,
        thirdPref: null,
        fourthPref: null,
        hasCar: false,
        otherLanguages: null,
        isASL: false,
        shirtSize: null,
        availability: null,
        programmingLanguages: null,
        }
    );

    

    useEffect(() => {
        setFilteredInstructors([...Object.values(instructorData)]);
    }, [instructorData]);
    
    const handleCloseInputModal = () => {
        setShowInputModal(false);
    }
    const handleShowInputModal = () => setShowInputModal(true);

    const handleAddInstructorManual = () => setAddInstructorMethod("MANUAL");
    const handleAddInstructorCSV = () => setAddInstructorMethod("CSV");
    const handleAddInstructorReset = () => setAddInstructorMethod(null);

    const handleInstructorRowClicked = (instructor) => {
        if(!editShowModal)
        {
            setInstructorFocus(instructor);
            setFormInput({...formInput, availability : instructor.availability});
        }
        //  instructor side panel disappears on duplicate click AND when not in update screen (error prevent)
        if( instructorFocus === instructor && !editShowModal)
        {
            setInstructorFocus(null);
        }
    }

    const handleAddNewInstructorManually = async (instructor) => {
        // setInstructorData([instructor, ...instructorData])
        await saveInstructor({...instructor, approve: true, seasonId: seasonSelected.seasonId});
        handleCloseInputModal();
        fetchAllInstructorAggregatedData();

    }

    const handleCloseFilter = () => setShowFilter(false);

    const handleShowFilter = () => {
        setShowFilter(true);
    }

    const onDeletePress = async (id) => {
        setInstructorFocus(null);
        await deleteInstructor(id);
        fetchAllInstructorAggregatedData();
    }

    
    const handleEditInstructorManually = async (instructorId,instructor) => {
        // setInstructorData([instructor, ...instructorData])
        // // await saveInstructor({...instructor, approve: true, seasonId: seasonSelected.seasonId});
        // handleCloseInputModal();
        // fetchAllInstructorAggregatedData();
        // setInstructorFocus(null);
        await updateInstructor(instructorId,instructor);
        fetchAllInstructorAggregatedData();
        // return;
    }

    const handleSearchChange = e => {
        const value = e.target.value;
        
        // console.log(searchFlag);
        setSearchText(value);
        setFilters({ ...filters, name: value });
    }

  
    const handleApplyFilters = (checkedItems) => {
        const { car, availability, preference, year, asl } = checkedItems;
        setFilters({
            name: filters.name,
            car: [...car],
            availability: [...availability],
            preference: [...preference],
            year: [...year],
            asl: [...asl],
        });
        setShowFilter(false);
    }

    const onSearchSubmit = () => {
        // previously was handled onChange, causing trailing spaces to be removed while typing
        let searchTextTrimmed = searchText.trim();
        setFilters({ ...filters, name: searchTextTrimmed });       
    }


    const onNameClick = () => {
        // console.log(props.data);
        // setInstructors(props.data);
        
        // console.log(props.search["flag"]);
        console.log("instructor name clicked");
        const sort_instructors = filteredInstructors.sort((a, b) => a.firstName.localeCompare(b.firstName));
        if(nameFlag)
        {
            // setInstructors(sort_instructors);
            setFilteredInstructors(sort_instructors);
            setNameFlag(false);
        }
        else
        {
            // setInstructors(sort_instructors.reverse());
            setFilteredInstructors(sort_instructors.reverse());
            setNameFlag(true);
        }
        
    };

    const onYearClick = () => {
        
        console.log("year clicked");
        const first = 1;
        const second = 2;
        const third = 3;
        const fourth_plus = 4;
        const graduate = 5;
        const graduated = 6;

        // export const schoolYear = 
    // '1st',
    // '2nd',
    // '3rd',
    // '4th+',
    // 'Graduate',
    // 'Graduated'
    // 
        
        //  hardcoded; 
        const sort_instructors = filteredInstructors.sort((a, b) =>
        {
            
            let a_val = 0;
            let b_val = 0;
            switch(a.schoolYear) {
                case '1st':
                  a_val = first;
                  break;
                case '2nd':
                  a_val = second;
                  break;
                case '3rd':
                  a_val = third;
                  break;
                case '4th+':
                  a_val = fourth_plus;
                  break;
                case 'Graduate':
                  a_val = graduate;
                  break;
                case 'Graduated':
                  a_val = graduated;
                  break;
                default:
                  break;
              }

              switch(b.schoolYear) {
                case '1st':
                  b_val = first;
                  break;
                case '2nd':
                  b_val = second;
                  break;
                case '3rd':
                  b_val = third;
                  break;
                case '4th+':
                  b_val = fourth_plus;
                  break;
                case 'Graduate':
                  b_val = graduate;
                  break;
                case 'Graduated':
                  b_val = graduated;
                  break;
                default:
                  break;
              }
              
              return a_val - b_val;
        }
        );

        if(yearFlag)
        {
            setFilteredInstructors(sort_instructors);
            setYearFlag(false);
        }
        else
        {
            setFilteredInstructors(sort_instructors.reverse());
            setYearFlag(true);
        }
        
    };

    const onMajorClick = () => {
        
        console.log("major clicked");
        
        const sort_instructors = filteredInstructors.sort((a, b) => a.major.localeCompare(b.major));
        if(majorFlag)
        {
            setFilteredInstructors(sort_instructors);
            setMajorFlag(false);
        }
        else
        {
            setFilteredInstructors(sort_instructors.reverse());
            setMajorFlag(true);
        }
    };

    const onUniClick = () => {
        
        console.log("University clicked");
        
        const sort_instructors = filteredInstructors.sort((a, b) => a.university.localeCompare(b.university));
        if(uniFlag)
        {
            setFilteredInstructors(sort_instructors);
            setUniFlag(false);
        }
        else
        {
            setFilteredInstructors(sort_instructors.reverse());
            setUniFlag(true);
        }
        
    };




    useEffect(() => {
        const instructors = Object.values(instructorData).filter(instructor => {
            if (filters.name) {
                const formattedText = filters.name.toLowerCase();
                const fullName = instructor.firstName + " " + instructor.lastName;
                if (
                  !fullName.toLowerCase().includes(formattedText) && !instructor.email.toLowerCase().includes(formattedText)
                  && !instructor.university.toLowerCase().includes(formattedText) && !instructor.firstPref.toLowerCase().includes(formattedText)
                ) {
                    return false;
                }
            }

            if (filters.car.length > 0 && !filters.car.includes(instructor.hasCar)) {
                return false;
            }

            const weekdays = instructor.availability.map(ability => ability.weekday);
            if (filters.availability.length > 0 &&
              !filters.availability.some(ability => weekdays.includes(ability))) {
                return false;
            }

            let preferences = [instructor.firstPref, instructor.secondPref,instructor.thirdPref, instructor.fourthPref];
            if (filters.preference.length > 0 &&
              !filters.preference.some(pref => preferences.includes(pref))) {
                return false;
            }

            if (filters.year.length > 0 && !filters.year.includes(instructor.schoolYear)) {
                return false;
            }

            if (filters.asl.length > 0 && !filters.asl.includes(instructor.isASL)) {
                return false;
            }

            return true;
        });

        setFilteredInstructors(instructors);
    }, [filters]);

    const renderModal = (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                {csvAnimation ?
                    (<Modal.Title style={{fontSize: '24px'}}>Parsing CSV data. Please
                        wait... </Modal.Title>) : (<Modal.Title>Add Instructor</Modal.Title>)}


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
            {addInstructorMethod === 'CSV' && (
                <>
                    <Modal.Body>
                        <div
                            style={{
                                borderRadius: '6px',
                                border: csvAnimation ? '' : '4px dashed #B5B8BF',
                                backgroundColor: csvHighlighted ? '#F5F7FB' : '#FFFFFF',
                                height: csvAnimation ? '' : '300px',
                                width: csvAnimation ? '' : '300px',
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
                                setCsvAnimation(true);

                                Array.from(e.dataTransfer.files)
                                    .forEach(async (file) => {
                                        const text = await file.text();
                                        // console.log(text);
                                        let result = await parseCSV(text, instructorData, seasonSelected.seasonId);
                                        fetchAllInstructorAggregatedData();
                                        console.log(result);
                                        if (result.error) {
                                            toast(`❌ Error parsing csv, please check for empty columns or rows.`);
                                        } else {
                                            setShowInputModal(false);
                                            toast(`🙌 Csv file parsed successfully!`);
                                            setCsvAnimation(false);
                                        }
                                    });
                            }}
                        >
                            {csvAnimation ?
                                (
                                    <div>
                                        <Lottie style={{
                                            width: '700px',
                                            height: '300px',
                                            marginLeft: '-210px'
                                        }} animationData={csvLoadingAnimation}/>
                                    </div>
                                ) :
                                (
                                    <div style={{marginTop: '70px'}}>
                                        <CloudUploadFill size={95} color={'#0099FF'}/>
                                        <h5 style={{marginTop: '1rem'}}>Drag and Drop .CSV</h5>
                                    </div>
                                )}

                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{border: '0', padding: '2rem 3rem'}}>

                    </Modal.Footer>
                </>
            )
            }
            {addInstructorMethod === 'MANUAL' && (
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
                                placeholder= "🔍 Search..."
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Button variant="outline-primary" style={{marginLeft: 'auto'}} onClick={handleShowFilter}>
                                <Filter style={{marginRight: '0.5rem'}}/>Filter</Button>
                            <Button variant="primary" style={{marginLeft: '2rem'}} onClick={handleShowInputModal}>
                                <PlusCircle style={{marginRight: '0.5rem'}}/><span>Add Instructor</span></Button>
                            {/* TODO: Self-Onboarding is not ready for production */}
                            {/*<OverlayTrigger*/}
                            {/*    trigger="click"*/}
                            {/*    placement={'bottom'}*/}
                            {/*    overlay={*/}
                            {/*        <Popover>*/}
                            {/*            <Popover.Title as="h3">Onboarding URL</Popover.Title>*/}
                            {/*            <Popover.Content>*/}
                            {/*                <p>Share this URL with instructors to self-onboard*/}
                            {/*                    for the <strong>{seasonSelected.name}</strong> season.</p>*/}
                            {/*                <FormControl*/}
                            {/*                    aria-label="Default"*/}
                            {/*              ''      aria-describedby="inputGroup-sizing-default"*/}
                            {/*                    value={`localhost:3000/onboarding/${seasonSelected.seasonId}/${encodeURI(seasonSelected.name)}`}*/}
                            {/*                />*/}
                            {/*            </Popover.Content>*/}
                            {/*        </Popover>*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*    <Button variant="secondary" style={{marginLeft: '2rem'}}><Link45deg*/}
                            {/*        style={{marginRight: '0.5rem'}}/>Self-Onboarding</Button>*/}
                            {/*</OverlayTrigger>*/}
                        </InputGroup>
                    </div>
                    {
                        
                   

                    <InstructorsTable
                        handleInstructorRowClicked={handleInstructorRowClicked}
                        data={filteredInstructors.reverse()}
                        programsColorKey={programColorMap}
                        onNameClick = {onNameClick}
                        nameFlag = {nameFlag}
                        onYearClick = {onYearClick}
                        yearFlag = {yearFlag}
                        majorFlag = {majorFlag}
                        onMajorClick = {onMajorClick}
                        uniFlag = {uniFlag}
                        onUniClick = {onUniClick}

                    />
                    }
                </Wrapper>
                <SideInfoWrapper>
                    <InstructorsSideInfo
                        instructor={instructorFocus}
                        programsColorKey={programColorMap}
                        onDeletePress={onDeletePress}
                        formInput={formInput}
                        setFormInput ={setFormInput}
                        editShowModal ={editShowModal}
                        setEditShowModal = {setEditShowModal}
                        handleEditInstructorManually = {handleEditInstructorManually}
                        seasonId = {seasonSelected.seasonId}
                    />
                </SideInfoWrapper>

                <Modal size="lg" show={showInputModal} onHide={handleCloseInputModal}
                       onExited={handleAddInstructorReset}>
                    {renderModal}
                </Modal>

                <InstructorFiltersModal
                  filters={filters}
                  show={showFilter}
                  onHide={handleCloseFilter}
                  onExited={handleCloseFilter}
                  handleApplyFilters={handleApplyFilters}
                />
            </Page>
        );
    } else {
        return <></>
    }
}

export default Instructors;
