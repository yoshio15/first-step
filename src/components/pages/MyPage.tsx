import React from 'react'
import * as H from 'history'
import { Container, Grid, Box, Card, CardContent, Typography, createStyles } from '@material-ui/core'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import API from '../../utils/api'
import { PATHS } from '../../constants/config'
import WorkCard, { WorkItemI } from '../parts/WorkCard'
import EditProfileButton from '../parts/EditProfileButton'
import LoadingDialog from '../parts/LoadingDialog'
import { formatResponseForWorks } from '../../utils/formatter'

const styles = (): StyleRules => createStyles({
  userName: {
    margin: '10px 0 10px',
  },
  userSummaryCard: {
    height: '100%'
  },
  userSummary: {
    whiteSpace: 'pre-wrap'
  }
})
interface IProps extends WithStyles<typeof styles> {
  history: H.History,
  match: {
    params: { id: string }
  }
}
interface IState {
  userId: string,
  userName: string,
  userSummary: string,
  postedWorkIdList: string[],
  userIconUrl: string,
  usersWorksList: WorkItemI[],
  loading: boolean,
}
class MyPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  state: IState = {
    userId: '',
    userName: '',
    userSummary: '',
    postedWorkIdList: [],
    userIconUrl: '',
    usersWorksList: [],
    loading: false,
  }
  componentDidMount() {
    this.getUser()
  }
  async getUser() {
    const userId = this.props.match.params.id
    const path = `${PATHS.GET.USER_PATH}/${userId}`
    this.setState({ userId, loading: true })
    const res = await API.API_GATEWAY.get(path)
    console.log(res)
    this.setState({
      userId: res.user_id,
      userName: res.user_name,
      userSummary: res.user_summary,
      postedWorkIdList: res.posted_work_id_list,
      usersWorksList: formatResponseForWorks(res.usersWorksList),
      loading: false
    })
  }
  render() {
    const { classes } = this.props
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={9}>
            <Box mt={5}></Box>
            {/* {this.state.loading && <LoadingArea />} */}
            <LoadingDialog isOpen={this.state.loading}/>
            <Box mt={3}></Box>
            <Grid container justify='space-between'>
              <Grid item sm={3}>
                <Card variant='outlined'>
                  <CardContent>
                    <Grid container justify='center' direction='column' alignItems='center'>
                      <img src={`${PATHS.ICONS_FOLDER_URL}/${this.state.userId}`} width='104' height='104' />
                      <Typography className={classes.userName}>{this.state.userName}</Typography>
                      <EditProfileButton userId={this.state.userId} />
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={8}>
                <Card variant='outlined' className={classes.userSummaryCard}>
                  <CardContent>
                    <Typography className={classes.userSummary}>{this.state.userSummary}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
            <Grid container justify='space-around'>
              <Grid item>
                <Card variant='outlined'>
                  <Box mt={2}></Box>
                  {this.state.usersWorksList.map(item => (
                    <Container>
                      <WorkCard item={item} />
                      <Box mt={2}></Box>
                    </Container>
                  ))}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }

}

export default withStyles(styles)(MyPage)
