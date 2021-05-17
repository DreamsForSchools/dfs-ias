import React, { createContext, useState, useEffect } from "react";
import {loadAllSeason, loadProgramsAggregated, loadPartnersAggregated} from "../api";
import { toast } from "react-toastify";
import fire from "../fire";
export const GlobalContext = createContext();

// All data fetched from the database will be stored in the global context store.

const GlobalContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const [seasonSelected, setSeasonSelected] = useState(null);
    const [seasonData, setSeasonData] = useState({});

    const [programData, setProgramData] = useState(null);
    const [partnerData, setPartnerData] = useState(null);

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
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (seasonSelected) {
            localStorage.setItem('seasonSelectedId', seasonSelected.seasonId);
            toast(`🙌 ${seasonSelected.name} season selected!`)
            fetchProgramsAggregatedForCurrentSeason();
            fetchPartnersAggregatedForCurrentSeason();
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
    }

    const fetchPartnersAggregatedForCurrentSeason = async () => {
        const allPartners = await loadPartnersAggregated(seasonSelected.seasonId);
        setPartnerData(allPartners);
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
            toastShow, setToastShow,
            toastText, setToastText
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;