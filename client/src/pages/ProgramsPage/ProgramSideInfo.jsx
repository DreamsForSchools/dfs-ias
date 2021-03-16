import React from "react";
import Fade from 'react-reveal/Fade';
import { PencilSquare, CalendarWeek, TelephoneFill, X, Check } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import Dot from "../../components/Dot";
import avatar from '../../assets/avatar.png';
import { formatAvailability, formatPhoneNumber } from "../../util/formatData";
import { Wrapper, Title } from "../../design-system/container/SideInfo";

const ProgramSideInfo = (props) => {
    const { program, programsColorKey } = props;

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

                    </Title>
                </div>
            </Fade>
        </Wrapper>
    )
}

export default ProgramSideInfo;