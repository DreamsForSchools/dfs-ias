import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';


import { useAuth } from "../../lib/useAuth.js";
import { mutate } from 'swr';

import { SketchPicker  } from 'react-color'
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/storage';


export default function EditProgram({   
        open, setOpen, 
        programData, handleProgramChange, 
        oldProgramName, oldProgramColor,
    }){
    const classes = useStyles();
    const {currentSeason} = useAuth(); 
    const [newProgramName, setNewProgramName] = useState(oldProgramName);
    const [newProgramColor, setNewProgramColor] = useState(oldProgramColor);
    const [programLogo, setProgramLogo] = useState('');
    const [error, setError] = useState('');
    const [imgError, setImgError] = useState('');

    useEffect(()=>{
        setNewProgramName(oldProgramName);
        setNewProgramColor(oldProgramColor);
    },[oldProgramName, oldProgramColor]);
    const handleEdit = async () =>{
        const oldLogoFile = firebase.storage().ref(currentSeason+'/'+oldProgramName+'.png');
        const newLogoFile = firebase.storage().ref(currentSeason+'/'+newProgramName+'.png');
        const oldDataFile = firebase.database().ref(currentSeason+'/Programs/'+oldProgramName);
        const newDataFile = firebase.database().ref(currentSeason+'/Programs/'+newProgramName);
        const oldDataFile2 = firebase.database().ref(currentSeason+'/programs/'+oldProgramName);
        const newDataFile2 = firebase.database().ref(currentSeason+'/programs/'+newProgramName);
        
        const oldLogoURL = programData[oldProgramName]['logo'];
        const newBlobFile = 
            programLogo===''? 
                await fetch(oldLogoURL)
                    .then(res=>res.arrayBuffer())
                    .then(blobFile => 
                        new File(
                            [blobFile],
                            newProgramName+'.png',
                            {type:"image/png"}))
                        : programLogo ;
        await oldLogoFile.delete().catch((e)=>console.log(e));
        await newLogoFile.put(newBlobFile,{contentType:'image/png'});
        const newLogoURL = await newLogoFile.getDownloadURL();


        const newProgram = programData[oldProgramName];
        newProgram['name'] = newProgramName;
        newProgram['color'] = newProgramColor;
        newProgram['logo'] = newLogoURL;
        await oldDataFile.remove();
        await newDataFile.set(newProgram);
        await oldDataFile2.remove();
        await newDataFile2.set({'name': newProgramName});
        
        delete programData[oldProgramName];
        programData[newProgramName] = newProgram;
        mutate(['Programs',currentSeason],programData,false);
        
        handleProgramChange({
                oldProgramName: oldProgramName,
                newProgramName: newProgramName,  
                deleting: false, 
            });

        setProgramLogo('');
        setError('');
        setImgError('');
        setOpen(false);
        return null;
    };
    const handleFileChange = (file)=>{
        
        if(file.type!=='image/png'){
            setProgramLogo('');
            setImgError('Invaild File type. Please upload .png file.');
        }else{
            setProgramLogo(file);
            setImgError('');
        }

    };
    const handleTextChange = (value)=>{
        setNewProgramName(value);
        if( programData.hasOwnProperty(value) && value != oldProgramName){
            setError('Program name already exists.');
        }else{
            setError('');
        }
    };
    return (
        <Dialog style={{height:'100%'}} open={open} onClose={()=>setOpen(false)} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Edit Program
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the name, theme color or logo of the program for the current Season.
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="New Program" id="New-Program-Name"
                        className={classes.formControl} variant="outlined" margin="normal" fullWidth autoFocus
                        value={newProgramName}
                        onChange={(event)=>handleTextChange(event.target.value)}
                        error={error?true:false}
                        helperText={error}
                    />
                    
                    <SketchPicker  
                        className={classes.formControlLabel} 
                        color={newProgramColor} 
                        onChangeComplete={(color)=>{setNewProgramColor(color.rgb)}}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            children={'Select Logo'} id="logo upload program"/>
                        <Input error={imgError?true:false} id="file input" type='file' onChange={(event)=>handleFileChange(event.target.files[0])}/>
                        <FormHelperText id="my-helper-text">{imgError}</FormHelperText>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={()=>setOpen(false)} color="primary"
                />
                <Button
                    children={'Edit'}
                    disabled={(error?true:false) || (newProgramName==='') || (imgError?true:false)} 
                    onClick={()=>handleEdit()} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
      maxWidth: 225,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
}));
