import * as React from 'react';
import Avatar from "../../../avatar"
import AvatarGroup from '@mui/material/AvatarGroup';


const GroupAvatars = (props:any) =>
{
    return (

    <AvatarGroup max={10}>
        {props.data.filtered_data.map((item:any, index:any) => (
            <span key={index}>
                <Avatar direction="row" alt={item.name} name={item.name} width="40" avatar={item.avatar}/>
            </span>
        ))}
    </AvatarGroup>

  )
}

export default GroupAvatars