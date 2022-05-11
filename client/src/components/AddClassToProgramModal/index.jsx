/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Modal, Row, Col, Table } from 'react-bootstrap';
import { Input, Select } from '../../design-system/form';
import DatePicker from 'react-datepicker';
// import {loadPartner} from "../../api/partner";

import { GlobalContext } from '../../context/GlobalContextProvider';
import { color } from '../../design-system/style';

const AddClassToProgramModal = ({
    handleSubmit,
    programContext,
    classData,
}) => {
    const { seasonSelected, partnerData } = useContext(GlobalContext);
    const [imageBase64, setImageBase64] = React.useState(null);
    const [validated, setValidated] = useState(false);
    const [newClassInput, setClassInput] = useState({
        instructorsNeeded: classData ? classData.instructorsNeeded : '',
        seasonId: seasonSelected.seasonId,
        partnerId: classData
            ? `${classData.partner.partnerId} - ${
                  classData.partner.district ?? ''
              } ${classData.partner.name}`
            : '',
        programId: programContext.programId,
    });

    const initialTimings = [
        { active: false, startTime: null, endTime: null },
        { active: false, startTime: null, endTime: null },
        { active: false, startTime: null, endTime: null },
        { active: false, startTime: null, endTime: null },
        { active: false, startTime: null, endTime: null },
    ];

    if (classData) {
        classData.timings.forEach((timing, index) => {
            const startTime = new Date(
                new Date().toDateString() + ' ' + timing.startTime
            );
            const endTime = new Date(
                new Date().toDateString() + ' ' + timing.endTime
            );
            initialTimings[index] = { ...timing, startTime, endTime };
            initialTimings[index].active = true;
        });
    }

    const [timing, setTiming] = React.useState(initialTimings);

    const [partnersList, setPartnersList] = useState([]);

    const dates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    useEffect(async () => {
        if (programContext)
            setImageBase64(
                new Buffer.from(programContext.logo.data).toString('ascii')
            );

        try {
            const partners = [];
            Object.values(partnerData).forEach((e) => {
                if (
                    !programContext.classes.some(
                        (cls) => cls.partner.partnerId === e.partnerId
                    ) ||
                    (classData &&
                        !classData.duplicate &&
                        classData.partner.partnerId === e.partnerId)
                ) {
                    partners.push(
                        `${e.partnerId} - ${e.district ?? ''} ${e.name}`
                    );
                }
            });
            setPartnersList(partners);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleFormInput = (input = null, field) => {
        switch (field) {
            case 'Instructors Needed':
                setClassInput({ ...newClassInput, instructorsNeeded: input });
                break;
            case 'Partner':
                setClassInput({ ...newClassInput, partnerId: input });
                break;
            // no default
        }
    };

    const handleSubmitButtonPress = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            const timingParsed = [];
            timing.forEach((e, idx) => {
                if (e.active) {
                    timingParsed.push({
                        weekday: idx + 1,
                        startTime: e.startTime.toLocaleTimeString('en-US', {
                            hour12: false,
                        }),
                        endTime: e.endTime.toLocaleTimeString('en-US', {
                            hour12: false,
                        }),
                    });
                }
            });

            handleSubmit('CLASS', {
                classId: classData ? Number(classData.classId) : null,
                instructorsNeeded: Number(newClassInput.instructorsNeeded),
                seasonId: newClassInput.seasonId,
                partnerId: newClassInput.partnerId
                    ? Number(
                          newClassInput.partnerId.substr(
                              0,
                              newClassInput.partnerId.indexOf(' ')
                          )
                      )
                    : null,
                programId: newClassInput.programId,
                timings: timingParsed,
                duplicate: classData && classData.duplicate,
            });
        }
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
    };

    const handleTimingChange = (type, time, index) => {
        const temp = timing.slice();
        switch (type) {
            case 'active':
                temp[index].active = !temp[index].active;
                break;
            case 'start':
                temp[index].startTime = time;
                break;
            case 'end':
                temp[index].endTime = time;
                break;
            // no default
        }
        setTiming(temp);
    };

    return (
        <>
            <Modal.Header
                closeButton
                style={{ padding: '2rem 3rem 0 3rem', border: '0' }}>
                <Modal.Title>
                    {classData
                        ? classData.duplicate
                            ? 'Duplicate the'
                            : 'Edit the'
                        : 'Create a new'}{' '}
                    class for {seasonSelected.name}
                </Modal.Title>
            </Modal.Header>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmitButtonPress}>
                <Modal.Body>
                    <div
                        style={{
                            padding: '2rem 4rem 0 4rem',
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <div style={{ width: '50%', marginRight: '1.5rem' }}>
                            <img style={{ width: 250 }} src={imageBase64} />
                        </div>
                        <div
                            style={{ width: '50%', marginRight: '1.5rem' }}
                            data-testid="classPartners">
                            <Input
                                disabled
                                label={'Program'}
                                state={programContext.name}
                                modal
                            />
                            <Select
                                required
                                options={partnersList}
                                label={'Partner'}
                                handler={handleFormInput}
                                state={newClassInput.partnerId}
                                modal
                            />
                            <Select
                                options={Array.from(
                                    { length: 10 },
                                    (_, i) => i + 1
                                )}
                                label={'Instructors Needed'}
                                handler={handleFormInput}
                                state={newClassInput.instructorsNeeded}
                                modal
                            />
                        </div>
                    </div>
                    <Table
                        borderless
                        style={{
                            padding: '2rem 4rem 0 4rem',
                            borderSpacing: '0 0.4rem',
                            borderCollapse: 'separate',
                        }}>
                        <tbody>
                            {dates.map((e, idx) => (
                                <tr
                                    key={idx}
                                    style={{
                                        borderRadius: '10px',
                                        background: color.neutral.LIGHTGRAY,
                                    }}>
                                    <td>
                                        <input
                                            type={'checkbox'}
                                            defaultChecked={timing[idx].active}
                                            value={timing[idx].active}
                                            onClick={() =>
                                                handleTimingChange(
                                                    'active',
                                                    null,
                                                    idx
                                                )
                                            }
                                            disabled={
                                                classData && classData.duplicate
                                            }
                                        />{' '}
                                        {e}
                                    </td>
                                    <td>
                                        {timing[idx].active && (
                                            <div style={{ display: 'flex' }}>
                                                <div
                                                    className={
                                                        'date-picker-from-control'
                                                    }>
                                                    <label
                                                        style={{
                                                            marginRight:
                                                                '0.5rem',
                                                        }}>
                                                        From:
                                                    </label>
                                                    <DatePicker
                                                        selected={
                                                            timing[idx]
                                                                .startTime
                                                        }
                                                        onChange={(time) =>
                                                            handleTimingChange(
                                                                'start',
                                                                time,
                                                                idx
                                                            )
                                                        }
                                                        selectsStart
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={30}
                                                        timeCaption="Time"
                                                        dateFormat="h:mm aa"
                                                        disabled={
                                                            classData &&
                                                            classData.duplicate
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        'date-picker-from-control'
                                                    }>
                                                    <label
                                                        style={{
                                                            marginLeft: '1rem',
                                                            marginRight:
                                                                '0.5rem',
                                                        }}>
                                                        To:
                                                    </label>
                                                    <DatePicker
                                                        selected={
                                                            timing[idx].endTime
                                                        }
                                                        onChange={(time) =>
                                                            handleTimingChange(
                                                                'end',
                                                                time,
                                                                idx
                                                            )
                                                        }
                                                        selectsStart
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={30}
                                                        timeCaption="Time"
                                                        dateFormat="h:mm aa"
                                                        disabled={
                                                            classData &&
                                                            classData.duplicate
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer
                    style={{ border: '0', padding: '0 3rem 2rem 3rem' }}>
                    <Button
                        variant="primary"
                        type="submit"
                        data-testid="addClassSubmit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </>
    );
};

export default AddClassToProgramModal;
