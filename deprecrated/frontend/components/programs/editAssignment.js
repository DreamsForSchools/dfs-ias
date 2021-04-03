
import React, { useState, useRef, useEffect } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default function EditAssignment({
    open,
    setOpen,
    editedRow,
    programData,
    rows,
    setRows,
    instructorDict,
    schoolDict,
  }){
    const [program, setProgram] = useState('');
    const [programList, setProgramList] = useState([]);
    const [school, setSchool] = useState('');
    const [schoolList, setSchoolList] = useState([]);
    useEffect(()=>{
        if (rows && instructorDict && editedRow){
            setProgramList(instructorDict[rows[editedRow]['instructor']]['programs_teaching']);
        }
    },[editedRow]);
    const handleProgramChange = (val)=>{
      setProgram(val);
      setSchoolList(Object.keys(programData[val]['assigned_schools']));
    };
    const handleEdit = () => {
      const schedule = {};
      for (const day in schoolDict[school]['programs'][Object.keys(schoolDict[school]['programs'])[0]]){
        if (day != 'number_of_instructors'){
            schedule[day] = schoolDict[school]['programs'][Object.keys(schoolDict[school]['programs'])[0]][day]
        }  
      }
      rows[editedRow]['school'] = school;
      rows[editedRow]['program'] = program;
      rows[editedRow]['lock'] = true;
      rows[editedRow]['schedule'] = schedule;
      setProgram('');
      setSchool('');
      setSchoolList([]);
      setRows(rows);
      setOpen(false);
    }
    if(!rows || !instructorDict || !schoolDict|| !editedRow){
        return null;
    }
    return(<>
      <Dialog style={{height:'100%'}} open={open} onClose={()=>setOpen(false)} aria-label="add-program-dialog">
              <DialogTitle id="add-program-dialog-title">
                  Manual Assignment
              </DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      {/* {console.log(instructorDict, rows, editedRow, )} */}
                      Assign <b>{instructorDict[rows[editedRow]['instructor']]['name']}</b> to prefered program and school.
                  </DialogContentText>
          
                  <form style={{display: 'flex',flexDirection: 'column',margin: 'auto',width: 'fit-content',}} noValidate>
                      <FormControl style={{minWidth:'200px'}}>
                          <InputLabel
                              children='Program' id="ManualAssignemnetProgram"/>
                          <Select id="ManualAssignemnetProgramSelect" value={program} onChange={(event)=>handleProgramChange(event.target.value)}>
                              {programList.map(programName => (<MenuItem  value={programName} key={"ManAssItem"+programName}>{programName}</MenuItem >))}
                          </Select>
                      </FormControl>
                      <FormControl style={{minWidth:'200px'}}>
                          <InputLabel
                              children='School' id="ManAssSchool"/>
                          <Select id="ManAssSchoolSelect" value={school} onChange={(event)=>setSchool(event.target.value)}>
                              {schoolList.map(schoolId => (<MenuItem  value={schoolId} key={"ManAssItem"+schoolId}>{schoolDict[schoolId]['name']}</MenuItem >))}
                          </Select>
                      </FormControl>
                  </form>
              </DialogContent>
              <DialogActions>
                  <Button
                      children={'Cancel'} 
                      onClick={()=>setOpen(false)} color="primary"
                  />
                  <Button
                      children={'Confirm'}
                      disabled={(program==='') || (school==='')} 
                      onClick={()=>handleEdit()} variant="contained" color="primary"
                  />
              </DialogActions>
          </Dialog>
    </>);
  
  }