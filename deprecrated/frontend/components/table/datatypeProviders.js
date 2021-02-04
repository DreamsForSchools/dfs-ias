import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Plugin} from '@devexpress/dx-react-core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { ScheduleOutlined } from '@material-ui/icons';




const ShirtFormatter = ({ value }) => 
    <Chip 
        label={value} 
    />;
const BooleanFormatter = ({ value }) => 
    <Chip 
        label={value ? 'Yes' : 'No'} 
        style={{
            backgroundColor:value?'#F9DEA6':null
        }} 
    />;
const ListFormatter = ({row:{id}, value}) => {
    if(!value || !value.length){
        return <></>;
    }
    return (<>{value.map( item => 
        <Chip 
          label={item}
          key={String(id)+'ListItem'+item}
          style={{margin:'1.5px'}}
        />
    )}</>);
};

function ShirtEditor({ value, onValueChange }){
    return (
        <Select
            input={<Input />}
            value={value}
            onChange={event => onValueChange(event.target.value)}
            style={{ width: '100%' }}
        >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
        </Select>
    );
};
function BooleanEditor({ value, onValueChange }){
    return (
        <Select
            input={<Input />}
            value={value ? 'Yes' : 'No'}
            onChange={event => onValueChange(event.target.value === 'Yes')}
            style={{ width: '100%' }}
        >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
        </Select>
    );
};




function BooleanTypeProvider(props){
    return (
        <DataTypeProvider
            formatterComponent={BooleanFormatter}
            editorComponent={BooleanEditor}
            {...props}
        />
    );
};
function ShirtTypeProvider(props){
    return (
        <DataTypeProvider
            formatterComponent={ShirtFormatter}
            editorComponent={ShirtEditor}
            {...props}
        />
    );
};
const  ListTypeProvider = (props) => {
    return (
        <DataTypeProvider
            formatterComponent={ListFormatter}
            {...props}
        />
    );
};

const scheduleVal = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4,
};
const scheduleText = {
    'Monday': 'M',
    'Tuesday': 'Tu',
    'Wednesday': 'W',
    'Thursday': 'Th',
    'Friday': 'F',
};
const dayVal = (day)=> {
    if(day[0]==='M'){
        return 0;
    }else if(day === 'Tu'){
        return 1;
    }else if(day[0] === 'W'){
        return 2;
    }else if(day === 'Th'){
        return 3;
    }else if(day[0] === 'F'){
        return 4;
    }
};
const numList = [1,2,3,4,5];
const dayColor = numList.map((item) => 'hsl(41,81%,'+String(63*(1+(item-3)*0.175))+'%)');



export const ScheduleFormatter = ({row: {id}, value}) => {
    if(!value || !Object.keys(value).length){
        return <></>;
    }
    const schedule = [];
    for (const day in  value){
        if (!(day in scheduleVal)){
            continue;
        }
        for(const timeSlot of value[day]){
            const chipText = scheduleText[day]+' '+timeSlot['start']+'-'+timeSlot['end'];
            schedule.push([chipText, dayColor[scheduleVal[day]]]);
        }
    }
    
    schedule.sort((a,b)=>dayVal(a[0].slice(0,2))-dayVal(b[0].slice(0,2)));

    
    for(let i=0; i<schedule.length; i++){
        var day = schedule[i];
        var dayText = day[0].slice(0,2).trim()
        var timeSlot = day[0].slice(2).trim()
        var j;
        for(j=i+1; j<schedule.length; j++){
            var day2 = schedule[j];
            var timeSlot2 = day2[0].slice(2).trim()
            if(timeSlot === timeSlot2){
                dayText += day2[0].slice(0,2).trim()
                schedule.splice(j,1);
                j--;
            }
        }
        day[0] = dayText+' '+timeSlot;
        
    }
    return (<>{schedule.map((chipInfo) => (<Chip 
        label={chipInfo[0]}
        key={String(id)+'ScheduleChip'+chipInfo[0]}
        style={{margin:'1.5px', backgroundColor:chipInfo[1],fontWeight:'450'}}
    />))}</>);
};
export function ScheduleTypeProvider(props){
    return (
        <DataTypeProvider
            formatterComponent={ScheduleFormatter}
            {...props}
        />
    );
};



function DataTypeProviders({BooleanColumns, ShirtColumns, ScheduleColumns,ListColumns}){
    return (
        <Plugin>
            <BooleanTypeProvider for={BooleanColumns} />
            <ShirtTypeProvider for={ShirtColumns} />
            <ScheduleTypeProvider for={ScheduleColumns} />
            <ListTypeProvider for={ListColumns} />
        </Plugin>
    );  
};

export default DataTypeProviders
