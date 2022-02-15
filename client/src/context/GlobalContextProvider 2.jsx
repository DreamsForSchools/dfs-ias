import React, { createContext, useState, useEffect } from "react";
import {loadAllSeason, loadProgramsAggregated, loadPartnersAggregated, loadAllInstructorsAggregated} from "../api";
import { toast } from "react-toastify";
import fire from "../fire";
export const GlobalContext = createContext();

// All data fetched from the database will be stored in the global context store.

const GlobalContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const [seasonSelected, setSeasonSelected] = useState(null);
    const [seasonData, setSeasonData] = useState({});

    const [programData, setProgramData] = useState(null);
    const [programColorMap, setProgramColorMap] = useState(null);

    const [partnerData, setPartnerData] = useState(null);
    const [instructorData, setInstructorData] = useState(null);

    const [toastShow, setToastShow] = useState(false);
    const [toastText, setToastText] = useState({status: '', message: ''});


    useEffect(() => {
        if (toastText.status !== '')
            setToastShow(true);
    }, [toastText]);

    useEffect(() => {
        if (isLoggedIn) fetchAllSeasonData();
        else if (!isLoggedIn) {
            setSeasonData({});
            setSeasonSelected(null);
            setPartnerData(null);
            setProgramData(null);
            setInstructorData(null);
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (seasonSelected) {
            localStorage.setItem('seasonSelectedId', seasonSelected.seasonId);
            toast(`🙌 ${seasonSelected.name} season selected!`)
            fetchProgramsAggregatedForCurrentSeason();
            fetchPartnersAggregatedForCurrentSeason();
            fetchAllInstructorAggregatedData();
        }
    }, [seasonSelected])

    const fetchAllSeasonData = async () => {
        const allSeason = await loadAllSeason();
        setSeasonData(allSeason);

        const seasonSorted = Object.values(allSeason).sort((a, b) => {
            return new Date(b.startDate) - new Date(a.startDate);
        });

        seasonSorted.length > 0 && setSeason(
            localStorage.getItem('seasonSelectedId') ?
                localStorage.getItem('seasonSelectedId') :
                    seasonSorted[0].seasonId,
            allSeason);
    }

    const fetchProgramsAggregatedForCurrentSeason = async () => {
        const allPrograms = await loadProgramsAggregated(seasonSelected.seasonId);
        setProgramData(allPrograms);

        const colorMap = {};
        Object.values(allPrograms).forEach((e) => {
            colorMap[e.name] = e.color;
        })

        setProgramColorMap(colorMap);
    }

    const fetchPartnersAggregatedForCurrentSeason = async () => {
        const allPartners = await loadPartnersAggregated(seasonSelected.seasonId);
        setPartnerData(allPartners);
    }

    const fetchAllInstructorAggregatedData = async () => {
        const allInstructors = await loadAllInstructorsAggregated(seasonSelected.seasonId);
        setInstructorData(allInstructors);
    }

    const setSeason = (id, map = seasonData) => {
        setSeasonSelected(map[id]);
    }

    fire.auth().onAuthStateChanged((user) => {
        return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });

    return (
        <GlobalContext.Provider value={{
            isLoggedIn, setIsLoggedIn,
            seasonSelected, setSeason: setSeason,
            seasonData, fetchAllSeasonData: fetchAllSeasonData,
            programData, fetchProgramsAggregatedForCurrentSeason: fetchProgramsAggregatedForCurrentSeason,
            partnerData, fetchPartnersAggregatedForCurrentSeason: fetchPartnersAggregatedForCurrentSeason,
            instructorData, fetchAllInstructorAggregatedData: fetchAllInstructorAggregatedData,
            toastShow, setToastShow,
            toastText, setToastText,
            programColorMap
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;