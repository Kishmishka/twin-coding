import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

//Модернизированный слайдер из material-ui
//Используется в компоненте SettingsSideBar.jsx

interface ISliderProps {
    value: number;
    title: string;
    max: number;
    min: number;
    setValue: (value: number) => void;
    className: string;
}

const MySlider: React.FC<ISliderProps> = ({value, title, max, min, className, setValue}) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        const valueToSet = Array.isArray(newValue) ? newValue[0] : newValue;
        setValue(valueToSet);
    };

    return (
        <div className={className}>
            <Box sx={{width: '75%', margin: '0 auto'}}>
                <Typography sx={{color: '#EEEEEE'}} id="non-linear-slider" gutterBottom>
                    {title}
                </Typography>
                <Slider
                    value={value}
                    min={min}
                    step={1}
                    max={max}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                />
            </Box>
        </div>
    );
};
export default MySlider;
