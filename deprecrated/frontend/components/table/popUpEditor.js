import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth } from "../../lib/useAuth.js";
import {mutate} from 'swr';

import Input from '@material-ui/core/Input';

import {deleteDocuments, addDocuments, editDocuments} from '../../lib/firestoreApi';


import ISO6391 from 'iso-639-1';
const languageList = ISO6391.getAllNames().sort();
export function AddInstructor({
    open, 
    setOpen,
    rows,
    programData,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 
    const [state, setState] = useState({
        ['name']: '',
        ['gender']: '',
        ['year_of_instruction']: '',
        ['major'] : '',
        ['university'] : '',
        ['region'] : '',
        ['address'] : '',
        ['car'] : false,
        ['returning_instructor'] : false,
        ['shirt_size'] : '',
        ['programs_teaching']: [],
        ['languages_spoken']: [],
        ['city']: '',
        ['phone_number']: '',
    });
    const handleChange = (event)=>{
        setState({...state, [event.target.name]: event.target.checked?true:event.target.value});
    };
    const handleAdd = () =>{
        state['region'] = [state['region']];
        state['schedule'] = {};
        for(const [key,day] of Object.entries({'Mon':'Monday','Tue':'Tuesday','Wed':'Wednesday','Thu':'Thursday','Fri':'Friday',})){
            if(state[key]){
                state['schedule'][day] = [{}];
                delete state[key];
                if(state[key+'_start']!=undefined){
                    state['schedule'][day][0]['start'] = state[key+'_start'];
                    delete state[key+'_start'];
                }else{
                    state['schedule'][day][0]['start'] = '00:00';
                }
                if(state[key+'_end']!=undefined){
                    state['schedule'][day][0]['end'] = state[key+'_end'];
                    delete state[key+'_end'];
                }else{
                    state['schedule'][day][0]['end'] = '00:00';
                }
            }
        }
        state['programs'] = {};
        for(const program of state['programs_teaching']){
            if(state['programs'+program]!=undefined){
                state['programs'][program] = state['programs'+program];
                delete state['programs'+program];
            }else{
                state['programs'][program] = 0;
            }
        }
        const added = [state];
        const newIds = addDocuments(currentSeason, 'Instructors', added);
        const changedRows = [
            ...rows,
            ...added.map((row, index) => ({
              id: newIds[index],
              ...row,
            })),
          ];
        mutate(['Instructors',currentSeason],changedRows,false);
        console.log(added);
        handleClose();
    };
    const handleClose = ()=>{
        setState({
            ['name']: '',
            ['gender']: '',
            ['year_of_instruction']: '',
            ['major'] : '',
            ['university'] : '',
            ['region'] : '',
            ['address'] : '',
            ['car'] : false,
            ['returning_instructor'] : false,
            ['shirt_size'] : '',
            ['programs_teaching']: [],
            ['languages_spoken']: [],
            ['city']: '',
            ['phone_number']: '',
        });
        setOpen(false);
    };
    return (
        <Dialog classes={{paper:classes.dialogPaper}} open={open} onClose={handleClose} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Add New Instructor
            </DialogTitle>
            <DialogContent style={{maxWidth:'700px'}}>
                <DialogContentText>
                    Add new instructor to current season. 
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.name}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'2 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Gender'/>
                          <Select value={state.gender} onChange={handleChange} name="gender">
                              <MenuItem  value='Male'>Male</MenuItem >
                              <MenuItem  value='Female'>Female</MenuItem >
                              <MenuItem  value='Other'>Other</MenuItem >
                          </Select>
                    </FormControl>
                    <TextField
                        label="Major"
                        name="major"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.major}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="University"
                        name="university"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.university}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Year of Instruction"
                        name="year_of_instruction"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.year_of_instruction}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Region"
                        name="region"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.region}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.address}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 2', gridRow:'4 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="City"
                        name="city"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.city}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'5 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.phone_number}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'5 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.car} onChange={handleChange} name="car" />}
                        label="Car"
                        style={{gridColumn:'1 / span 1', gridRow:'6 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.returning_instructor} onChange={handleChange} name="returning_instructor" />}
                        label="Returning"
                        style={{gridColumn:'2 / span 1', gridRow:'6 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <FormControl style={{gridColumn:'3 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}>
                          <InputLabel children='Shirt Size'/>
                          <Select name="shirt_size" value={state.shirt_size} onChange={handleChange}>
                              <MenuItem  value='XL'>XL</MenuItem >
                              <MenuItem  value='L'>L</MenuItem >
                              <MenuItem  value='M'>M</MenuItem >
                              <MenuItem  value='S'>S</MenuItem >
                              <MenuItem  value='XS'>XS</MenuItem >
                          </Select>
                    </FormControl>
                    <FormControl style={{gridColumn:'4 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}>
                          <InputLabel
                              children='Languages' id="ManualAssignemnetProgram"/>
                          <Select name='languages_spoken' value={state.languages_spoken} onChange={handleChange} multiple>
                              {languageList.map(lang => 
                                (<MenuItem  value={lang} key={"langItem"+lang+'addInst'}>{lang}</MenuItem >))}
                          </Select>
                    </FormControl>
                    <FormControl style={{gridColumn:'3 / span 1', gridRow:'2 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Programs'/>
                          <Select name="programs_teaching" value={state.programs_teaching} onChange={handleChange} input={<Input/>} multiple>
                              {Object.keys(programData).map(program => program!='unassigned_instructors'?(<MenuItem  value={program} key={"programs_teaching_"+program+'Inst'}>{program}</MenuItem >):null)}
                          </Select>
                    </FormControl>
                    <div style={{display:'flex', gridColumn:'4 / span 1', gridRow:'2 / span 2', placeSelf:'start stretch', padding:'0.5vh', margin:'0.5vh'}}>                        
                        <FormGroup>
                        <FormLabel component="legend">Program Prefrence</FormLabel>
                        {state.programs_teaching.map((program)=>(
                            <FormControlLabel style={{margin: '0.5vh', padding:'0.5vh'}}
                                control={
                                <Select name={'programs'+program} value={state['programs'+program]?state['programs'+program]:''} onChange={handleChange}>
                                    {[0,1,2,3,4,5,6,7,8,9,10].map(prefInt=><MenuItem  value={prefInt} key={"programs"+program+prefInt}>{prefInt}</MenuItem >)}
                                </Select>}
                                label={program}
                            />
                        ))}
                        </FormGroup>
                    </div>
                    <div style={{gridColumn:'3 / span 1', gridRow:'3 / span 1', placeSelf:'end start', padding:'0.5vh',margin:'0.5vh'}}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Schedule</FormLabel>
                    </FormControl>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'20% 40% 40%',gridTemplateRows:'20% 20% 20% 20% 20%',gridColumn:'3 / span 2', gridRow:'4 / span 3', placeSelf:'stretch', padding:'0.0vh',margin:'0.0vh'}}>
                        {Object.entries({'Mon':1,'Tue':2,'Wed':3,'Thu':4,'Fri':5,}).map(([day,row])=>(<>
                            <FormControlLabel
                                control={<Checkbox checked={state[day]?state[day]:false} onChange={handleChange} name={day} />}
                                label={day}
                                style={{gridColumn:'1 / span 1', gridRow:row+' / span 1', placeSelf:'start', padding:'0.0vh',margin:'0.0vh'}}
                            />
                            <TextField
                                name={day+'_start'} type='time' disabled={!state[day]}
                                style={{gridColumn:'2 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_start']?state[day+'_start']:''} onChange={handleChange}
                            />
                            <TextField
                                name={day+'_end'} type='time' disabled={!state[day]}
                                style={{gridColumn:'3 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_end']?state[day+'_end']:''} onChange={handleChange}
                            />
                        </>))}
                    </div>
                    
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={handleClose} color="primary"
                />
                <Button
                    children={'Create'}
                    disabled={!(state.name && state.region && state.programs_teaching.length && ((state.Mon&&state['Mon_start']&&state['Mon_end'])||(state.Tue&&state['Tue_start']&&state['Tue_end'])||(state.Wed&&state['Wed_start']&&state['Wed_end'])||(state.Thu&&state['Thu_start']&&state['Thu_end'])||(state.Fri&&state['Fri_start']&&state['Fri_end'])))} 
                    onClick={handleAdd} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}
export function EditInstructor({
    open, 
    setOpen,
    rows,
    programData,
    editedRow,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 
    const [state, setState] = useState({
        ['name']: '',
        ['gender']: '',
        ['year_of_instruction']: '',
        ['major'] : '',
        ['university'] : '',
        ['region'] : '',
        ['address'] : '',
        ['car'] : false,
        ['returning_instructor'] : false,
        ['shirt_size'] : '',
        ['programs_teaching']: [],
        ['languages_spoken']: [],
        ['city']: '',
        ['phone_number']: '',
    });
    useEffect(()=>{
        if(editedRow){
            state['name'] = editedRow['name'];
            state['gender'] = editedRow['gender'];
            state['year_of_instruction'] = editedRow['year_of_instruction'];
            state['major'] = editedRow['major'];
            state['university'] = editedRow['university'];
            state['region'] = editedRow['region'][0];
            state['address'] = editedRow['address'];
            state['car'] = editedRow['car'];
            state['returning_instructor'] = editedRow['returning_instructor'];
            state['shirt_size'] = editedRow['shirt_size'];
            state['programs_teaching'] = editedRow['programs_teaching'];
            state['languages_spoken'] = editedRow['languages_spoken'];
            state['city'] = editedRow['city'];
            state['phone_number'] = editedRow['phone_number'];
            for(const program in editedRow['programs']){
                state['programs'+program] = editedRow['programs'][program];
            }
            for(const day in editedRow['schedule']){
                state[day.slice(0,3)] = true;
                state[day.slice(0,3) + '_start'] = editedRow['schedule'][day][0]['start'];
                state[day.slice(0,3) + '_end'] = editedRow['schedule'][day][0]['end'];
            }
        setState({...state});
        }
        
    },[editedRow]);
    const handleChange = (event)=>{
        setState({...state, [event.target.name]: event.target.checked?true:event.target.value});
    };
    const handleAdd = () =>{
        state['region'] = [state['region']];
        state['schedule'] = {};
        for(const [key,day] of Object.entries({'Mon':'Monday','Tue':'Tuesday','Wed':'Wednesday','Thu':'Thursday','Fri':'Friday',})){
            if(state[key]){
                state['schedule'][day] = [{}];
                delete state[key];
                if(state[key+'_start']!=undefined){
                    state['schedule'][day][0]['start'] = state[key+'_start'];
                    delete state[key+'_start'];
                }else{
                    state['schedule'][day][0]['start'] = '00:00';
                }
                if(state[key+'_end']!=undefined){
                    state['schedule'][day][0]['end'] = state[key+'_end'];
                    delete state[key+'_end'];
                }else{
                    state['schedule'][day][0]['end'] = '00:00';
                }
            }
        }
        state['programs'] = {};
        for(const program of state['programs_teaching']){
            if(state['programs'+program]!=undefined){
                state['programs'][program] = state['programs'+program];
                delete state['programs'+program];
            }else{
                state['programs'][program] = 0;
            }
        }
        const changed = {[editedRow['id']]:state};
        const changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        editDocuments(currentSeason, 'Instructors', changed, changedRows);
        mutate(['Instructors',currentSeason],changedRows,false);
        console.log(changed);
        handleClose();
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    return (
        <Dialog classes={{paper:classes.dialogPaper}} open={open} onClose={handleClose} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Edit Instructor
            </DialogTitle>
            <DialogContent style={{maxWidth:'700px'}}>
                <DialogContentText>
                    Edit data for instructor: <b>{editedRow?editedRow['name']:null}</b>.
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.name}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'2 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Gender'/>
                          <Select value={state.gender} onChange={handleChange} name="gender">
                              <MenuItem  value='Male'>Male</MenuItem >
                              <MenuItem  value='Female'>Female</MenuItem >
                              <MenuItem  value='Other'>Other</MenuItem >
                          </Select>
                    </FormControl>
                    <TextField
                        label="Major"
                        name="major"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.major}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="University"
                        name="university"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.university}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Year of Instruction"
                        name="year_of_instruction"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.year_of_instruction}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Region"
                        name="region"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.region}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.address}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 2', gridRow:'4 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="City"
                        name="city"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.city}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'5 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.phone_number}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'5 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.car} onChange={handleChange} name="car" />}
                        label="Car"
                        style={{gridColumn:'1 / span 1', gridRow:'6 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.returning_instructor} onChange={handleChange} name="returning_instructor" />}
                        label="Returning"
                        style={{gridColumn:'2 / span 1', gridRow:'6 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <FormControl style={{gridColumn:'3 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}>
                          <InputLabel children='Shirt Size'/>
                          <Select name="shirt_size" value={state.shirt_size} onChange={handleChange}>
                              <MenuItem  value='XL'>XL</MenuItem >
                              <MenuItem  value='L'>L</MenuItem >
                              <MenuItem  value='M'>M</MenuItem >
                              <MenuItem  value='S'>S</MenuItem >
                              <MenuItem  value='XS'>XS</MenuItem >
                          </Select>
                    </FormControl>
                    <FormControl style={{gridColumn:'4 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}>
                          <InputLabel
                              children='Languages' id="ManualAssignemnetProgram"/>
                          <Select name='languages_spoken' value={state.languages_spoken} onChange={handleChange} multiple>
                              {languageList.map(lang => 
                                (<MenuItem  value={lang} key={"langItem"+lang}>{lang}</MenuItem >))}
                          </Select>
                    </FormControl>
                    <FormControl style={{gridColumn:'3 / span 1', gridRow:'2 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Programs'/>
                          <Select name="programs_teaching" value={state.programs_teaching} onChange={handleChange} input={<Input/>} multiple>
                              {Object.keys(programData).map(program => program!='unassigned_instructors'?(<MenuItem  value={program} key={"programs_teaching_"+program}>{program}</MenuItem >):null)}
                          </Select>
                    </FormControl>
                    <div style={{display:'flex', gridColumn:'4 / span 1', gridRow:'2 / span 2', placeSelf:'start stretch', padding:'0.5vh', margin:'0.5vh'}}>                        
                        <FormGroup>
                        <FormLabel component="legend">Program Prefrence</FormLabel>
                        {state.programs_teaching.map((program)=>(
                            <FormControlLabel style={{margin: '0.5vh', padding:'0.5vh'}}
                                control={
                                <Select name={'programs'+program} value={state['programs'+program]?state['programs'+program]:''} onChange={handleChange}>
                                    {[0,1,2,3,4,5,6,7,8,9,10].map(prefInt=><MenuItem  value={prefInt} key={"programs"+program+prefInt}>{prefInt}</MenuItem >)}
                                </Select>}
                                label={program}
                            />
                        ))}
                        </FormGroup>
                    </div>
                    <div style={{gridColumn:'3 / span 1', gridRow:'3 / span 1', placeSelf:'end start', padding:'0.5vh',margin:'0.5vh'}}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Schedule</FormLabel>
                    </FormControl>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'20% 40% 40%',gridTemplateRows:'20% 20% 20% 20% 20%',gridColumn:'3 / span 2', gridRow:'4 / span 3', placeSelf:'stretch', padding:'0.0vh',margin:'0.0vh'}}>
                        {Object.entries({'Mon':1,'Tue':2,'Wed':3,'Thu':4,'Fri':5,}).map(([day,row])=>(<>
                            <FormControlLabel
                                control={<Checkbox checked={state[day]?state[day]:false} onChange={handleChange} name={day} />}
                                label={day}
                                style={{gridColumn:'1 / span 1', gridRow:row+' / span 1', placeSelf:'start', padding:'0.0vh',margin:'0.0vh'}}
                            />
                            <TextField
                                name={day+'_start'} type='time' disabled={!state[day]}
                                style={{gridColumn:'2 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_start']?state[day+'_start']:''} onChange={handleChange}
                            />
                            <TextField
                                name={day+'_end'} type='time' disabled={!state[day]}
                                style={{gridColumn:'3 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_end']?state[day+'_end']:''} onChange={handleChange}
                            />
                        </>))}
                    </div>
                    
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={handleClose} color="primary"
                />
                <Button
                    children={'Edit'}
                    disabled={!(state.name && state.region && state.programs_teaching.length && ((state.Mon&&state['Mon_start']&&state['Mon_end'])||(state.Tue&&state['Tue_start']&&state['Tue_end'])||(state.Wed&&state['Wed_start']&&state['Wed_end'])||(state.Thu&&state['Thu_start']&&state['Thu_end'])||(state.Fri&&state['Fri_start']&&state['Fri_end'])))} 
                    onClick={handleAdd} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}
export function DeleteInstructor({
    open, 
    setOpen,
    rows,
    deletedRow,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 

    const handleAdd = () =>{
        const deleted = [deletedRow['id']]
        deleteDocuments(currentSeason, 'Instructors', deleted);
        const deletedSet = new Set(deleted);
        const changedRows = rows.filter(row => !deletedSet.has(row.id));
        mutate(['Instructors',currentSeason],changedRows,false);
        console.log(deleted);
        handleClose();
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    return (
        <Dialog classes={{paper:classes.dialogDeletePaper}} open={open} onClose={handleClose} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Delete Instructor
            </DialogTitle>
            <DialogContent style={{maxWidth:'700px'}}>
                <DialogContentText>
                    Are you sure you want to delete instructor <b>{deletedRow['name']}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={handleClose} color="primary"
                />
                <Button
                    children={'Delete'}
                    onClick={handleAdd} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}
export function AddSchool({
    open, 
    setOpen,
    rows,
    programData,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 
    
    const [state, setState] = useState({
        ['name']: '',
        ['region'] : '',
        ['address'] : '',
        ['special_language_request'] : [],
        ['program'] : '',
        ['number_of_instructors'] : '',
        // ['location_preferences'] : [],
        ['is_virtual'] : false,
        ['program_time_flexibility']: false,
    });
    const handleChange = (event)=>{
        setState({...state, [event.target.name]: event.target.checked?true:event.target.value});
    };
    const handleAdd = () =>{
        state['region'] = [state['region']];
        state['location_preferences'] = state['region'];
        state['number_of_instructors'] = parseInt(state['number_of_instructors']);
        state['schedule'] = {};
        for(const [key,day] of Object.entries({'Mon':'Monday','Tue':'Tuesday','Wed':'Wednesday','Thu':'Thursday','Fri':'Friday',})){
            if(state[key]){
                state['schedule'][day] = [{}];
                delete state[key];
                if(state[key+'_start']!=undefined){
                    state['schedule'][day][0]['start'] = state[key+'_start'];
                    delete state[key+'_start'];
                }else{
                    state['schedule'][day][0]['start'] = '00:00';
                }
                if(state[key+'_end']!=undefined){
                    state['schedule'][day][0]['end'] = state[key+'_end'];
                    delete state[key+'_end'];
                }else{
                    state['schedule'][day][0]['end'] = '00:00';
                }
            }
        }
        state['programs'] = {};
        state['programs'][state['program']] = {...state['schedule'], ['number_of_instructors']:state['number_of_instructors']};
        delete state['schedule'];
        delete state['number_of_instructors'];
        const added = [state];
        const newIds = addDocuments(currentSeason, 'Schools', added);
        const changedRows = [
            ...rows,
            ...added.map((row, index) => ({
              id: newIds[index],
              ...row,
            })),
          ];
        mutate(['Schools',currentSeason],changedRows,false);
        console.log(added);
        handleClose();
    };
    const handleClose = ()=>{
        setState({
            ['name']: '',
            ['region'] : '',
            ['address'] : '',
            ['special_language_request'] : [],
            ['program'] : '',
            ['number_of_instructors'] : 0,
            // ['location_preferences'] : [],
            ['is_virtual'] : false,
            ['program_time_flexibility']: false,
        });
        setOpen(false);
    };
    return (
        <Dialog classes={{paper:classes.dialogSchoolPaper}} open={open} onClose={handleClose} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Add New School
            </DialogTitle>
            <DialogContent style={{maxWidth:'700px'}}>
                <DialogContentText>
                    Add new school to current season. 
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.name}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Region"
                        name="region"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.region}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.address}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 2', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'1 / span 1', gridRow:'3 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Program'/>
                          <Select name="program" value={state.program} onChange={handleChange} input={<Input/>}>
                              {Object.keys(programData).map(singleProgram => singleProgram!='unassigned_instructors'?(<MenuItem  value={singleProgram} key={"programs_teaching_"+singleProgram+'Inst'}>{singleProgram}</MenuItem >):null)}
                          </Select>
                    </FormControl>
                    <TextField
                        label="No. of Instructors"
                        name="number_of_instructors"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.number_of_instructors}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'1 / span 2', gridRow:'4 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}>
                          <InputLabel
                              children='Special Language Request' id="ManualAssignemnetProgram"/>
                          <Select name='special_language_request' value={state.special_language_request} onChange={handleChange} multiple>
                              {languageList.map(lang => 
                                (<MenuItem  value={lang} key={"langItem"+lang+'addInst'}>{lang}</MenuItem >))}
                          </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox checked={state.is_virtual} onChange={handleChange} name="is_virtual" />}
                        label="Virtual"
                        style={{gridColumn:'1 / span 1', gridRow:'5 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.program_time_flexibility} onChange={handleChange} name="program_time_flexibility" />}
                        label="Flexible Timing"
                        style={{gridColumn:'2 / span 1', gridRow:'5 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <div style={{gridColumn:'3 / span 1', gridRow:'1 / span 1', placeSelf:'end start', padding:'0.5vh',margin:'0.5vh'}}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Schedule</FormLabel>
                    </FormControl>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'20% 40% 40%',gridTemplateRows:'20% 20% 20% 20% 20%',gridColumn:'3 / span 2', gridRow:'2 / span 3', placeSelf:'stretch', padding:'0.0vh',margin:'0.0vh'}}>
                        {Object.entries({'Mon':1,'Tue':2,'Wed':3,'Thu':4,'Fri':5,}).map(([day,row])=>(<>
                            <FormControlLabel
                                control={<Checkbox checked={state[day]?state[day]:false} onChange={handleChange} name={day} />}
                                label={day}
                                style={{gridColumn:'1 / span 1', gridRow:row+' / span 1', placeSelf:'start', padding:'0.0vh',margin:'0.0vh'}}
                            />
                            <TextField
                                name={day+'_start'} type='time' disabled={!state[day]}
                                style={{gridColumn:'2 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_start']?state[day+'_start']:''} onChange={handleChange}
                            />
                            <TextField
                                name={day+'_end'} type='time' disabled={!state[day]}
                                style={{gridColumn:'3 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_end']?state[day+'_end']:''} onChange={handleChange}
                            />
                        </>))}
                    </div>
                    
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={handleClose} color="primary"
                />
                <Button
                    children={'Create'}
                    disabled={!(state.name && state.region && state.program && state.number_of_instructors &&((state.Mon&&state['Mon_start']&&state['Mon_end'])||(state.Tue&&state['Tue_start']&&state['Tue_end'])||(state.Wed&&state['Wed_start']&&state['Wed_end'])||(state.Thu&&state['Thu_start']&&state['Thu_end'])||(state.Fri&&state['Fri_start']&&state['Fri_end'])))} 
                    onClick={handleAdd} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}
export function EditSchool({
    open, 
    setOpen,
    rows,
    programData,
    editedRow,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 
    
    const [state, setState] = useState({
        ['name']: '',
        ['region'] : '',
        ['address'] : '',
        ['special_language_request'] : [],
        ['program'] : '',
        ['number_of_instructors'] : '',
        // ['location_preferences'] : [],
        ['is_virtual'] : false,
        ['program_time_flexibility']: false,
    });
    useEffect(()=>{
        if(editedRow){
            state['name'] = editedRow['name'];
            state['region'] = editedRow['region'][0];
            state['address'] = editedRow['address'];
            state['special_language_request'] = editedRow['special_language_request'];
            state['program'] = Object.keys(editedRow['programs'])[0];
            state['number_of_instructors'] = editedRow['programs'][state['program']]['number_of_instructors'].toString();
            state['is_virtual'] = editedRow['is_virtual'];
            state['program_time_flexibility'] = editedRow['program_time_flexibility'];
            for(const day in editedRow['programs'][state['program']]){
                if(day === 'number_of_instructors'){
                    continue;
                }
                state[day.slice(0,3)] = true;
                state[day.slice(0,3) + '_start'] = editedRow['programs'][state['program']][day][0]['start'];
                state[day.slice(0,3) + '_end'] = editedRow['programs'][state['program']][day][0]['end'];
            }
        setState({...state});
        }
        
    },[editedRow]);
    
    
    const handleChange = (event)=>{
        setState({...state, [event.target.name]: event.target.checked?true:event.target.value});
    };
    const handleAdd = () =>{
        state['region'] = [state['region']];
        state['location_preferences'] = state['region'];
        state['number_of_instructors'] = parseInt(state['number_of_instructors']);
        state['schedule'] = {};
        for(const [key,day] of Object.entries({'Mon':'Monday','Tue':'Tuesday','Wed':'Wednesday','Thu':'Thursday','Fri':'Friday',})){
            if(state[key]){
                state['schedule'][day] = [{}];
                delete state[key];
                if(state[key+'_start']!=undefined){
                    state['schedule'][day][0]['start'] = state[key+'_start'];
                    delete state[key+'_start'];
                }else{
                    state['schedule'][day][0]['start'] = '00:00';
                }
                if(state[key+'_end']!=undefined){
                    state['schedule'][day][0]['end'] = state[key+'_end'];
                    delete state[key+'_end'];
                }else{
                    state['schedule'][day][0]['end'] = '00:00';
                }
            }
        }
        state['programs'] = {};
        state['programs'][state['program']] = {...state['schedule'], ['number_of_instructors']:state['number_of_instructors']};
        delete state['schedule'];
        delete state['number_of_instructors'];
        const changed = {[editedRow['id']]:state};
        const changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        editDocuments(currentSeason, 'Schools', changed, changedRows);
        mutate(['Schools',currentSeason],changedRows,false);
        console.log(changed);
        handleClose();
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    return (
        <Dialog classes={{paper:classes.dialogSchoolPaper}} open={open} onClose={handleClose} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Edit School
            </DialogTitle>
            <DialogContent style={{maxWidth:'700px'}}>
                <DialogContentText>
                Edit data for school: <b>{editedRow?editedRow['name']:null}</b>.
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.name}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Region"
                        name="region"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.region}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.address}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 2', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'1 / span 1', gridRow:'3 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Program'/>
                          <Select name="program" value={state.program} onChange={handleChange} input={<Input/>}>
                              {Object.keys(programData).map(singleProgram => singleProgram!='unassigned_instructors'?(<MenuItem  value={singleProgram} key={"programs_teaching_"+singleProgram+'Inst'}>{singleProgram}</MenuItem >):null)}
                          </Select>
                    </FormControl>
                    <TextField
                        label="No. of Instructors"
                        name="number_of_instructors"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.number_of_instructors}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'1 / span 2', gridRow:'4 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}>
                          <InputLabel
                              children='Special Language Request' id="ManualAssignemnetProgram"/>
                          <Select name='special_language_request' value={state.special_language_request} onChange={handleChange} multiple>
                              {languageList.map(lang => 
                                (<MenuItem  value={lang} key={"langItem"+lang+'addInst'}>{lang}</MenuItem >))}
                          </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox checked={state.is_virtual} onChange={handleChange} name="is_virtual" />}
                        label="Virtual"
                        style={{gridColumn:'1 / span 1', gridRow:'5 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.program_time_flexibility} onChange={handleChange} name="program_time_flexibility" />}
                        label="Flexible Timing"
                        style={{gridColumn:'2 / span 1', gridRow:'5 / span 1', placeSelf:'center start', padding:'0.0vh',margin:'0.0vh'}}
                    />
                    <div style={{gridColumn:'3 / span 1', gridRow:'1 / span 1', placeSelf:'end start', padding:'0.5vh',margin:'0.5vh'}}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Schedule</FormLabel>
                    </FormControl>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'20% 40% 40%',gridTemplateRows:'20% 20% 20% 20% 20%',gridColumn:'3 / span 2', gridRow:'2 / span 3', placeSelf:'stretch', padding:'0.0vh',margin:'0.0vh'}}>
                        {Object.entries({'Mon':1,'Tue':2,'Wed':3,'Thu':4,'Fri':5,}).map(([day,row])=>(<>
                            <FormControlLabel
                                control={<Checkbox checked={state[day]?state[day]:false} onChange={handleChange} name={day} />}
                                label={day}
                                style={{gridColumn:'1 / span 1', gridRow:row+' / span 1', placeSelf:'start', padding:'0.0vh',margin:'0.0vh'}}
                            />
                            <TextField
                                name={day+'_start'} type='time' disabled={!state[day]}
                                style={{gridColumn:'2 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_start']?state[day+'_start']:''} onChange={handleChange}
                            />
                            <TextField
                                name={day+'_end'} type='time' disabled={!state[day]}
                                style={{gridColumn:'3 / span 1', gridRow:row+' / span 1', placeSelf:'start end', padding:'0.0vh',margin:'0.0vh'}} inputProps={{ step: 900,}}  margin="normal" 
                                value={state[day+'_end']?state[day+'_end']:''} onChange={handleChange}
                            />
                        </>))}
                    </div>
                    
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={handleClose} color="primary"
                />
                <Button
                    children={'Edit'}
                    disabled={!(state.name && state.region && state.program && state.number_of_instructors &&((state.Mon&&state['Mon_start']&&state['Mon_end'])||(state.Tue&&state['Tue_start']&&state['Tue_end'])||(state.Wed&&state['Wed_start']&&state['Wed_end'])||(state.Thu&&state['Thu_start']&&state['Thu_end'])||(state.Fri&&state['Fri_start']&&state['Fri_end'])))} 
                    onClick={handleAdd} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}
export function DeleteSchool({
    open, 
    setOpen,
    rows,
    deletedRow,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 

    const handleAdd = () =>{
        const deleted = [deletedRow['id']]
        deleteDocuments(currentSeason, 'Schools', deleted);
        const deletedSet = new Set(deleted);
        const changedRows = rows.filter(row => !deletedSet.has(row.id));
        mutate(['Schools',currentSeason],changedRows,false);
        console.log(deleted);
        handleClose();
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    return (
        <Dialog classes={{paper:classes.dialogDeletePaper}} open={open} onClose={handleClose} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Delete School
            </DialogTitle>
            <DialogContent style={{maxWidth:'700px'}}>
                <DialogContentText>
                    Are you sure you want to delete school <b>{deletedRow['name']}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={handleClose} color="primary"
                />
                <Button
                    children={'Delete'}
                    onClick={handleAdd} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}
const useStyles = makeStyles((theme) => ({
    form: {
      display: 'grid',
      gridTemplateColumns:"25% 25% 25% 25%",
      gridTemplateRows:"20% 20% 20% 20% 20%",
    },
    formControl: {
      minWidth: 120,
      maxWidth: 400,
    },
    dialogPaper: {
        maxWidth: 700,
        maxHeight: 700,
        height: 650,
    },
    dialogSchoolPaper: {
        maxWidth: 700,
        maxHeight: 700,
    },
    dialogDeletePaper: {
        maxWidth: 700,
        maxHeight: 700,
    },
  }));
