import { createContext, useState } from 'react';
import { getRandomInstructorSet } from "../../util/sampleData";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [sorterData, setSorterData] = useState([]);
  const [searchedInstructors, setSearchedInstructors] = useState(getRandomInstructorSet(10));
  const [programs, setPrograms] = useState(
    [
      {
        name: "AppJam",
        color: "#BB6BD9"
      },
      {
        name: "WebJam",
        color: "#40CCC8"
      },
      {
        name: "LESTEM",
        color: "#F2994A"
      },
      {
        name: "Scratch",
        color: "#F2C94C"
      },
      {
        name: "Engineering Inventors",
        color: "#4B4B92"
      }
    ]
  );
  const [partners, setPartners] = useState(["Villa Fundamental", "Carr Intermediate", "Fremont Fundamental", "Edison Elementary"])
    
  return (
    <AppContext.Provider value={{
      sorterData, setSorterData,
      searchedInstructors, setSearchedInstructors,
      programs, setPrograms,
      partners, setPartners,
    }}>
      {children}
    </AppContext.Provider>
  );
}
 
export default AppContextProvider;
