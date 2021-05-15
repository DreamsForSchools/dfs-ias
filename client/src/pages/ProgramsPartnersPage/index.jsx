import React, {useState, useContext, useEffect} from 'react';
import OptionsBar from './OptionsBar';
import './OptionsBar.scss';
import {Select} from '../../design-system/form';
import { Page, SideInfoWrapper, Wrapper, GalleryWrapper } from '../../design-system/layout/Styled';
import AddNewProgramModal from '../../components/AddNewProgramModal';
import AddNewPartnerModal from '../../components/AddNewPartnerModal';
import AddPartnersToProgramModal from "../../components/AddPartnerToProgramModal";
import {saveProgram, loadPrograms} from '../../api/program';
import {savePartner, loadPartner} from "../../api/partner";
import { PartnerCard, ProgramCard } from '../../design-system/components/Cards';
import {GlobalContext} from "../../context/GlobalContextProvider";
import {StatusCodes} from 'http-status-codes';
import Lottie from 'lottie-react';
import emptyAnimation from '../../assets/empty-animation.json';
//dummy data: to be removed once connect to backend
import { PROGRAM_COLOR_KEYS as program_color_keys, PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import { PARTNERS as partners_data } from '../../data/PARTNERS';
import PartnerSideInfo from "./PartnerSideInfo";
import ProgramSideInfo from "./ProgramSideInfo";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import {Filter, PlusCircle, Search} from "react-bootstrap-icons";

let ProgramsPartners;
export default ProgramsPartners = () => {
    const {setToastText} = useContext(GlobalContext);
    const [viewType, setViewType] = useState("Programs");
    const [modalType, setModalType] = useState(null);
    const [filterType, setFilterType] = useState("All");
    const [dataFocus, setDataFocus] = useState();
    const [showInputModal, setShowInputModal] = useState(false);

    const [programsData, setProgramsData] = useState(null);
    const [partnersData, setPartnersData] = useState(null);

    useEffect(() => {
        fetchPrograms();
        fetchPartners();
    }, []);

    const fetchPrograms = async () => {
        try {
            const programList = await loadPrograms();
            setProgramsData(programList.data);
        } catch (e) {
            setToastText({status: 'Failed', message: `${e.response}`});
        }
    }

    const fetchPartners = async () => {
        try {
            const partnerList = await loadPartner();
            setPartnersData(partnerList.data);
        } catch (e) {
            setToastText({status: 'Failed', message: `${e.response}`});
        }
    }

    const handleCloseInputModal = () => {
        setModalType(null);
        setShowInputModal(false);
    }

    const handleOpenInputModal = (type) => {
        setModalType(type);
    }

    useEffect(() => {
        if (modalType) setShowInputModal(true);
    }, [modalType])

    const getViewType = (type) => {
        setViewType(type);
        setDataFocus();
    }

    const handleCardClick = (data) => {
        setDataFocus(data);
    }

    const renderSideInfo = () => {
        if (viewType === "Partners") {
            return (
                <PartnerSideInfo
                    partner={dataFocus}
                    openModal={handleOpenInputModal}
                />
            )
        }
        return (
            <ProgramSideInfo
                program={dataFocus}
                openModal={handleOpenInputModal}
            />
        )
    }

    const handleSubmit = async (type, data) => {
        try {
            let request;
            switch(type) {
                case 'PROGRAM':
                    request = await saveProgram(data);
                    if (request.status === StatusCodes.OK) {
                        setToastText({status: 'Success', message: `${request.data.sqlMessage}`});
                        handleCloseInputModal();
                        fetchPrograms();
                    }
                    break;
                case 'PARTNER':
                    request = await savePartner(data);
                    if (request.status === StatusCodes.OK) {
                        setToastText({status: 'Success', message: `${request.data.sqlMessage}`});
                        handleCloseInputModal();
                        fetchPartners();
                    }
                    break;
            }

        } catch (e) {
            setToastText({status: 'Failed', message: `${e.response.data.sqlMessage} -- Program added unsuccessfully.`});
            handleCloseInputModal();
        }
    }

    return (
        <Page>
            <Wrapper>
                <div style={{padding: '2rem 3rem', display: 'flex'}}>
                    <InputGroup>
                        <Select label={'View By: '} options={['Programs', 'Partners']} handler={getViewType} modal={false} state={viewType}/>
                    </InputGroup>
                    <InputGroup>
                        <Button variant="outline-primary" style={{marginLeft: 'auto'}}>
                            <Filter style={{marginRight: '0.5rem'}}/>Filter</Button>
                        <Button variant="primary" style={{marginLeft: '2rem'}} onClick={() => handleOpenInputModal(viewType)}>
                            <PlusCircle style={{marginRight: '0.5rem'}}/><span>Add {viewType.slice(0, -1)}</span></Button>
                    </InputGroup>
                </div>

                <GalleryWrapper>
                    {/*{ viewType === "Partners" && (*/}
                    {/*    partners_data.map((el, index) =>*/}
                    {/*        <PartnerCard item={el} key={index} onClick={handleCardClick}/>*/}
                    {/*    )*/}
                    {/*  )*/}
                    {/*}*/}
                    { viewType === "Partners" && (
                        partnersData !== null && partnersData.length > 0 ? (
                            partnersData.map((el, index) =>
                                <PartnerCard item={el} key={index} onClick={handleCardClick}/>
                            )
                        ) : (
                            <div style={{margin: "2rem auto", backgroundColor: "#ffffff", display: 'flex', padding: '0 2rem 0 1rem', borderRadius: 20, alignItems: 'center'}}>
                                <Lottie animationData={emptyAnimation} style={{width: 200, height: 200}} />
                                {programsData === null ? <h5>Looking for partners</h5> : <h5>No partners found. Let's add some!</h5>}
                            </div>
                        ))
                    }
                    { viewType === "Programs" && (
                        programsData !== null && programsData.length > 0 ? (
                        programsData.map((el, index) =>
                            <ProgramCard item={el} key={index} onClick={handleCardClick}/>
                        )
                    ) : (
                        <div style={{margin: "2rem auto", backgroundColor: "#ffffff", display: 'flex', padding: '0 2rem 0 1rem', borderRadius: 20, alignItems: 'center'}}>
                            <Lottie animationData={emptyAnimation} style={{width: 200, height: 200}} />
                            {programsData === null ? <h5>Looking for programs</h5> : <h5>No program found. Let's add some!</h5>}
                        </div>
                    ))
                    }
                </GalleryWrapper>
            </Wrapper>
            <SideInfoWrapper>
                {renderSideInfo()}
            </SideInfoWrapper>

            <Modal size="lg" show={showInputModal && modalType !== null} onHide={handleCloseInputModal}>
                { modalType === "Programs" && <AddNewProgramModal handleSubmit={handleSubmit}/>}
                { modalType === "Partners" && <AddNewPartnerModal handleSubmit={handleSubmit}/>}
                { modalType === "PartnerToProgram" && <AddPartnersToProgramModal handleSubmit={handleSubmit} programContext={dataFocus}/>}
                {/*{ modalType === "ProgramToPartner" && <AddNewPartnerModal handleSubmit={handleSubmit}/>}*/}
            </Modal>
        </Page>
    );
}