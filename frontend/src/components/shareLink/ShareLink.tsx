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
import { useLog } from '../../store';
import share from '../../img/share.svg';
import './ShareLink.scss';

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
            <IconButton onClick={handleClickOpen} aria-label="delete" sx={{ color: 'white' }}>
                <img width={'30px'} src={share} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="dialogWindow">
                    <DialogTitle id="alert-dialog-title">{'link to your room'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            className="dialogWindow__description"
                            sx={{ color: '#CDA85F', fontSize: '18px' }}
                        >
                            http://localhost:5173/?room={room}
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
