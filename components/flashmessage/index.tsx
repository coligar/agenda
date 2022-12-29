import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//import Alert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
});

const FlashMessage = (props:any) => 
{
  const {notify, setNotify} = props

  const vertical = (props.vertical) ? props.vertical : 'top'
  const horizontal = (props.horizontal) ? props.horizontal : 'right'

  const handleClose = (event:any, reason:any) => 
  {
      setNotify({
        ...notify,
        isOpen: false
      })
  }

  return (
    
    <Snackbar 
      open={notify.isOpen} 
      autoHideDuration={5000} 
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
    >
      <Alert 
        onClose={handleClose}
        severity={notify.type}
      >
        
        {notify.message}

      </Alert>
    </Snackbar>
    
  );
}

export default FlashMessage