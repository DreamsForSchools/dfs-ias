import React, {useState} from 'react';
import OptionsBar from './OptionsBar';
import './OptionsBar.scss';
import { Page, SideInfoWrapper, Wrapper } from '../../design-system/layout/Styled';
import Card from '../../components/Card';
import AppJam_Logo from "../../assets/MobileDevLogo.png";
import WebJam_Logo from "../../assets/WebDevLogo.png";
import Lestem_Logo from "../../assets/LESTEMLogo.png";
import Efk_Logo from "../../assets/EFKLogo.png";
import Scratch_Logo from "../../assets/ScratchLogo.png";
import InstructorsSideInfo from "../InstructorsPage/InstructorsSideInfo";

import { PartnerCard } from '../../design-system/container/Cards';

//dummy data: to be removed once connect to backend
import { PROGRAM_COLOR_KEYS as program_color_keys, PROGRAMS as programs_data }  from '../../data/PROGRAMS';
import { PARTNERS as partners_data } from '../../data/PARTNERS';
import PartnerSideInfo from "./PartnerSideInfo";
import ProgramSideInfo from "./ProgramSideInfo";


const Programs = () => {
    const [viewType, setViewType] = useState("Partners");
    const [filterType, setFilterType] = useState("All");
    const [dataFocus, setDataFocus] = React.useState();

    function getfilterType(type){
        setFilterType(type)
    }

    const getViewType = (type) => {
        setViewType(type);
    }

    const handleCardClick = (data) => {
        setDataFocus(data);
        console.log(data);
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
                <div className={'program-gallery'}>
                    { viewType === "Partners" && (
                        partners_data.map((el, index) =>
                            <PartnerCard item={el} key={index} onClick={handleCardClick}/>
                        )
                      )
                    }
                </div>
            </Wrapper>
            <SideInfoWrapper>
                {renderSideInfo()}
            </SideInfoWrapper>
        </Page>
    );
}

export default Programs;