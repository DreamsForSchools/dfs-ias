import {useState} from 'react'
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';

import AddProgram from './addProgram';
import DeleteProgram from './deleteProgram';
import EditProgram from './editProgram';

export default function ProgramCards({
        programData, 
        handleProgramChange,
    }){
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [oldProgramName, setOldProgramName] = useState('');
    const [oldProgramColor, setOldProgramColor] = useState({});
    
    const EditHandler = (name, color) => {
        setOldProgramName(name);
        setOldProgramColor(color);
    };
    const DeleteHandler = (name) => {
        setOldProgramName(name);
        setDeleteOpen(true);
    };

    return(<>
        <AddProgram open={addOpen} setOpen={setAddOpen} programData={programData}/>
        <EditProgram open={editOpen} setOpen={setEditOpen} programData={programData} 
            oldProgramName={oldProgramName} oldProgramColor={oldProgramColor}
            handleProgramChange={handleProgramChange}/>
        <DeleteProgram open={deleteOpen} setOpen={setDeleteOpen} programData={programData} 
            oldProgramName={oldProgramName} 
            handleProgramChange={handleProgramChange}/>
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            // spacing={2}
        >
            {Object.keys(programData).map(
                (program) =>
                    program!='unassigned_instructors'?
                        <TemplateProgramCard 
                            singleProgramData={programData[program]} 
                            EditHandler={EditHandler}
                            DeleteHandler={DeleteHandler} 
                            key={program+'TemplateProgramCard'}
                        />:null
            )}
            <Grid item style={{marginBottom:'15px', marginTop: '5px'}}>
                <Card elevation={3} style={{ borderRadius:'30px', display:'flex', width:'300px', height:'420px', alignItems:'center', textAlign:'center'}}>
                    <CardActionArea onClick={()=>setAddOpen(true)} style={{height:'100%'}}>
                        <AddCircleIcon color='action' style={{height:'35%',width:'35%'}}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Add New Program
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    </>);
};
function TemplateProgramCard({
    singleProgramData,
    EditHandler, 
    DeleteHandler,
}){
    const programName = singleProgramData['name'];
    const colorObj = singleProgramData['color'];
    const programColor = rgbaToStr(colorObj);
    const programLogo = singleProgramData['logo'];
    
    const totalInstructorsNeeded = singleProgramData['needed_instructors'];
    const numAssignedSchools = singleProgramData['assigned_schools']===0?0:Object.keys(singleProgramData['assigned_schools']).length;
    const assignedinstructors = singleProgramData['assigned_schools']===0?0:singleProgramData['assigned_instructors'];
    const error = (assignedinstructors < totalInstructorsNeeded);

    return(
        <Grid key={programName+'_Grid'} item style={{marginBottom:'15px', marginTop: '5px'}}>
            <Card key={programName+'_Card'} elevation={3} style={{display:'flex',flexDirection:'column', borderStyle:'solid', borderWidth:'3px',borderColor:programColor,borderRadius:'30px', width:'300px', height:'420px'}}>
                <CardActionArea key={programName+'_CardArea'}>
                <CardMedia
                    key={programName+'CardMedia'}
                    component='img'
                    height='250px'
                    src={programLogo}
                    alt={programName}
                    title={programName}
                />
                <CardContent style={{color:programColor,borderStyle:'solid', borderWidth:'3px 0px 0px 0px',borderColor:programColor,}} key={programName+'CardContent'}>
                <Typography gutterBottom variant="h5" component="h2" key={programName+'Typography1'}>
                    {programName}
                </Typography>
                <Typography variant="body2" color="textSecondary" key={programName+'Typography2'}>
                    <font color={error?'#f75c5c':null}>
                    Assigned Instructors: 
                        <b  key={programName+'B1'}>
                            {' '+assignedinstructors}
                        </b> 
                        / 
                        <b  key={programName+'B2'}>
                            {totalInstructorsNeeded}
                        </b><br  key={programName+'Br1'}/>
                    </font>
                    Assigned Schools: 
                        <b key={programName+'B3'}>
                            {' '+numAssignedSchools}
                        </b>
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions style={{flexGrow:1, display:'flex', alignItems:"flex-end", justifyContent:"flex-end"}} key={programName+'CardActions'}>
                    <Button onClick={()=>{EditHandler(programName,colorObj)}} size="small" color="primary" style={{display:'flex', alignItems:"flex-end", justify:"flex-end"}} key={programName+'Button1'}>
                        Edit
                    </Button>
                    <Button onClick={()=>{DeleteHandler(programName)}} size="small" color="primary" style={{display:'flex', alignItems:"flex-end", justify:"flex-end"}} key={programName+'Button2'}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
function rgbaToStr(colorObj){
    return 'rgba('+colorObj['r'].toString()+','+
          colorObj['g'].toString()+','+
          colorObj['b'].toString()+','+
          colorObj['a'].toString()+')';
}
