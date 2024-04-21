import { FC } from 'react';
import cursorImg from '../../img/cursor.svg';
import SVG from 'react-inlinesvg';
import { useSettingsRedactor } from '../../store';
import './Cursor.scss';
//Компонент отвечающий за отрисовку курсора пользователя
//Задействован в компоненте App.js

interface ICursorProps {
    color: string;
    x: number;
    y: number;
    name: string;
}

const Cursor: FC<ICursorProps> = ({ color, x, y, name }) => {
    const cursorLabel = useSettingsRedactor(state => state.cursorLabel);

    return (
        <div
            className="Cursor"
            style={{
                display: cursorLabel ? 'block' : 'none',
                left: x - 65,
                top: y - 395,
            }}
        >
            <SVG src={cursorImg} width="32" fill={color} />
            <div className="Cursor__title">{name}</div>
        </div>
    );
};
export default Cursor;
