import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [seasonNameSelected, setSeasonNameSelected] = useState('');
    const [seasonIdSelected, setSeasonIdSelected] = useState(null);
    const [toastShow, setToastShow] = useState(false);
    const [toastText, setToastText] = useState({status: '', message: ''});

    useEffect(() => {
        if (toastText.status !== '')
            setToastShow(true);
    }, [toastText]);

    return (
        <GlobalContext.Provider value={{
            seasonNameSelected, setSeasonNameSelected,
            seasonIdSelected, setSeasonIdSelected,
            toastShow, setToastShow,
            toastText, setToastText
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;