import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(){
    return(
      <div>
        <Backdrop style={{backgroundColor: '#fff', zIndex:2000}} open={true}>
          <CircularProgress color="secondary" />
        </Backdrop>
      </div>
    );
}