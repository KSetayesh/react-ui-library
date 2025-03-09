import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

type DeleteConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
};

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    message = "Are you sure you want to delete this item? This action cannot be undone."
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title">
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;