import { IconButton, Snackbar } from '@mui/material';
import cloud from '../../img/cloud.svg';
import { useState } from 'react';
import Service from '../../API/service';
import { useRedactor, useSettingsRedactor } from '../../store';

const SaveChange = () => {
    const [open, setOpen] = useState<boolean>(false);
    const setRedactorValue = useRedactor(state => state.setRedactorValue);
    const setLanguage = useSettingsRedactor(state => state.setLanguage);
    const handleClick = () => {
        setOpen(true);
        Service.saveChange().then(data => {
            setLanguage(data.data.languageValue.value);
            setRedactorValue(data.data.editorValue.value);
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
                message="Сhanges saved"
                key={'bottom' + 'right'}
            />
        </div>
    );
};
export default SaveChange;
