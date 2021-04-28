import { createContext, useState } from 'react';
import { getRandomInstructorSet } from "../../util/sampleData";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [sorterData, setSorterData] = useState([]);
  const [searchedInstructors, setSearchedInstructors] = useState(getRandomInstructorSet(10));
  const [programs, setPrograms] = useState(
    [
      {
        index: 1,
        name: "AppJam",
        color: "#BB6BD9"
      },
      {
        index: 2,
        name: "WebJam",
        color: "#40CCC8"
      },
      {
        index: 3,
        name: "LESTEM",
        color: "#F2994A"
      },
      {
        index: 4,
        name: "Scratch",
        color: "#F2C94C"
      },
      {
        index: 5,
        name: "Engineering Inventors",
        color: "#4B4B92"
      }
    ]
  );
  const [partners, setPartners] = useState(
    [
      {
        index: 1,
        name: "Villa Fundamental",
      },
      {
        index: 2,
        name: "Carr Intermediate",
      },
      {
        index: 3,
        name: "Fremont Fundamental",
      },
      {
        index: 4,
        name: "Edison Elementary",
      }
    ]
  );
    
  return (
    <AppContext.Provider 
      value={{
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
