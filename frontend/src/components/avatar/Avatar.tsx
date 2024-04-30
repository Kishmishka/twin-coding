import Tooltip from '@mui/material/Tooltip';
import './Avatar.scss';
import {FC} from 'react';
import useAvatar from '../../hooks/useAvatar';
import SVG from 'react-inlinesvg';
//Компонент отвечающий за отрисовку аватарки пользователя при авторизации
//Задействован в компоненте SideBar.jsx

interface IAvatarProps {
    color: string;
    name: string;
}

const Avatar: FC<IAvatarProps> = ({color, name}) => {
    return (
        <Tooltip title={name} placement="bottom">
            <div className="Avatar" style={{border: `2px solid ${color}`}}>
                <SVG width={'35px'} fill={color} src={useAvatar(name)} />
            </div>
        </Tooltip>
    );
};
export default Avatar;
