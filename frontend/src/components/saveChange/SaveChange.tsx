import { IconButton, Snackbar, SnackbarOrigin } from '@mui/material';
import cloud from '../../img/cloud.svg';
import { useState } from 'react';
import Service from '../../API/service';

const SaveChange = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(true);
        Service.saveChange().then(() => {
            location.reload();
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
