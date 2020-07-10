import React from 'react'
import { Backdrop, CircularProgress ,createStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';

interface PropsI extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
  isOpen: boolean;
}
const styles = (theme: Theme): StyleRules => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#000',
  },
})
const LoadingDialog: React.FC<PropsI> = (props: PropsI) => {
  const { classes, isOpen } = props
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default withStyles(styles)(LoadingDialog)