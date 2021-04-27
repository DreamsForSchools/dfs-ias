import React, {useState} from 'react';
import OptionsBar from './OptionsBar';
import './OptionsBar.scss';
import {Select} from '../../design-system/form';
import { Page, SideInfoWrapper, Wrapper, GalleryWrapper } from '../../design-system/layout/Styled';

import { PartnerCard, ProgramCard } from '../../design-system/components/Cards';

//dummy data: to be removed once connect to backend
import { PROGRAM_COLOR_KEYS as program_color_keys, PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import { PARTNERS as partners_data } from '../../data/PARTNERS';
import PartnerSideInfo from "./PartnerSideInfo";
import ProgramSideInfo from "./ProgramSideInfo";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {Filter, PlusCircle, Search} from "react-bootstrap-icons";


const Programs = () => {
    const [viewType, setViewType] = useState("Programs");
    const [filterType, setFilterType] = useState("All");
    const [dataFocus, setDataFocus] = React.useState();

    function getfilterType(type){
        setFilterType(type)
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
                        <Button variant="primary" style={{marginLeft: '2rem'}}  >
                            <PlusCircle style={{marginRight: '0.5rem'}}/><span>Add Instructor</span></Button>
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
        </Page>
    );
}

export default Programs;