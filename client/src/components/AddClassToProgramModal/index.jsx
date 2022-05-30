import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Input, Select } from '../../design-system/form';
import DatePicker from 'react-datepicker';

import { GlobalContext } from '../../context/GlobalContextProvider';

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

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [partnersList, setPartnersList] = useState([]);

    // Used to display different options for which day the section should take place
    const dates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Maps days of the week to a value that the database understands.
    const dayValueMap = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
    };
    const [dayOfTheWeek, setDayOfTheWeek] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line default-case
        switch (field) {
            case 'Instructors Needed':
                setClassInput({ ...newClassInput, instructorsNeeded: input });
                break;
            case 'Partner':
                setClassInput({ ...newClassInput, partnerId: input });
                break;
            case 'Day of the week':
                // Parses the selected day of the week to an integer value the database understands.
                setDayOfTheWeek(dayValueMap[input]);
                console.log(dayOfTheWeek);
                break;
        }
    };

    /**
     * Parses start and end times and uses that to create a new section in the database.
     * Note that the timings array should now only hold one start and end time. This is due to
     * the new instructor assignment modal in the Sorter page.
     * @param {*} e Form currentTarget
     */
    const handleSubmitButtonPress = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            const timing = {
                weekday: dayOfTheWeek,
                startTime: startTime.toLocaleTimeString('en-US', {
                    hour12: false,
                }),
                endTime: endTime.toLocaleTimeString('en-US', { hour12: false }),
            };
            console.log(timing)

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
                timings: [timing],
                duplicate: classData && classData.duplicate,
            });
        }

        // No clue what these do -- one of the previous groups wrote this and I don't know what it does
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
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
                            <img
                                alt=""
                                style={{ width: 250 }}
                                src={imageBase64}
                            />
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
                    <Select
                        required
                        options={dates}
                        label="Day of the week"
                        handler={handleFormInput}
                        modal
                    />
                    <div style={{ display: 'flex' }}>
                        <div className={'date-picker-from-control'}>
                            <label style={{ marginRight: '0.5rem' }}>
                                From:
                            </label>
                            <DatePicker
                                selected={startTime}
                                onChange={(time) => setStartTime(time)}
                                selectsStart
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                        <div className={'date-picker-from-control'}>
                            <label
                                style={{
                                    marginLeft: '1rem',
                                    marginRight: '0.5rem',
                                }}>
                                To:
                            </label>
                            <DatePicker
                                selected={endTime}
                                onChange={(time) => setEndTime(time)}
                                selectsStart
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                        </div>
                    </div>
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
