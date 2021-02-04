//https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { makeStyles } from '@material-ui/core/styles';

import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';

import Checkbox from '@material-ui/core/Checkbox';
import DataTypeProviders, {ScheduleFormatter} from '../table/datatypeProviders';

import EditAssignment from './editAssignment';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from '@material-ui/core/Typography';

import { useAuth } from "../../lib/useAuth.js";

import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import {
  FilteringState,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
  TableFilterRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';

export default function TableView({
  rows, setRows,
  programData,
  instructorDict,
  schoolDict,
}){
  console.log('2.1 TableView Component');
  const programColumns = [
    { name: 'lock', title: ''},
    { name: 'name', title: 'Name', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['name']:''
    }},
    { name: 'schedule', title: 'Available Schedule', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['schedule']:{}
    }},
    { name: 'car', title: 'Car', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['schedule']:false
    }},
    { name: 'region', title: 'Region', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['region']:false
    }},
    { name: 'programs', title: 'Program Pref.', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['programs']:{}
    }},
    { name: 'returning', title: 'Returning', getCellValue: row=>{
      return instructorDict[row.instructor]? instructorDict[row.instructor]['returning_instructor']:false
    }},
    { name: 'school', title: 'School'},
    { name: 'program', title: 'Program'},

  ];
  const programColumnExtensions = [
    { columnName: 'name', width: 165},
    { columnName: 'lock', wordWrapEnabled: true, width: 120},
    { columnName: 'schedule', wordWrapEnabled: true, width: 290},
    { columnName: 'car', wordWrapEnabled: true, width: 65, align: 'center'},
    { columnName: 'returning', wordWrapEnabled: true, width: 100, align: 'center'},
    { columnName: 'programs', wordWrapEnabled: true, width: 250},
    { columnName: 'region', width: 120}
  ];
  const classes = useStyles();
  const auth = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(0);

  const [columns] = useState(programColumns);
  const [BooleanColumns] = useState(['car','returning']);
  const [InstProgramColumns] = useState(['programs']);
  const [ScheduleColumns] = useState(['schedule']);
  const [ListColumns] = useState(['region']);
  const [tableColumnExtensions] = useState(programColumnExtensions);

  const [filterToggle, setFilterToggle] = useState(0);
  const [dense, setDense] = useState(false);
  const [lockDict, setLockDict] = useState({});
  

  const lockProgram = (lock, program) =>{
    for(const row of rows){
      if (row['program'] === program){
        row['lock'] = lock;
      }
    }
    setRows([...rows]);
    setLockDict({...lockDict, [program]:lock});
  };
  const InstructorProgramFormatter = ({row:{id}, value}) => {
    if(!value || !Object.keys(value).length){
      return <></>;
    }
    const programs = [];
    for (const [program, pref] of Object.entries(value)){
      const colorObj = programData[program]['color'];
      programs.push(<Chip 
        label={program+': '+pref.toString()}
        key={String(id)+'InstProgramChip'+program}
        style={{backgroundColor:rgbaToStr(colorObj),  color:'white',fontWeight:'600'}}
        className={classes.chip}
      />);
    }
    return (<>{programs}</>);
  };
  const InstProgramTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={InstructorProgramFormatter}
            {...props}
        />
    );
  };
  const SchoolProgramFormatter = ({row:{id}, value}) => {
    if(!value || !value.length){
      return <></>;
    }
    const programs = [];
    for (const program of value){
      const colorObj = programData[program]['color'];
      programs.push(<Chip 
        label={program}
        key={String(id)+'SchoolProgramChip'+program}
        className={classes.chip}
        style={{backgroundColor:rgbaToStr(colorObj), color:'white',fontWeight:'600'}}
      />);
    }
    return (<>{programs}</>);
  };
  const Root = props => <Grid.Root {...props} style={{ display: 'flex', height: '100%' , width: '100%'}} />;
  const ToolbarRoot = ({children, ...restProps}) => (
    <Toolbar.Root {...restProps} style={{minHeight:dense?"0px":null}}>
      <div style={{display: 'flex', justifyContent: 'space-between', width:'100%'}}>
        <div style={{display: 'flex'}}>
          <Tooltip title="Save PDF">
            <IconButton >
              <GetAppIcon/>
            </IconButton>
          </Tooltip>
        </div>
        <div style={{display: 'flex'}}>
          <FormControlLabel
            component='div'
            control={
              <Switch 
                color='primary'
                checked={dense}
                onChange={()=>setDense(!dense)}
                name="DenseSwitch"
                size='small'
              />
            }
            label="Dense Padding"
            classes={{label:classes.label}}
            style={{ 
              gridColumn:'1 / span 1', justifySelf:'start', alignSelf:'center',
              margin:'1vh 1vw',
            }}
          />
          <Tooltip title={"Filter "+filterToggle+"/2"}>
            <IconButton onClick={() => setFilterToggle((filterToggle+1)%3)}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Toolbar.Root>
  );
  const TableCell = ({children, ...restProps}) => {
    const [value, setValue] = useState(restProps.value);
    return(
    <VirtualTable.Cell
      {...restProps}
      style={{padding:dense?'0.25vh':null, textAlign:restProps.column.name === 'editing'?'center':null}}
    >
      {restProps.column.name === 'lock'?<>
        <Tooltip title="Edit">
          <IconButton style={{textAlign:'center',alignSelf:'center',padding:dense?'11px':'14px'}} onClick={()=>{
            setEditedRow(()=>restProps.row['id']); 
            setEditOpen(()=>true);
          }}>
            <EditIcon 
              color='primary' 
              fontSize={dense?'small':'default'}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lock">    
          <Checkbox
            style={{textAlign:'center',alignSelf:'center',padding:dense?'11px':'14px'}}
            icon={<LockOpenIcon fontSize={dense?'small':'default'}  color='disabled'/>}
            checkedIcon={<LockIcon fontSize={dense?'small':'default'} color='primary' />}
            checked={value}
            onChange={()=>{
              rows[restProps.row['id']]['lock'] = !value; 
              setRows(()=>rows);
              setValue(!value)
            }}
          />
        </Tooltip>
        </>
      :
        children
      }
    </VirtualTable.Cell>
  );};
  const TableHeaderCell = ({children, ...restProps}) => (
    <TableHeaderRow.Cell
      {...restProps}
      style={{textAlign:'center',alignSelf:'center', padding:dense?'1vh':null}}
    >
      {
      restProps.column.name === 'lock'?
        <Typography color='primary' variant='button' style={{textAlign:'center', padding:dense?'1vh':null}}>
          Manual Assignment
        </Typography>
      :
        <div style={{display:'block'}}>{restProps.column.title}</div>
      }
    </TableHeaderRow.Cell>
  );
  const GroupCellCentent = ({column, row}) => {
    const [value, setValue] = useState(lockDict[row.value]?true:false);
    if (column.name === 'program'){
      if(row.value === 'Unassigned'){
        return (<>
          <Chip label={row.value} style={{backgroundColor:'rgba(100,100,100,100)', color:'white',fontWeight:'600'}}/>
          <Tooltip title={value?"Unlock All":"Lock All"}>    
            <Checkbox
              style={{textAlign:'center',alignSelf:'center',padding:dense?'11px':'14px'}}
              icon={<LockOpenIcon fontSize={dense?'small':'default'}  color='disabled'/>}
              checkedIcon={<LockIcon fontSize={dense?'small':'default'} color='primary' />}
              checked={value}
              onChange={()=>{
                lockProgram(!value, row.value); 
                setValue(!value)
              }}
            />
          </Tooltip>
          <b>{programData['unassigned_instructors']}</b>
        </>);
      }
      const totalInstructorsNeeded = programData[row.value]['needed_instructors'];
      const assignedinstructors =  programData[row.value]['assigned_schools']===0?0: programData[row.value]['assigned_instructors'];
      const error = (assignedinstructors < totalInstructorsNeeded);
      return (<>
        {SchoolProgramFormatter({row: {id: column.name}, value:[row.value]})}
        <Tooltip title={value?"Unlock All":"Lock All"}>    
          <Checkbox
            style={{textAlign:'center',alignSelf:'center',padding:dense?'11px':'14px'}}
            icon={<LockOpenIcon fontSize={dense?'small':'default'}  color='disabled'/>}
            checkedIcon={<LockIcon fontSize={dense?'small':'default'} color='primary' />}
            checked={value}
            onChange={()=>{
              lockProgram(!value, row.value); 
              setValue(!value)
            }}
          />
        </Tooltip>
        <font color={error?'#f75c5c':null}>
            (<b>{assignedinstructors}</b> 
            / 
            <b>{totalInstructorsNeeded}</b>)
        </font>
        </>);
    }else{
      if(row.value === 'Unassigned'){
        return <Chip label={row.value} style={{backgroundColor:'rgba(100,100,100,100)', color:'white',fontWeight:'600'}}/>
      }
      const program = Object.keys(schoolDict[row.value]['programs'])[0];
      const schedule = schoolDict[row.value]['programs'][program];
      var assignedInstructors = 0;
      for(const assignment of rows){
        if(assignment['school'] === row.value){
          assignedInstructors++;
        }
      }
      const totalInstructors = schoolDict[row.value]['programs'][program]['number_of_instructors'];
      const error = assignedInstructors<totalInstructors;
      return (<span>
          {schoolDict[row.value]['name']}
          <font color={error?'#f44336':null} style={{margin:'0px 0.25vw'}}>
            (<b>{assignedInstructors}</b>/<b>{totalInstructors}</b>)
          </font>
          <Chip label={schoolDict[row.value]['is_virtual']?'Virtual':'In-Person'}
            style={{backgroundColor:schoolDict[row.value]['is_virtual']?'#DBDAEB':'#D7F4F4', margin: '0px 0.25vw'}}
          />
          {ScheduleFormatter({row:{id: row.value},value: schedule})}
          <Chip label={schoolDict[row.value]['region'][0]} style={{margin: '0px 0.25vw'}}/>
      </span>);
    }
  };

  if(auth.currentSeason === ''){
    return(<h1>Season not selected.</h1>);
  }
  return (<>
    <EditAssignment
      open={editOpen} 
      setOpen={setEditOpen} 
      editedRow={editedRow}
      programData={programData}
      rows={rows}
      setRows={setRows}
      instructorDict={instructorDict}
      schoolDict={schoolDict}
    />
    <Paper elevation={3} style={{borderRadius: '1.3vh', display: 'flex',margin: '2vh 2vh 2vh 2vh', height: '94%', height: '-webkit-calc(94% - 70px)', height: '-moz-calc(94% - 70px)',height: 'calc(94% - 70px)',}}>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rootComponent={Root}
      >
        <DataTypeProviders 
          BooleanColumns={BooleanColumns} 
          ShirtColumns={[]} 
          ScheduleColumns={ScheduleColumns}
          ListColumns={ListColumns}
        />
        <InstProgramTypeProvider for={InstProgramColumns} />
        
        {filterToggle == 1 ? <FilteringState defaultFilters={[]} /> :
         filterToggle == 2 ? <FilteringState defaultFilters={[]} />: 
         null}
         {filterToggle == 1 ? <IntegratedFiltering /> :
         filterToggle == 2 ? <IntegratedFiltering />: 
         null}
        
        <GroupingState
          grouping={[{ columnName: 'program' }, { columnName: 'school'}]}
        />
        <IntegratedGrouping />

        <VirtualTable 
          height='100%'
          width='100%'
          columnExtensions={tableColumnExtensions}
          cellComponent={TableCell}
        />
        <TableHeaderRow 
          cellComponent={TableHeaderCell} 
        />
        <Toolbar rootComponent={ToolbarRoot}/>

        {filterToggle == 1 ? <TableFilterRow/> :
         filterToggle == 2 ? <TableFilterRow showFilterSelector/> : 
         null}
        <TableGroupRow 
          contentComponent={GroupCellCentent}
        />
      </Grid>
    </Paper>
  </>);
};
const useStyles = makeStyles((theme) => ({
  chip:{
    margin: '1.5px',
  },
  label:{
    fontSize: '0.875rem',
  },
}));
function rgbaToStr(colorObj){
  return 'rgba('+colorObj['r'].toString()+','+
        colorObj['g'].toString()+','+
        colorObj['b'].toString()+','+
        colorObj['a'].toString()+')';
}