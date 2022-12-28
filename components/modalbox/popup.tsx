import React, { useState } from 'react'

import 
{ 
  IconButton, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogActions,
  styled, 
  Typography 
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'
import Paper from '@mui/material/Paper'


const DialogModel = styled(Dialog)(( {theme}) => 
({
    '& .MuiPaper-root':{
        top: theme.spacing(5),
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(2px)',
        borderRadius: '10px',
    },
    '& .MuiDialogContent-root':{
        padding: theme.spacing(2),

    },
    '& .MuiDialog-container':{
      backdropFilter: 'blur(3px)'
    },
    '& .MuiDialog-scrollPaper':
    {
      alignItems: 'flex-start',
    }
}))


function PaperComponent(props) 
{
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}


const DialogModelTitle = (props) => 
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
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    )
}
  

DialogModelTitle.propTypes = 
{
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}


const Popup = (props) =>
{
    const { title, children, openPopup, setOpenPopup } = props
    const maxWidth = (props.maxwidth) ? props.maxwidth : 'md'

    return(

      <DialogModel 
          open={openPopup} 
          onClose={() => setOpenPopup(false)}
          maxWidth={maxWidth}
          fullWidth= {true}
          PaperComponent={PaperComponent} 
          aria-labelledby="draggable-dialog-title"
      >
          <DialogModelTitle onClose={() => setOpenPopup(false)}
            id="draggable-dialog-title"
            sx={{
              cursor:'move',
              color:'#707070', 
              fontSize:'14px', 
              textTransform:'uppercase', 
              fontWeight:'500' 
            }}
          >
              <Typography variant='h6' component="div" style={{flexGrow:1, fontSize:'16px', padding: '0px'}}>
                  {title}
              </Typography>
          </DialogModelTitle>

          <DialogContent dividers>
              {children}
          </DialogContent>

      </DialogModel>
      
    )
}

export default Popup