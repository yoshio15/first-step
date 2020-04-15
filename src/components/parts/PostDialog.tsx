import React from 'react'
import { Button, Dialog, DialogTitle,DialogContent, DialogContentText, DialogActions } from '@material-ui/core'

interface IProps {
  isOpen: boolean,
  handleClose: any,
  execute: any
}

const PostDialog: React.FC<IProps> = (props) => {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => setOpen(props.isOpen), [props.isOpen])
  return (
    <Dialog
      open={open}
      onClose={props.handleClose}
    >
      <DialogTitle>投稿確認</DialogTitle>
      <DialogContent>
        <DialogContentText>本当に作品を登録してよろしいですか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={props.handleClose}>キャンセル</Button>
        <Button color='primary' onClick={props.execute}>投稿する</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostDialog