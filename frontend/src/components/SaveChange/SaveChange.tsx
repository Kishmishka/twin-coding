import { IconButton, Snackbar } from '@mui/material';
import cloud from '../../img/cloud.svg';
import { useState } from 'react';

import { useLog, useRedactor, useSettingsRedactor } from '../../store';
import Service from '../../API/Service';

const SaveChange = () => {
    const [open, setOpen] = useState<boolean>(false);
    const setRedactorValue = useRedactor((state) => state.setRedactorValue);
    const setLanguage = useSettingsRedactor((state) => state.setLanguage);
    const setAllowChange = useRedactor((state) => state.setAllowChange);
    const room = useLog((state) => state.room);

    const handleClick = () => {
        setOpen(true);
        Service.saveChange(room).then((data) => {
            setAllowChange(false);
            setLanguage(data.data.languageValue.value);
            setRedactorValue(data.data.editorValue);
        });
    };

    return (
        <div>
            <IconButton onClick={handleClick} aria-label="delete" sx={{ color: 'white' }}>
                <img width={'30px'} src={cloud} />
            </IconButton>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                message="Data uploaded"
                key={'bottom' + 'right'}
            />
        </div>
    );
};
export default SaveChange;
