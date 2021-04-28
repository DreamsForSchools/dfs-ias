import React, {useState} from 'react';
import OptionsBar from './OptionsBar';
import './OptionsBar.scss';
import {Select} from '../../design-system/form';
import { Page, SideInfoWrapper, Wrapper, GalleryWrapper } from '../../design-system/layout/Styled';
import AddNewProgramModal from '../../components/AddNewProgramModal';

import { PartnerCard, ProgramCard } from '../../design-system/components/Cards';

//dummy data: to be removed once connect to backend
import { PROGRAM_COLOR_KEYS as program_color_keys, PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import { PARTNERS as partners_data } from '../../data/PARTNERS';
import PartnerSideInfo from "./PartnerSideInfo";
import ProgramSideInfo from "./ProgramSideInfo";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import {Filter, PlusCircle, Search} from "react-bootstrap-icons";


const Programs = () => {
    const [viewType, setViewType] = useState("Programs");
    const [filterType, setFilterType] = useState("All");
    const [dataFocus, setDataFocus] = useState();
    const [showInputModal, setShowInputModal] = useState(false);

    function getfilterType(type){
        setFilterType(type)
    }

    const handleCloseInputModal = () => {
        setShowInputModal(false);
    }

    const handleOpenInputModal = () => {
        setShowInputModal(true);
    }

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
                    programsColorKey={program_color_keys}
                />
            )
        }
        return (
            <ProgramSideInfo
                program={dataFocus}
                programsColorKey={program_color_keys}
            />
        )
    }

    const handleSubmit = async (seasonData) => {
        // try {
        //     const request = await saveSeason({
        //         name: seasonData.name,
        //         startDate: seasonData.startDate.toISOString().split('T')[0],
        //         endDate: seasonData.endDate.toISOString().split('T')[0],
        //     });
        //     if (request.status === StatusCodes.OK) {
        //         setToastText({status: 'Success', message: `${request.data.sqlMessage}`});
        //         setShowNewSeasonModal(false);
        //         fetchSeason();
        //     }
        // } catch (e) {
        //     setToastText({status: 'Failed', message: `${e.response.data.err.sqlMessage} -- Season added unsuccessfully.`});
        //     setShowNewSeasonModal(false);
        // }
    }

    return (
        <Page>
            <Wrapper>
                <div style={{padding: '2rem 5rem', display: 'flex'}}>
                    <InputGroup>
                        <Select label={'View By: '} options={['Programs', 'Partners']} handler={getViewType} modal={false} state={viewType}/>
                    </InputGroup>
                    <InputGroup>
                        <Button variant="outline-primary" style={{marginLeft: 'auto'}}>
                            <Filter style={{marginRight: '0.5rem'}}/>Filter</Button>
                        <Button variant="primary" style={{marginLeft: '2rem'}} onClick={handleOpenInputModal}>
                            <PlusCircle style={{marginRight: '0.5rem'}}/><span>Add {viewType.slice(0, -1)}</span></Button>
                    </InputGroup>
                </div>

                <GalleryWrapper>
                    { viewType === "Partners" && (
                        partners_data.map((el, index) =>
                            <PartnerCard item={el} key={index} onClick={handleCardClick}/>
                        )
                      )
                    }
                    { viewType === "Programs" && (
                        programs_data.map((el, index) =>
                            <ProgramCard item={el} key={index} onClick={handleCardClick}/>
                        )
                    )
                    }
                </GalleryWrapper>
            </Wrapper>
            <SideInfoWrapper>
                {renderSideInfo()}
            </SideInfoWrapper>

            <Modal size="lg" show={showInputModal} onHide={handleCloseInputModal}>
                { viewType === "Programs" && <AddNewProgramModal handleSubmit={handleSubmit}/>}
            </Modal>
        </Page>
    );
}

export default Programs;