import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

const AvatarPicture = (props: any) => 
{
    
    function hasborder(border = false)
    {
        const the_border = (typeof border === 'string') ? border : (border) ? '2px solid #707070' : 'none'
        return the_border
    }

    
    function stringToColor(string: string) 
    {
        let hash = 0;
        let i;
        
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    }
      
    function stringAvatar(name = '') 
    {   
        let my_name
        let last_index_array = parseInt(Number(name.split(' ').length)) - 1

        if(name == '')
        {
            my_name = 'GC'
        }
        else if(name.split(' ').length == 1)
        {
            my_name = `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`
        }
        else
        {
            my_name = `${name.split(' ')[0][0]}${name.split(' ')[last_index_array][0]}`
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
                width: parseInt(props.width),
                height: parseInt(props.width),
                border: hasborder(props.border)
            },
            children: my_name,
        };
    }

    let has_avatar = <Avatar {...stringAvatar(props.name)}/>

    if(typeof props.avatar === 'string')
    {
        has_avatar = <Avatar
                        src={props.avatar}
                        alt={props.name}
                        sx={{ width: parseInt(props.width), height: parseInt(props.width), border: hasborder(props.border), }}
                        >
                           <Avatar {...stringAvatar(props.name)}/> 
                    </Avatar>
    }

    return (
      <Stack direction={props.direction} spacing={2}>
        {has_avatar}
      </Stack>
    );
}

export default AvatarPicture