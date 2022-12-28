import * as React from 'react'
import PropTypes from 'prop-types'
import { styled, useTheme } from '@mui/material/styles'

import 
{
    DialogContent, 
    DialogTitle, 
    Dialog, 
    DialogActions,
    Button,
    useMediaQuery
} 
from '@mui/material/'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Draggable from 'react-draggable'
import Paper from '@mui/material/Paper'


const BootstrapDialog = styled(Dialog)(({ theme }) => 
({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))


function PaperComponent(props:any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const BootstrapDialogTitle = (props:any) => 
{
  
  const { children, onClose, ...other } = props

  return (

    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[400],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes =
{
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Modal = (props:any)  =>
{
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  
  const maxWidth = (props.maxwidth) ? props.maxwidth : 'sm'
  const fullWidth = (props.fullwidth) ? props.fullwidth : 'fullWidth'
  const buttomconfirmname = (props.buttomconfirmname) ? props.buttomconfirmname : 'ok'
  const buttomclosename = (props.buttomclosename) ? props.buttomclosename : 'fechar'
  const buttonvariant = (props.buttonvariant) ? props.buttonvariant : 'text'
  const buttonsize = (props.buttonsize) ? props.buttonsize : 'small'

  const ModalButton = styled(Button)(({ theme }) =>
  ({
      lineHeight: 'normal',
      textTransform: 'none', 
      flex: 1,
  }))

  const handleClickOpen = () => 
  {
    setOpen(true);
  }

  const handleClose = () => 
  {
    setOpen(false);
  }

  return (
    
    <div>

      <ModalButton variant={buttonvariant} size={buttonsize} onClick={handleClickOpen} className={props.cls}>
        {props.buttontext}
      </ModalButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        PaperComponent={PaperComponent}
      >

        <BootstrapDialogTitle 
          style={
            { 
              cursor: 'move', 
              color:'#707070', 
              fontSize:'14px', 
              textTransform:'uppercase', 
              fontWeight:'500' 
            }
          } 

          id="draggable-dialog-title" onClose={handleClose}
        >
          
          {props.title}
        
        </BootstrapDialogTitle>

        <DialogContent dividers>

            {props.children}

        </DialogContent>

        <DialogActions>

          <Button variant="outlined" size="small" onClick={handleClose}>
            {buttomclosename}
          </Button>

          {props.id !== undefined && 
            <Button variant="outlined" size="small" autoFocus onClick={() => props.fn(props.id, props.severity)}>
                {buttomconfirmname}
            </Button>
          }

        </DialogActions>

      </BootstrapDialog>

    </div>
  )
}

export default Modal