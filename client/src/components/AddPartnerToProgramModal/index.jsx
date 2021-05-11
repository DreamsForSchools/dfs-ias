import React, {useState, useEffect, useContext} from 'react';
import seasonAnimation from "../../assets/season-animation.json";
import {Button, Modal, Table} from "react-bootstrap";
import Lottie from "lottie-react";
import {Input, Select} from "../../design-system/form";
import {DatePickerWrapper} from "../NavBar/Styled";
import DatePicker from "react-datepicker";
import {loadPartner} from "../../api/partner";
import {partnerTypes, timeSlots} from "../../constant";

import {GlobalContext} from "../../context/GlobalContextProvider";
import {Avatar} from "../../design-system/components/SideInfo";
import {color} from "../../design-system/style";
import {formatMilitaryTime} from "../../util/formatData";

const AddPartnersToProgramModal = ({ handleSubmit, programContext }) => {
    const { seasonIdSelected, seasonNameSelected } = useContext(GlobalContext);
    const [ imageBase64, setImageBase64 ] = React.useState(null);
    const [newSeasonInput, setNewSeasonInput] = useState(
        {
            name: null,
            startDate: new Date(),
            endDate: new Date(),
        }
    )

    const [partnersList, setPartnersList] = useState([]);

    useEffect(async () => {
        if (programContext) setImageBase64(new Buffer.from(programContext.logo.data).toString("ascii"));

        try {
            const partners = [];
            const partnerList = await loadPartner();

            partnerList.data.forEach((e) => {
                partners.push(`${e.partnerId} - ${e.district} ${e.name}`)
            })
            setPartnersList(partners);
        } catch (e) {
            console.log(e);
        }
    }, [])

    const handleFormInput = (input = null, field) => {
        switch(field) {
            case "Season Name":
                setNewSeasonInput({...newSeasonInput, name: input})
                break;
            case "Start Date":
                setNewSeasonInput({...newSeasonInput, startDate: input})
                break;
            case "End Date":
                setNewSeasonInput({...newSeasonInput, endDate: input})
                break;
        }
    }

    const handleSubmitButtonPress = () => {
        handleSubmit(newSeasonInput);
    }

    return (
        <>
            <Modal.Header closeButton style={{padding: '2rem 3rem 0 3rem', border: '0'}}>
                <Modal.Title>Create a new {programContext.name} class for {seasonNameSelected}</Modal.Title>
            </Modal.Header>
            <>
                <Modal.Body>
                    <div style={{padding: '2rem 4rem 0 4rem', display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <img style={{width: 250}} src={imageBase64} />
                        </div>
                        <div style={{width: '50%', marginRight: '1.5rem'}}>
                            <Select options={partnersList} label={'Partner'} handler={handleFormInput} state={newSeasonInput.partnerType}
                                    modal/>
                            <Input label={'Instructors Needed'} handler={handleFormInput} state={newSeasonInput.name} modal/>
                            {/*<DatePickerWrapper>*/}
                            {/*    <label>Start Date</label>*/}
                            {/*    <DatePicker*/}
                            {/*        selected={newSeasonInput.startDate}*/}
                            {/*        onChange={date => handleFormInput(date, "Start Date")}*/}
                            {/*        selectsStart*/}
                            {/*        startDate={newSeasonInput.startDate}*/}
                            {/*        endDate={newSeasonInput.endDate}*/}
                            {/*    />*/}
                            {/*</DatePickerWrapper>*/}
                            {/*<DatePickerWrapper>*/}
                            {/*    <label>End Date</label>*/}
                            {/*    <DatePicker*/}
                            {/*        selected={newSeasonInput.endDate}*/}
                            {/*        onChange={date => handleFormInput(date, "End Date")}*/}
                            {/*        selectsEnd*/}
                            {/*        startDate={newSeasonInput.startDate}*/}
                            {/*        endDate={newSeasonInput.endDate}*/}
                            {/*        minDate={newSeasonInput.startDate}*/}
                            {/*    />*/}
                            {/*</DatePickerWrapper>*/}

                        </div>
                    </div>
                    <Table borderless style={{borderSpacing: '0 0.4rem', borderCollapse: 'separate'}}>
                        <thead>
                        {/*<tr>*/}
                        {/*    <th></th>*/}
                        {/*    <th>Mondays</th>*/}
                        {/*    <th>Tuedays</th>*/}
                        {/*    <th>Wednesdays</th>*/}
                        {/*    <th>Thursdays</th>*/}
                        {/*    <th>Fridays</th>*/}
                        {/*</tr>*/}
                        </thead>
                        <tbody>
                        {/*{timeSlots.map((e, idx) => (*/}
                        {/*    <tr key={idx} style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>*/}
                        {/*        <td>*/}
                        {/*            {formatMilitaryTime(e.startTime)} - {formatMilitaryTime(e.endTime)}*/}
                        {/*        </td>*/}
                        {/*        {renderTimeSlotCheckboxes(idx)}*/}
                        {/*    </tr>*/}
                        {/*))}*/}

                        <tr style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                            <td>
                                <input type={"checkbox"} /> Monday
                            </td>
                            <td>
                                <label>From</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                            <td>
                                <label>To</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                        </tr>
                        <tr style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                            <td>
                                <input type={"checkbox"} />   Tuesday
                            </td>
                            <td>
                                <label>From</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                            <td>
                                <label>To</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                        </tr>
                        <tr style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                            <td>
                                <input type={"checkbox"} />  Wednesday
                            </td>
                            <td>
                                <label>From</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                            <td>
                                <label>To</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                        </tr>
                        <tr style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                            <td>
                                <input type={"checkbox"} /> Thursday
                            </td>
                            <td>
                                <label>From</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                            <td>
                                <label>To</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                        </tr>
                        <tr style={{borderRadius: '10px', background: color.neutral.LIGHTGRAY}}>
                            <td>
                                <input type={"checkbox"} />  Friday
                            </td>
                            <td>
                                <label>From</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                            <td>
                                <label>To</label>
                                <DatePicker
                                    selected={newSeasonInput.startDate}
                                    onChange={date => handleFormInput(date, "Start Date")}
                                    selectsStart
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            </td>
                        </tr>
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

export default AddPartnersToProgramModal;