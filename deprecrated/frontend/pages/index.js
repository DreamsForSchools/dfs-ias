import {useEffect, useState} from 'react';
import Layout from '../components/layout/layout'
import Table from '../components/table/table'
import Programs from '../components/programs/programs'

import { useRequireAuth } from "../lib/useAuth";
import { useData } from "../lib/useData";


import Loading from '../components/loading';

export default function App() {
  console.log("1. App Main Page Component");

  const auth = useRequireAuth();
  const {data: seasonsData, error: seasonError} = useData('Seasons', true);
  const {data: programData, error: programError} = useData('Programs', auth.currentSeason, seasonsData);
  const {data: instructorRows, error: instructorError} = useData('Instructors', auth.currentSeason, seasonsData);
  const {data: schoolRows, error: schoolError} = useData('Schools', auth.currentSeason, seasonsData);
  const [sortPageToggle, setSortPageToggle] = useState(false);
  useEffect(()=>{
    if(seasonsData){
      auth.setSeasonList(seasonsData);
      if(seasonsData.length){
        auth.currentSeason?null:auth.setCurrentSeason(seasonsData[0]?seasonsData[0]:'');
      }
    }
      
  },[seasonsData]);
  
  if(!auth || !auth.user || (!seasonsData && !seasonError)){
    return (<Loading />);
  }else if(seasonError){
    console.log("Error::useData('Seasons',null)::Error", seasonError);
    return (<h1>ERROR. Check console logs</h1>);
  }
    
  return (
    <Layout  pageName={auth.pageName} setSortPageToggle={setSortPageToggle}>
      {auth.pageName === 'Programs'     ?   
        <Programs 
          programData={programData} 
          instructorRows={instructorRows} 
          schoolRows={schoolRows}
          error={programError && instructorError && schoolError}
          sortPageToggle={sortPageToggle}
          setSortPageToggle={setSortPageToggle}
        />
      :null}
      {auth.pageName === 'Instructors'  ?   
        <Table 
          table_type={auth.pageName} 
          rows={instructorRows}
          error={instructorError}
          programData={programData}
          programError={programError}
        />
      :null}
      {auth.pageName === 'Schools'      ?   
        <Table 
          table_type={auth.pageName} 
          rows={schoolRows}
          error={schoolError}
          programData={programData}
          programError={programError}
        />
      :null}
    </Layout>
  );
}
