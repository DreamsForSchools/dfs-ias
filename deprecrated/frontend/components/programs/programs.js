  import {useEffect, useState} from 'react'
  import Grid from '@material-ui/core/Grid';

  import ProgramsPageTitleBar from './programsPageTitleBar';

  import ProgramCards from './programCards';
  import TableView from './tableView';

  import { useAuth } from "../../lib/useAuth.js";
  import { mutate } from 'swr';


  import firebase from 'firebase/app'
  import 'firebase/database';
  import Loading from '../loading';


  export default function Programs({
    programData, 
    instructorRows, 
    schoolRows, 
    error,sortPageToggle,setSortPageToggle
  }){
    console.log('2. Programs Component');

    const {currentSeason} = useAuth();  
    
    const [tableViewSwitch, setTableViewSwitch] = useState(true);
    const [sortData, setSortData] = useState([]);
    const [instructorDict, setInstructorDict] = useState({});
    const [schoolDict, setSchoolDict] = useState({});
    const [loading, setLoading] = useState(false);
    
    const handleProgramChange = ({oldProgramName, newProgramName, deleting})=>{
      // When a program is deleted or its name is changed then this function
      // makes respective changes to every school and instructor.
      if(!deleting && oldProgramName === newProgramName){
        return null
      }
      for(const instructor of instructorRows){
        const index = instructor['programs_teaching'].indexOf(oldProgramName)
        if(index > -1){
          if(!deleting){
            instructor['programs_teaching'][index] = newProgramName;
            instructor['programs'][newProgramName] = instructor['programs'][oldProgramName];
          }else{
            instructor['programs_teaching'].splice(index,1);
          }
          delete instructor['programs'][oldProgramName];
        }
      }
      for(const school of schoolRows){
        if(school['programs'].hasOwnProperty(oldProgramName)){
          if(!deleting){
            school['programs'][newProgramName] = school['programs'][oldProgramName];
          }
          delete school['programs'][oldProgramName];
        } 
      }

      mutate(['Instructors', currentSeason], instructorRows, false);
      mutate(['Schools', currentSeason], schoolRows, false);

      return null;
    };
    const newSortHandler = async () => {
      const request = {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Accept': 'application/json'},
          body: JSON.stringify({'Season': currentSeason}),
      };
      console.log("Initiated New Sort, Sending Request: ",request);

      const matchObject = await fetch(
              'https://apurva29.pythonanywhere.com/sort',
              request)
          .then(response => {console.log('Response Recieved');return response.json()})
          .catch(error => console.log('Error Fetching Sort api',error));
      console.log('Response Object', matchObject);
      
      setProgramVariables(matchObject, true);
      setSortPageToggle(()=>true);
      setLoading(()=>false);
    };
    const reSortHandler = async () => {
      const newSortData = {};
      for(const program in programData){
        newSortData[program] = {}
        for(const school in programData[program]['assigned_schools']){
          newSortData[program][school] = {}
        }
      }
      for(const instructor of sortData){
        if(instructor['lock']){
          newSortData[instructor['program']][instructor['school']][instructor['instructor']] = instructor['schedule'];
        }
      }
      const request = {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Accept': 'application/json'},
          body: JSON.stringify({'Season': currentSeason, 'Locked': newSortData}),
      };
      console.log("Initiated Re Sort, Sending Request: ",request);

      const matchObject = await fetch(
              'https://apurva29.pythonanywhere.com/resort',
              request)
          .then(response => {console.log('Response Recieved');return response.json()})
          .catch(error => console.log('Error Fetching Sort api',error));
      console.log('Response Object', matchObject);
      
      setProgramVariables(matchObject, true);
      setSortPageToggle(()=>true);
      setLoading(()=>false);
    };
    const setProgramVariables = (matchObject, mutateProgramData) => {
      if(!instructorRows || !schoolRows || !programData){
        return null;
      }
      const newInstructorDict = {};
      const unassignedInstructors = {};
      for(const instructor of instructorRows){
        newInstructorDict[instructor['id']] = instructor;
        unassignedInstructors[instructor['id']] = 0;
      }
      const newSchoolDict = {};
      const neededInstructors = {};
      for(const program in programData){
        neededInstructors[program] = 0;
      }
      for(const school of schoolRows){
        newSchoolDict[school['id']] = school;
        for(const program in school['programs']){
          neededInstructors[program]+=school['programs'][program]['number_of_instructors'];
        }
      }
      
      var newSortData = [];
      for(const program in matchObject){
        var assignedSchools = {};
        var assignedInstructors = 0;
        for(const schoolID in matchObject[program]){
          assignedSchools[schoolID] = {};
          for(const instructorID in matchObject[program][schoolID]){
            assignedSchools[schoolID][instructorID] = matchObject[program][schoolID][instructorID];
            var newSortEntry = {};
            newSortEntry['id'] = newSortData.length;
            newSortEntry['instructor'] = instructorID;
            newSortEntry['lock'] = false;
            newSortEntry['school'] = schoolID;
            newSortEntry['program'] = program;
            newSortEntry['schedule'] = matchObject[program][schoolID][instructorID];
            newSortData.push(newSortEntry);
            assignedInstructors += 1;
            if(instructorID in unassignedInstructors){
              delete unassignedInstructors[instructorID];
            }
          }
        }
        if(mutateProgramData){
          programData[program]['assigned_schools'] = assignedSchools;
          programData[program]['assigned_instructors'] = assignedInstructors;
          programData[program]['needed_instructors'] = neededInstructors[program];
        }
      }
      for(const instructorID in unassignedInstructors){
        newSortData.push({
          'id': newSortData.length,
          'instructor': instructorID, 
          'program':'Unassigned', 
          'school':'Unassigned', 
          'lock':false,
          'schedule':0});
      }
      if(mutateProgramData){
        programData['unassigned_instructors'] = Object.keys(unassignedInstructors).length;
        firebase.database().ref(currentSeason+'/Programs').set(programData);
        mutate(['Programs', currentSeason], programData, false);
      }
      
      setSortData(()=>newSortData);
      setInstructorDict(()=>newInstructorDict);
      setSchoolDict(()=>newSchoolDict);
    };
    useEffect(()=>{
      const newSortData = {};
      for(const program in programData){
        newSortData[program] = {}
        for(const school in programData[program]['assigned_schools']){
          newSortData[program][school] = programData[program]['assigned_schools'][school]
        }
      }
      setProgramVariables(newSortData, false);
    },[programData, sortPageToggle, instructorRows, schoolRows]);

    if(currentSeason === ''){
      return(<h1>Season not selected.</h1>);
    }else if(((!programData || !instructorRows || !schoolRows) && !error )|| loading){
      return (<Loading />);
    }else if(error){
      console.log("Error::useData(table_type,auth.)::Error", error);
      return (<h1>ERROR. Check console logs</h1>);
    }

    return(<>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{display:'block', height: '100%', height: '-webkit-calc(100% - 64px)', height: '-moz-calc(100% - 64px)',height: 'calc(100% - 64px)',}}
      >
        <ProgramsPageTitleBar 
          sortPageToggle={sortPageToggle} 
          setSortPageToggle={setSortPageToggle}
          tableViewSwitch={tableViewSwitch}
          setTableViewSwitch={setTableViewSwitch}
          programData={programData}
          newSortHandler={newSortHandler}
          reSortHandler={reSortHandler}
          setLoading={setLoading}
        />
        {sortPageToggle?  
          tableViewSwitch?
            <TableView 
              programData={programData} 
              rows={sortData}
              setRows={setSortData}
              instructorDict={instructorDict}
              schoolDict={schoolDict}
            />
            :
            null
          :
          <ProgramCards 
            programData={programData} 
            handleProgramChange={handleProgramChange} 
          />
        } 
      </Grid>
    </>);
                    
          
  }

