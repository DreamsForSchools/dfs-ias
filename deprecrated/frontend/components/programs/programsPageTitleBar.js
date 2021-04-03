import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

export default function ProgramsPageTitleBar({
    sortPageToggle,  setSortPageToggle, 
    tableViewSwitch, setTableViewSwitch, 
    programData, newSortHandler, reSortHandler,
    setLoading
}){
    return (<>
        <div
            style={{
                display:'grid',
                gridTemplateColumns:'25% auto 25%',
                width:'100%',
                height:'70px',
                padding:'0 1vh',
                margin:'1vh 0', 
                alignItems:"center" }}
        >   
            <div style={{margin:'1vh',gridColumn:'1/span 1', justifySelf:'start'}}>
                {sortPageToggle? 
                    <Link onClick={()=>setSortPageToggle(!sortPageToggle)} style={{cursor:'pointer'}}>
                        &larr; Back to Programs
                    </Link> 
                    :
                    <Link onClick={()=>setSortPageToggle(!sortPageToggle)} style={{cursor:'pointer'}}>
                        Show Saved Sorts &rarr;
                    </Link>
                }
            </div>
            <div  style={{margin:'1vh', gridColumn:'2/span 1', justifySelf:'center'}}>
                {sortPageToggle? 
                    <Button onClick={()=>{setLoading(true);reSortHandler();}}size='large' variant="contained" color="secondary" style={{color:'white',textShadow:'0 0 5px #000000', fontSize:15,  borderRadius:'20px'}}>
                        Re-Sort
                    </Button>
                    :
                    <Button  onClick={()=>{setLoading(true);newSortHandler();}} size='large' variant="contained" style={{color:'white',textShadow:'0 0 5px #000000',textTransform: 'none',fontSize:15, backgroundColor:"#4caf50", borderRadius:'20px'}}>
                        New SORT
                    </Button>
                }
            </div>
            <div  style={{margin:'1vh', gridColumn:'3/span 1', justifySelf:'end'}}>
                {sortPageToggle?
                    <FormControlLabel
                        id='tableViewForm'
                        control={
                            <Switch
                                checked={true/*tableViewSwitch*/}
                                onChange={() => {setTableViewSwitch(true)}}
                                name="tableViewSwitch"
                                color="primary"
                                size="small"
                            />
                        }
                        label="Table View"
                    />
                    :
                    <div style={{color:programData['unassigned_instructors']?'red':'grey'}}>
                        Unassigned Instructors: 
                        {' '+programData['unassigned_instructors'].toString()}
                    </div>
                }
            </div>
        </div>
    </>);
}