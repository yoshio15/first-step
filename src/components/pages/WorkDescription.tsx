import React from 'react'
import { Link } from 'react-router-dom'
import { API } from 'aws-amplify'
import { Container, Paper, Grid, TextField, Button, Box, Card, CardActions, CardContent, Typography, CircularProgress, LinearProgress, Fade, createStyles } from '@material-ui/core'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import { PATHS, API_GATEWAY } from '../../constants/config'
import { formatLinuxTimeToLocaleDate } from '../../utils/formatter'

// DBから取得するリストのインターフェース
interface IResponse {
  work_id: string,
  title: string,
  description: string,
  user_id: string,
  user_name: string,
  posted_at: number
}
interface IProps extends WithStyles<typeof styles> {
  match: {
    params: {
      work_id: string,
      user_id: string
    }
  }
}
interface IState {
  workId: string,
  title: string,
  description: string,
  userId: string,
  userName: string,
  postedAt: string,
  loading: boolean,
}
const styles = (): StyleRules => createStyles({
  description: {
    whiteSpace: 'pre-wrap'
  }
})
class WorkDescription extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  state: IState = {
    workId: '',
    title: '',
    description: '',
    userId: '',
    userName: '',
    postedAt: '',
    loading: false,
  }
  componentDidMount() {
    this.getWork()
  }
  async getWork() {
    console.log('getWork')
    console.log('WORK_ID: ' + this.props.match.params.work_id)
    console.log('USER_ID: ' + this.props.match.params.user_id)
    const workId = this.props.match.params.work_id
    const userId = this.props.match.params.user_id
    const path = `${PATHS.GET.WORK_PATH}/${workId}/${userId}`
    this.setState({ loading: true })
    await API.get(API_GATEWAY.NAME, path, {})
      .then(res => {
        console.log(res)
        this.setState({
          workId: res.work_id,
          title: res.title,
          description: res.description,
          userId: res.user_id,
          userName: res.user_name,
          postedAt: formatLinuxTimeToLocaleDate(res.posted_at),
          loading: false
        })
      }).catch(err => {
        console.log(err)
      })
  }
  private goToWorkPage = () => { window.open(`${PATHS.BASE_URL}/${this.state.workId}`, '_blank') }
  render() {
    console.log(this.state)
    const { classes } = this.props
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={7}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              <Fade in={this.state.loading} unmountOnExit>
                <LinearProgress />
              </Fade>
              <CardContent>
                <Fade in={this.state.loading} unmountOnExit>
                  <Grid container justify='center'>
                    <Grid xs={1} item>
                      <CircularProgress />
                    </Grid>
                  </Grid>
                </Fade>
                <Grid container>
                  <Grid item sm={2}>
                    <Link to={`/mypage/${this.state.userId}`}>
                      <Typography color='textSecondary'>
                        {this.state.userName}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item sm={2}>
                    <Typography color='textSecondary'>{this.state.postedAt}</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}></Box>
                <Typography color='textPrimary' variant='h5'>{this.state.title}</Typography>
                <Box mt={3}></Box>
                <Typography className={classes.description}>{this.state.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  color='primary'
                  component={Link}
                  to='../../works-list'
                  variant='outlined'
                >作品一覧に戻る</Button>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => this.goToWorkPage()}
                >作品を見る</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(WorkDescription)