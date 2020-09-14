import React from 'react'
import Usage_1 from '../../static/usage_1.png'
import Usage_2 from '../../static/usage_2.png'
import Usage_3 from '../../static/usage_3.png'
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
    marginTop: '120px',
    width: '100%',
  },
  text: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    textAlign: 'center',
  }
}))

const Usage: React.FC = () => {
  const classes = useStyle()
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <div>
            <img src={Usage_1} alt="First Write HTML/CSS" className={classes.size} />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.textWrapper}>
          <div className={classes.textBlock}>
            <Typography variant='h5' className={classes.text}>1. HTML/CSSをコーディング</Typography>
            <Box mt={2}></Box>
            <Typography variant='subtitle1' className={classes.text}>まずはHTML/CSSでオリジナルのWebページをデザインしましょう。</Typography>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.textWrapper}>
          <div className={classes.textBlock}>
            <Typography variant='h5' className={classes.text}>2. 作成したHTMLファイルを投稿</Typography>
            <Box mt={2}></Box>
            <Typography variant='subtitle1' className={classes.text}>早速作成したHTMLファイルをこのアプリで投稿しましょう。</Typography>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <img src={Usage_2} alt="First Write HTML/CSS" className={classes.size} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <img src={Usage_3} alt="First Write HTML/CSS" className={classes.size} />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.textWrapper}>
          <div className={classes.textBlock}>
            <Typography variant='h5' className={classes.text}>3. たくさんの人に見てもらいましょう</Typography>
            <Box mt={2}></Box>
            <Typography variant='subtitle1' className={classes.text}>自分が書いたHTMLを全世界の人に見てもらいましょう。</Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Usage