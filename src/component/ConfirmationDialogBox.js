import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core';

const ConfirmationDialogBox = ({ title, desc, open, handleClose, actionHandler, isUpdating }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!isUpdating) {
          handleClose()
        }
      }
      }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle align="center">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isUpdating} color="primary">
          No
        </Button>
        <Button onClick={() => actionHandler()} color="primary" disabled={isUpdating} autoFocus>
          {
            isUpdating ? "Updating...." : "Yes"
          }
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialogBox;



