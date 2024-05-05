import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material';
import React from 'react';
import {useLog} from '../../store';
import share from '../../img/share.svg';
import {URLS} from '../../constants';

const ShareLink = () => {
    const [open, setOpen] = React.useState(false);
    const room = useLog(state => state.room);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} aria-label="delete" sx={{color: 'white'}}>
                <img width={'30px'} src={share} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{backgroundColor: '#232323', color: 'white'}}>
                    <DialogTitle id="alert-dialog-title">{'link to your room'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            sx={{
                                color: '#E7E7E7',
                                fontSize: '18px',
                                backgroundColor: '#3b3b3b',
                                padding: '3px 8px',
                                borderRadius: '7px',
                            }}
                        >
                            {URLS.httpServer}
                            {URLS.portClient}/?room={room}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `http://localhost:5173/?room=${room}`,
                                );
                                setOpen(false);
                            }}
                        >
                            Copy
                        </Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};
export default ShareLink;
