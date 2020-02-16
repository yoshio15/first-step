import React from 'react'
import Usage_1 from '../../static/usage_1.png'
import { Container, Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
  size: {
    width: '100%'
  },
  textWrapper: {
    position: 'relative'
  },
  textBlock: {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    // translate: "translateY('-50%')",
  },
  text: {
    // width: '80%',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    textAlign: 'center',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
}))

const Usage: React.FC = () => {
  const classes = useStyle()
  // TODO Boxの濫用を避けてCSSで中央配置を実現したい
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <img src={Usage_1} alt="First Write HTML/CSS" className={classes.size} />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.textWrapper}>
          <Box mt={5}></Box>
          <div className={classes.textBlock}>
            <Typography variant='h5' className={classes.text}>1. HTML/CSSをコーディング</Typography>
            <Box mt={2}></Box>
            <Typography variant='subtitle1' className={classes.text}>まずはHTML/CSSでオリジナルのWebページをデザインしましょう。</Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Usage