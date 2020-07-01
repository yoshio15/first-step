import React from 'react'
import * as H from 'history'
import { Container, Grid, Box, Card, CardContent, Typography } from '@material-ui/core'
import API from '../../utils/api'
import { PATHS } from '../../constants/config'
import LoadingArea from '../parts/LoadingArea'
import WorkCard, { WorkItemI } from '../parts/WorkCard'
import EditProfileButton from '../parts/EditProfileButton'
import { formatResponseForWorks } from '../../utils/formatter'

interface IProps {
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
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={9}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              {this.state.loading && <LoadingArea />}
              <CardContent>
                <Grid container>
                  <Grid item sm={12}>
                    <Typography variant='h6'>マイページ</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}></Box>
                <Grid container>
                  <Grid item sm={3}>
                    <img src={`${PATHS.ICONS_FOLDER_URL}/${this.state.userId}`} width='104' height='104' />
                    <Typography>{this.state.userName}</Typography>
                    <EditProfileButton userId={this.state.userId} />
                  </Grid>
                  <Grid item sm={9}>
                    <Typography>{this.state.userSummary}</Typography>
                  </Grid>
                </Grid>
                <Box mt={5}></Box>
                {this.state.usersWorksList.map(item => (
                  <Container>
                    <WorkCard item={item} />
                    <Box mt={2}></Box>
                  </Container>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }

}

export default MyPage