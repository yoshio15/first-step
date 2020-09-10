import React from 'react'
import { Button, Dialog, DialogTitle,DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

interface IProps {
  isOpen: boolean,
  handleClose: any,
  execute: any,
  title: string,
  message: string,
  execMsg: string,
}

const PostDialog: React.FC<IProps> = (props) => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => setOpen(props.isOpen), [props.isOpen])
  return (
    <Dialog
      open={open}
      onClose={props.handleClose}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={props.handleClose}>キャンセル</Button>
        <Button color='primary' onClick={props.execute}>{props.execMsg}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostDialog