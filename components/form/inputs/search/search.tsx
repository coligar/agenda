import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'

const SearchBar = (props:any) => 
{

  let elevation = (props.elevation) ? props.elevation : 0
  let placeholder = (props.placeholder) ? props.placeholder : ''
  let size = (props.size) ? props.size : 400
  let padding = (props.padding) ? props.padding : "2px 4px"
  
  return (
    <Paper
      component="form"
      sx={{ p: padding, display: 'flex', alignItems: 'center', width: size }}
      elevation={elevation}
    >
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder= {placeholder}
        inputProps={{ 'aria-label': placeholder }}
        onChange={props.onChange}
      />
    
    </Paper>
  );
}

export default SearchBar