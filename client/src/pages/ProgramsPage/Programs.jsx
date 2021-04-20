import React, {useState} from 'react';
import OptionsBar from './OptionsBar';
import './OptionsBar.scss';
import { Page, SideInfoWrapper, Wrapper, GalleryWrapper } from '../../design-system/layout/Styled';

import { PartnerCard, ProgramCard } from '../../design-system/components/Cards';

//dummy data: to be removed once connect to backend
import { PROGRAM_COLOR_KEYS as program_color_keys, PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import { PARTNERS as partners_data } from '../../data/PARTNERS';
import PartnerSideInfo from "./PartnerSideInfo";
import ProgramSideInfo from "./ProgramSideInfo";


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
                <OptionsBar viewType={getViewType} filterType={getfilterType}/>
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