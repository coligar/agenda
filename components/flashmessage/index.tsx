import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FlashMessage = (props) => 
{
  const {notify, setNotify} = props

  const vertical = (props.vertical) ? props.vertical : 'top'
  const horizontal = (props.horizontal) ? props.horizontal : 'right'

  const handleClose = (event, reason) => 
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