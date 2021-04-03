//https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { makeStyles } from '@material-ui/core/styles';

import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';

import DataTypeProviders from './datatypeProviders';

import {instructorColumns, instructorDefaultColumnWidths, instructorDefaultColumnOrder} from './instructorColumns';
import {schoolColumns, schoolDefaultColumnWidths,schoolDefaultColumnOrder} from './schoolColumns';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useAuth } from "../../lib/useAuth.js";

import Loading from '../loading';

import { CSVLink } from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';

import {AddInstructor,EditInstructor,DeleteInstructor, AddSchool,EditSchool,DeleteSchool} from './popUpEditor';

import {
  EditingState,

  SortingState,
  IntegratedSorting,

  PagingState,
  IntegratedPaging,

  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,

  ColumnChooser,
  TableColumnVisibility,
  Toolbar,

  VirtualTable,

  TableColumnResizing,

  DragDropProvider,
  TableColumnReordering,

  PagingPanel,

  TableFilterRow, 
} from '@devexpress/dx-react-grid-material-ui';


const instructorExportColumns = [
  { key: 'name', label: 'Name'},
  { key: 'gender', label: 'Gender'},
  { key: 'schoolYear', label: 'School Year'},
  { key: 'major', label: 'Major'},
  { key: 'university', label: 'University'},
  { key: 'region', label: 'Region'},
  { key: 'startingLocation', label: 'Address'},
  { key: 'car', label: 'Car 🚗', description:'Weather they have a car or not'},
  { key: 'returner', label: 'Returning'},
  { key: 'shirtSize', label: 'Shirt Size 👕'},
  { key: 'programs', label: 'Programs'},
  { key: 'languages', label: 'Languages'},
];

export default function Table({
  table_type, 
  rows, error,
  programData, programError,
}){
  console.log("2. "+table_type+" Component");
  const classes = useStyles();
  const auth = useAuth();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(false);
  const [deletedRow, setDeletedRow] = useState(false);

  const [columns] = useState((table_type === 'Instructors' )? instructorColumns : schoolColumns);
  const [BooleanColumns] = useState((table_type === 'Instructors' )? ['car','returning_instructor'] : ['program_time_flexibility','is_virtual']);
  const [ShirtColumns] = useState((table_type === 'Instructors' )? ['shirt_size'] : []);
  const [InstProgramColumns] = useState((table_type === 'Instructors' )?['programs']:[]);
  const [SchoolProgramColumns] = useState((table_type === 'Instructors' )?['programs_teaching']:['programs']);
  const [ScheduleColumns] = useState(['schedule']);
  const [ListColumns] = useState((table_type === 'Instructors' )?['languages_spoken','region']:['location_preferences','region','special_language_request']);
  const [defaultColumnWidths] = useState((table_type === 'Instructors' )? instructorDefaultColumnWidths : schoolDefaultColumnWidths);
  const [defaultColumnOrder] = useState((table_type === 'Instructors' )? instructorDefaultColumnOrder : schoolDefaultColumnOrder);
  const [defaultHiddenColumnNames] = useState((table_type === 'Instructors' )?['programs_teaching']:[]);
  const [tableColumnExtensions] = useState((table_type === 'Instructors' )?
  [
    { columnName: 'programs', wordWrapEnabled: true },
    { columnName: 'schedule', wordWrapEnabled: true },
    { columnName: 'languages_spoken', wordWrapEnabled: true },
  ]:
  [
    { columnName: 'schedule', wordWrapEnabled: true },
    { columnName: 'special_language_request', wordWrapEnabled: true },
    { columnName: 'number_of_instructors', align: 'center'},
  ]);

  const [pageSizes] = useState([5, 10, 25, 50, 0]);
  const [filterToggle, setFilterToggle] = useState(0);
  const [dense, setDense] = useState(false);
  
  const InstructorProgramFormatter = ({row:{id}, value}) => {
    if(!value || !Object.keys(value).length){
      return <></>;
    }
    const programs = [];
    for (const [program, pref] of Object.entries(value)){
      const colorObj = programData[program]['color'];
      const chipColor = rgbaToStr(colorObj);
        programs.push(<Chip 
          label={program+': '+pref.toString()}
          key={String(id)+'InstProgramChip'+program}
          style={{backgroundColor:chipColor,  color:'white',fontWeight:'600'}}
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
      const chipColor = rgbaToStr(colorObj);
        programs.push(<Chip 
          label={program}
          key={String(id)+'SchoolProgramChip'+program}
          className={classes.chip}
          style={{backgroundColor:chipColor, color:'white',fontWeight:'600'}}
        />);
    }
    return (<>{programs}</>);
  };
  const SchoolProgramTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={SchoolProgramFormatter}
            {...props}
        />
    );
  };
  const Root = props => <Grid.Root {...props} style={{ display: 'flex', height: '100%' , width: '100%'}} />;
  const ToolbarRoot = ({children, ...restProps}) => (
    <Toolbar.Root {...restProps} style={{minHeight:dense?"0px":null}}>
      <div style={{display: 'flex', justifyContent: 'space-between', width:'100%'}}>
      <div style={{display: 'flex'}}>
      <CSVLink data={rows} headers={instructorExportColumns}>
      <Tooltip title="Export to CSV">
        <IconButton >
          <GetAppIcon/>
        </IconButton>
      </Tooltip>
      
      </CSVLink>
      </div>
      <div style={{display: 'flex'}}>
      {children}
      <Tooltip title={"Filter "+filterToggle+"/2"}>
      <IconButton onClick={() => setFilterToggle((filterToggle+1)%3)}>
        <FilterListIcon />
      </IconButton>
      </Tooltip>
      </div>
      </div>
    </Toolbar.Root>
  );
  const TableEditColumnHeaderCell = ({children, ...restProps}) => (
    <TableEditColumn.HeaderCell 
      {...restProps}
      style={{padding:'0px 1.5vw'}}
    >
      <Tooltip title="New" placement="top">
      <IconButton style={{padding:'1vh'}} onClick={()=>setAddOpen(true)}>
        <AddIcon 
          classes={{fontSizeLarge: classes.addIcon, fontSizeInherit:classes.addIconSmall}}
          color='primary' 
          fontSize={dense?'inherit':'large'}
        />
      </IconButton>
      </Tooltip>
    </TableEditColumn.HeaderCell>
  );
  const TableEditColumnCell = ({tableRow, children, ...restProps}) =>(
    <TableEditColumn.Cell 
      {...restProps}
      style={{padding:'0', textAlign:'center'}}
    >
      <Tooltip title="Delete">
        <IconButton style={{padding:dense?'11px':'14px'}} onClick={()=>{
          setDeletedRow(()=>tableRow.row); 
          setDeleteOpen(()=>true);
        }}>
          <DeleteIcon 
            color='primary' 
            fontSize={dense?'medium':'large'}
            classes={{fontSizeLarge: classes.fontSizeLarge}}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton style={{padding:dense?'11px':'14px'}} onClick={()=>{
          setEditedRow(()=>tableRow.row); 
          setEditOpen(()=>true);
        }}>
          <EditIcon 
            color='primary' 
            fontSize={dense?'medium':'large'}
            classes={{fontSizeLarge: classes.fontSizeLarge}}
          />
        </IconButton>
      </Tooltip>
    </TableEditColumn.Cell>
  );
  const TableEditCommand = ({...restProps}) => {
    return null;
  };
  const TableRow = ({ ...restProps}) => (
    <VirtualTable.Row
      {...restProps}
    />
  );
  const TableHeaderCell = ({...restProps}) => (
    <TableHeaderRow.Cell
      {...restProps}
      style={{textAlign:'center', padding:dense?'1vh':null}}
    />
  );
  const TableCell = ({...restProps}) => (
    <VirtualTable.Cell
      {...restProps}
      style={{padding:dense?'0.25vh':null}}
    />
  );
  const PagingPanelContainer = ({ ...restProps})=>(<>
    <div style={{display:'grid', gridTemplateColumns:'30% auto'}}>
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
    <PagingPanel.Container 
      {...restProps}
      style={{gridColumn:'2 / span 1', justifySelf:'end', padding:dense?'0px':null}}
    />
    </div>
  </>);
  

  if(auth.currentSeason === ''){
    return(<h1>Season not selected.</h1>);
  }else if((!rows && !error)||(!programData && !programError)){
    return (<Loading />);
  }else if(error || programError){
    console.log("Error::useData(table_type,auth.)::Error", error);
    return (<h1>ERROR. Check console logs</h1>);
  }

  return (<>
    {table_type==='Instructors'?(<>
    <AddInstructor 
      open={addOpen} 
      setOpen={setAddOpen} 
      rows={rows}
      programData={programData}
    />
    <EditInstructor 
      open={editOpen} 
      setOpen={setEditOpen} 
      rows={rows}
      editedRow={editedRow}
      programData={programData}
    />
    <DeleteInstructor 
      open={deleteOpen} 
      setOpen={setDeleteOpen} 
      rows={rows}
      deletedRow={deletedRow}
    />
    </>):(<>
    <AddSchool
      open={addOpen} 
      setOpen={setAddOpen} 
      rows={rows}
      programData={programData}
    />
    <EditSchool 
      open={editOpen} 
      setOpen={setEditOpen} 
      rows={rows}
      editedRow={editedRow}
      programData={programData}
    />
    <DeleteSchool
      open={deleteOpen} 
      setOpen={setDeleteOpen} 
      rows={rows}
      deletedRow={deletedRow}
    />
    </>)}    
    <Paper elevation={3} style={{borderRadius: '1.3vh', display: 'flex',margin: '2vh 2vh 2vh 2vh', height: '96%', height: '-webkit-calc(96% - 64px)', height: '-moz-calc(96% - 64px)',height: 'calc(96% - 64px)',}}>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rootComponent={Root}
      >
        
        <SortingState defaultSorting={[]}/>
        <IntegratedSorting />
        
        <DataTypeProviders 
          BooleanColumns={BooleanColumns} 
          ShirtColumns={ShirtColumns} 
          ScheduleColumns={ScheduleColumns}
          ListColumns={ListColumns}
        />
        <InstProgramTypeProvider for={InstProgramColumns} />
        <SchoolProgramTypeProvider for={SchoolProgramColumns} />
        
        {filterToggle == 1 ? <FilteringState defaultFilters={[]} /> :
         filterToggle == 2 ? <FilteringState defaultFilters={[]} />: 
         null}
        <IntegratedFiltering />
        
        <PagingState defaultCurrentPage={0} defaultPageSize={25}/>
        <IntegratedPaging />
        <EditingState
          defaultEditingRowIds={[]}
        />
        
        <DragDropProvider />
        <VirtualTable 
          height='100%'
          width='100%'
          columnExtensions={tableColumnExtensions}
          rowComponent={TableRow}
          cellComponent={TableCell}
        />
        
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableColumnReordering
          defaultOrder={defaultColumnOrder}
        />
        <TableHeaderRow 
          showSortingControls
          cellComponent={TableHeaderCell} 
        />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <PagingPanel
          pageSizes={pageSizes}
          containerComponent={PagingPanelContainer}
          
        />
        <Toolbar rootComponent={ToolbarRoot}/>
        <ColumnChooser messages={{showColumnChooser:"Hide Columns"}}/>
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
          width={dense?'120':'130'}
          commandComponent = {TableEditCommand}
          cellComponent = {TableEditColumnCell}
          headerCellComponent = {TableEditColumnHeaderCell}
        />
        {filterToggle == 1 ? <TableFilterRow/> :
         filterToggle == 2 ? <TableFilterRow showFilterSelector/> : 
         null}
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
  fontSizeLarge:{
    fontWeight: 500,
    fontSize: '1.8rem',
    margin:'0px',
  },
  addIcon:{
    fontWeight: 600,
    fontSize: '2.3rem',
  },
  addIconSmall:{
    fontWeight: 500,
    fontSize: '1.8rem',
  }
}));
function rgbaToStr(colorObj){
  return 'rgba('+
    colorObj['r'].toString()+','+
    colorObj['g'].toString()+','+
    colorObj['b'].toString()+','+
    colorObj['a'].toString()+
    ')';
}
