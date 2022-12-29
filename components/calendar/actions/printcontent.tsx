import React, { useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import PrintIcon from '@mui/icons-material/Print'
import PrintResumeview from '../../schedule/resumeview/printresumeview'


const PrintContent = (props:any) => 
{
    const componentRef = useRef()

    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"
    let id_print = (props.id_print) ? props.id_print : 'print'

    
    function printWithCss(elementId = '') 
    {
        var title = document.title
        //let divElements = document.getElementById(elementId).innerHTML
        let printWindow = window.open("", "_blank", "")

        /*printWindow.document.open()
        printWindow.document.write('<html><head><title>' + title + '</title><link rel="stylesheet" type="text/css" href="styles/ResumeView.module.css"></head><body>')
        printWindow.document.write(divElements);
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.focus();*/

        setTimeout(function() 
        {
            //printWindow.print()
            //printWindow.close()
        }, 100)

        
    }

    return(
        <IconButton sx={{padding: icon_padding}} color='inherit' onClick={() => printWithCss(id_print)}>
            <PrintIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )
}

export default PrintContent