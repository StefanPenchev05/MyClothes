import { forwardRef } from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

type SnackBarMsgTypes = {
    type: boolean,
    msg: string
}

interface SnackBarArgs{
    snackBarShow: boolean,
    msg: SnackBarMsgTypes,
    setSnackBarShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

function SnackBar({snackBarShow, msg,setSnackBarShow}:SnackBarArgs) {

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackBarShow(false);
      };  

  return (
    <Snackbar open={snackBarShow} onClose={handleCloseSnackBar} autoHideDuration={3000}>
        {msg.type ? (
            <Alert onClose={handleCloseSnackBar} severity='success' className='w-full'> 
                {msg.msg}
            </Alert>
        ): (
            <Alert onClose={handleCloseSnackBar} severity='error' className='w-full'>
                {msg.msg} 
            </Alert>
        )}
    </Snackbar>
  )
}

export default SnackBar