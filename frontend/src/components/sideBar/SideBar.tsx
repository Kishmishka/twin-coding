import { IconButton } from '@mui/material';
import logo from '../../img/logo.svg';
import { useLog, useSettingsRedactor } from '../../store';
import MySwitch from '../MUI/MySwith.tsx';
import Avatar from '../avatar/Avatar.tsx';
import OutputSideBar from '../outputSideBar/OutputSideBar.tsx';
import SettingsSideBar from '../settingsSideBar/SettingsSideBar.tsx';
import './SideBar.scss';
import ShareLink from '../shareLink/ShareLink.tsx';

//Компонент отвечающий за отрисовку боковой панели
//Используется в компоненте App.js
const SideBar = ({}) => {
    const blackTheme = useSettingsRedactor(state => state.blackTheme);
    const swapblackTheme = useSettingsRedactor(state => state.swapblackTheme);
    const users = useLog(state => state.users);
    const color = useLog(state => state.color);
    const name = useLog(state => state.name);

    return (
        <div className="SideBar">
            <div className="SideBar__content content">
                <img className="content__img" src={logo} />

                {color !== '' && name !== '' && <Avatar color={color} name={name} />}
                {users.map(user => (
                    <Avatar color={user.color} name={user.name} />
                ))}
            </div>
            <div className="SideBar__settings">
                <ShareLink />
                <OutputSideBar />
                <SettingsSideBar />
                <MySwitch
                    onChange={swapblackTheme} // Pass the function directly, no need for an anonymous function
                    blackTheme={blackTheme} // Pass the boolean value directly
                />
            </div>
        </div>
    );
};
export default SideBar;
