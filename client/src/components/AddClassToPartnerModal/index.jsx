import React, {useState, useEffect, useContext} from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import {Input, Select} from "../../design-system/form";
import DatePicker from "react-datepicker";
// import {loadPartner} from "../../api/partner";

import {GlobalContext} from "../../context/GlobalContextProvider";
import {color} from "../../design-system/style";
import {partnerSymbols} from "../../constant";
import {PartnerSymbol} from "../../design-system/components/SideInfo";

const AddClassToPartnerModal = ({ handleSubmit, partnerContext }) => {
    const { seasonSelected, programData } = useContext(GlobalContext);
    const [ imageBase64, setImageBase64 ] = React.useState(null);
    const [ newClassInput, setClassInput ] = useState(
        {
            instructorsNeeded: null,
            seasonId: seasonSelected.seasonId,
            partnerId: partnerContext.partnerId,
            programId: null,
        }
    )

    const [ timing, setTiming ] = React.useState([
        {active: false, startTime: null, endTime: null},
        {active: false, startTime: null, endTime: null},
        {active: false, startTime: null, endTime: null},
        {active: false, startTime: null, endTime: null},
        {active: false, startTime: null, endTime: null}
    ])

    const [programsList, setProgramsList] = useState([]);

    const dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    useEffect(async () => {
        // if (programContext) setImageBase64(new Buffer.from(programContext.logo.data).toString("ascii"));

        try {
            const programs = [];

            Object.values(programData).forEach((e) => {
                programs.push(`${e.programId} - ${e.name}`)
            })
            setProgramsList(programs);
        } catch (e) {
            console.log(e);
        }
    }, [])

    const handleFormInput = (input = null, field) => {
        switch(field) {
            case "Instructors Needed":
                setClassInput({...newClassInput, instructorsNeeded: input})
                break;
            case "Program":
                setClassInput({...newClassInput, programId: input})
                break;
        }
    }

    const handleSubmitButtonPress = () => {
        const timingParsed = [];
        timing.forEach((e, idx) => {
            if (e.active) {
                timingParsed.push({
                    weekday: idx + 1,
                    startTime: e.startTime.toLocaleTimeString('en-US', { hour12: false }),
                    endTime: e.endTime.toLocaleTimeString('en-US', { hour12: false }),
                })
            }
        })

        handleSubmit('CLASS' , {
            instructorsNeeded: Number(newClassInput.instructorsNeeded),
            seasonId: newClassInput.seasonId,
            partnerId: newClassInput.partnerId,
            programId: newClassInput.programId ? Number(newClassInput.programId.substr(0, newClassInput.programId.indexOf(' '))) : null,
            timings: timingParsed
        })
    }

    const handleTimingChange = (type, time, index) => {
        const temp = timing.slice();
        switch(type) {
            case 'active':
                temp[index].active = !temp[index].active;
                break;
            case 'start':
                temp[index].startTime = time;
                break;
            case 'end':
                temp[index].endTime = time;
                break;
        }
        setTiming(temp);
    }

    return (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Create a new class for {seasonSelected.name}</Modal.Title>
            </Modal.Header>
            <>
                <Modal.Body>
                    <div style={{padding: '2rem 4rem 0 4rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%', marginRight: '1.5rem', display: 'flex', justifyContent: 'center'}}>
                            <PartnerSymbol>{partnerSymbols[partnerContext.partnerType]}️</PartnerSymbol>
                        </div>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Input disabled label={'Partner'} state={partnerContext.name} modal/>
                            <Select options={programsList} label={'Program'} handler={handleFormInput} state={newClassInput.programId}
                                    modal/>
                            <Select options={Array.from({length: 10}, (_, i) => i + 1)} label={'Instructors Needed'} handler={handleFormInput} state={newClassInput.instructorsNeeded}
                                    modal/>
                        </div>
                    </div>
                    <Table borderless style={{padding: '2rem 4rem 0 4rem', borderSpacing: '0 0.4rem', borderCollapse: 'separate'}}>
                        <tbody>
                        {dates.map((e, idx) =>
                            <tr key={idx} style={{ borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                                <td>
                                    <input
                                        type={"checkbox"}
                                        value={timing[idx].active}
                                        onClick={() => handleTimingChange("active", null, idx)}
                                    /> {e}
                                </td>
                                <td>
                                    {timing[idx].active &&
                                        <>
                                            <label>From</label>
                                            <DatePicker
                                                selected={timing[idx].startTime}
                                                onChange={time => handleTimingChange("start", time, idx)}
                                                selectsStart
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                            />
                                        </>
                                    }
                                </td>
                                <td>
                                    {timing[idx].active &&
                                        <>
                                            <label>To</label>
                                            <DatePicker
                                                selected={timing[idx].endTime}
                                                onChange={time => handleTimingChange("end", time, idx)}
                                                selectsStart
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                            />
                                        </>
                                    }
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer style={{border: '0', padding: '0 3rem 2rem 3rem'}}>
                    <Button variant="primary" onClick={handleSubmitButtonPress}>Submit</Button>
                </Modal.Footer>
            </>
        </>
    )
}

export default AddClassToPartnerModal;
