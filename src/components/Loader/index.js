
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme)=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}))
export default function Loader (props) {
    const classes = useStyles()
    const { open } = props
    
    return(
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
                &nbsp;&nbsp;&nbsp; Loading...
            </Backdrop>
        </div>
    )
}