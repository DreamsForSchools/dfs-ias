import React, { useState, useContext, useEffect } from 'react';
import OptionsBar from './OptionsBar';
import './OptionsBar.scss';
import { Select } from '../../design-system/form';
import {
    Page,
    SideInfoWrapper,
    Wrapper,
    GalleryWrapper,
} from '../../design-system/layout/Styled';
import AddNewProgramModal from '../../components/AddNewProgramModal';
import AddNewPartnerModal from '../../components/AddNewPartnerModal';
import AddClassToProgramModal from '../../components/AddClassToProgramModal';
import {
    saveProgram,
    savePartner,
    deleteProgram,
    deletePartner,
    updatePartner,
} from '../../api';
import { saveClass, updateClass, deleteClass } from '../../api/class';
import { PartnerCard, ProgramCard } from '../../design-system/components/Cards';
import { GlobalContext } from '../../context/GlobalContextProvider';
import Lottie from 'lottie-react';
import emptyAnimation from '../../assets/empty-animation.json';
//dummy data: to be removed once connect to backend
import PartnerSideInfo from './PartnerSideInfo';
import ProgramSideInfo from './ProgramSideInfo';
import {
    Button,
    FormControl,
    InputGroup,
    Modal,
    OverlayTrigger,
    Popover,
    PopoverTitle,
    PopoverContent,
    Form,
} from 'react-bootstrap';
import { Filter, PlusCircle, Search } from 'react-bootstrap-icons';
import AddClassToPartnerModal from '../../components/AddClassToPartnerModal';

const ClassesPartners = () => {
    const {
        setToastText,
        seasonSelected,
        programData,
        partnerData,
        fetchProgramsAggregatedForCurrentSeason,
        fetchPartnersAggregatedForCurrentSeason,
    } = useContext(GlobalContext);
    const [viewType, setViewType] = useState('Classes');
    const [modalType, setModalType] = useState(null);
    const [filterType, setFilterType] = useState('All');
    const [dataIdFocus, setDataIdFocus] = useState(null);
    const [showInputModal, setShowInputModal] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [className, setClassName] = useState('');
    const [partnerName, setPartnerName] = useState('');

    const handleCloseInputModal = () => {
        setModalType(null);
        setShowInputModal(false);
        setCurrentData(null);
    };

    const handleOpenInputModal = (type, curData) => {
        setModalType(type);
        if (curData) {
            setCurrentData(curData);
        }
    };

    useEffect(() => {
        if (modalType) setShowInputModal(true);
    }, [modalType]);

    const getViewType = (type) => {
        if (type === 'Programs') {
            setPartnerName('');
        } else {
            setClassName('');
        }
        setViewType(type);
        setDataIdFocus(null);
    };

    const handleCardClick = (data) => {
        setDataIdFocus(data);
    };

    const handleFilterInput = (e) => {
        const value = e.target.value;
        if (viewType === 'Classes') {
            setClassName(value);
        } else {
            setPartnerName(value);
        }
    };

    const renderSideInfo = () => {
        if (dataIdFocus !== null) {
            if (viewType === 'Partners') {
                return (
                    <PartnerSideInfo
                        partner={partnerData[dataIdFocus]}
                        openModal={handleOpenInputModal}
                        onDeletePress={onDeletePress}
                    />
                );
            } else if (viewType === 'Classes') {
                return (
                    <ProgramSideInfo
                        program={programData[dataIdFocus]}
                        openModal={handleOpenInputModal}
                        onDeletePress={onDeletePress}
                    />
                );
            }
        }
    };

    const handleSubmit = async (type, data) => {
        switch (type) {
            case 'PROGRAM':
                await saveProgram(data);
                break;
            case 'PARTNER':
                console.log(data);
                if (data.partnerId && !data.duplicate) {
                    await updatePartner(data);
                } else {
                    await savePartner(data);
                }
                break;
            case 'CLASS':
                if (data.classId && !data.duplicate) {
                    await updateClass(data);
                } else {
                    await saveClass(data);
                }
                break;
            // no default
        }

        handleCloseInputModal();
        fetchPartnersAggregatedForCurrentSeason();
        fetchProgramsAggregatedForCurrentSeason();
    };

    const renderClasses = () => {
        // TODO: implement rendering by filter here
        let classList = programData !== null && Object.values(programData);
        if (className.trim()) {
            classList = classList.filter(
                (program) =>
                    program.name
                        .toLowerCase()
                        .indexOf(className.toLowerCase()) !== -1
            );
        }

        if (programData === null || classList.length === 0) {
            return (
                <div
                    style={{
                        margin: '2rem auto',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        padding: '0 2rem 0 1rem',
                        borderRadius: 20,
                        alignItems: 'center',
                    }}>
                    <Lottie
                        animationData={emptyAnimation}
                        style={{ width: 200, height: 200 }}
                    />
                    {programData === null ? (
                        <h5>Looking for classes</h5>
                    ) : (
                        <h5>No class found. Let's add some!</h5>
                    )}
                </div>
            );
        }

        return classList.map((e, index) => {
            return (
                <ProgramCard
                    item={e}
                    key={e.programId}
                    onClick={handleCardClick}
                />
            );
        });
    };

    const renderPartners = () => {
        // TODO: implement rendering by filter here
        let partnersList = partnerData !== null && Object.values(partnerData);
        if (partnerName.trim()) {
            partnersList = partnersList.filter(
                (partner) =>
                    partner.name
                        .toLowerCase()
                        .indexOf(partnerName.toLowerCase()) !== -1
            );
        }

        if (partnerData === null || partnersList.length === 0) {
            return (
                <div
                    style={{
                        margin: '2rem auto',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        padding: '0 2rem 0 1rem',
                        borderRadius: 20,
                        alignItems: 'center',
                    }}>
                    <Lottie
                        animationData={emptyAnimation}
                        style={{ width: 200, height: 200 }}
                    />
                    {partnerData === null ? (
                        <h5>Looking for partners</h5>
                    ) : (
                        <h5>No partners found. Let's add some!</h5>
                    )}
                </div>
            );
        }

        return partnersList
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((e, index) => {
                return (
                    <PartnerCard
                        item={e}
                        key={e.partnerId}
                        onClick={handleCardClick}
                    />
                );
            });
    };

    const onDeletePress = async (type, id) => {
        if (type === 'PROGRAM') {
            await deleteProgram(id);
            fetchProgramsAggregatedForCurrentSeason();
        } else if (type === 'PARTNER') {
            await deletePartner(id);
            fetchPartnersAggregatedForCurrentSeason();
        } else if (type === 'CLASS') {
            await deleteClass(id);
            fetchProgramsAggregatedForCurrentSeason();
        }
    };

    return (
        <Page>
            <Wrapper>
                <div
                    style={{
                        padding: '2rem 3rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <InputGroup style={{ width: 'auto' }}>
                        <Select
                            label={'View By: '}
                            options={['Programs', 'Partners']}
                            handler={getViewType}
                            modal={false}
                            state={viewType}
                        />
                    </InputGroup>
                    <InputGroup style={{ width: 'auto' }}>
                        <OverlayTrigger
                            trigger="click"
                            rootClose
                            placement="bottom"
                            overlay={
                                <Popover id="popover-basic">
                                    <Form.Control
                                        style={{ border: 'none' }}
                                        type="text"
                                        placeholder={
                                            viewType === 'Classes'
                                                ? 'Class name'
                                                : 'Partner name'
                                        }
                                        value={
                                            viewType === 'Classes'
                                                ? className
                                                : partnerName
                                        }
                                        onChange={handleFilterInput}
                                    />
                                </Popover>
                            }>
                            <Button
                                variant="outline-primary"
                                style={{ marginLeft: 'auto' }}
                                data-testid="filter">
                                <Filter style={{ marginRight: '0.5rem' }} />
                                Filter
                            </Button>
                        </OverlayTrigger>
                        <Button
                            variant="primary"
                            style={{ marginLeft: '2rem' }}
                            onClick={() => handleOpenInputModal(viewType)}
                            data-testid="addBtn">
                            <PlusCircle style={{ marginRight: '0.5rem' }} />
                            <span>Add {viewType.slice(0, -1)}</span>
                        </Button>
                        {viewType === 'Classes' && (
                            <Button
                                variant="primary"
                                style={{
                                    marginLeft: '2rem',
                                    marginRight: '1rem',
                                }}
                                onClick={() => handleOpenInputModal('Partners')}
                                data-testid="addPartnerBtn">
                                <PlusCircle style={{ marginRight: '0.5rem' }} />
                                <span>Add Partner</span>
                            </Button>
                        )}
                    </InputGroup>
                </div>

                <GalleryWrapper>
                    {viewType === 'Partners' && renderPartners()}
                    {viewType === 'Classes' && renderClasses()}
                </GalleryWrapper>
            </Wrapper>
            <SideInfoWrapper>{renderSideInfo()}</SideInfoWrapper>

            <Modal
                size="lg"
                show={showInputModal && modalType !== null}
                onHide={handleCloseInputModal}>
                {modalType === 'Classes' && (
                    <AddNewProgramModal handleSubmit={handleSubmit} />
                )}
                {modalType === 'Partners' && (
                    <AddNewPartnerModal
                        handleSubmit={handleSubmit}
                        partnerList={partnerData}
                        partnerData={currentData}
                    />
                )}
                {modalType === 'ClassToProgram' && (
                    <AddClassToProgramModal
                        handleSubmit={handleSubmit}
                        programContext={programData[dataIdFocus]}
                        classData={currentData}
                    />
                )}
                {modalType === 'ClassToPartner' && (
                    <AddClassToPartnerModal
                        handleSubmit={handleSubmit}
                        partnerContext={partnerData[dataIdFocus]}
                    />
                )}
            </Modal>
        </Page>
    );
};

export default ClassesPartners;
