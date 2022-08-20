import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectWarn, selectWarnMsg, closeWarn } from '../../features/trip/tripslice';


export default function WarningPopUp() {
    const dispatch = useAppDispatch();

    const warn = useAppSelector(selectWarn);
    const [open, setOpen] = useState(warn);
    useEffect(() => { setOpen(warn) }, [warn]);

    const msg_data = useAppSelector(selectWarnMsg);
    const [msg, setMsg] = useState(msg_data);
    useEffect(() => { setMsg(msg_data) }, [msg_data]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(closeWarn());
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ⚠️Warning: Invalid Operation⚠️
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}