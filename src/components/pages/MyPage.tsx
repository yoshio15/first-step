import React from 'react'
import * as H from 'history'
import { Container, Paper, Grid, TextField, Button, Box, Card, CardActions, CardContent, Typography, CircularProgress, LinearProgress, Fade } from '@material-ui/core'
import { API } from 'aws-amplify'
import { PATHS, API_GATEWAY } from '../../constants/config'
import LoadingArea from '../parts/LoadingArea'

interface IWorkEntity {
  work_id: string,
  title: string,
  description: string,
  user_id: string,
  user_name: string,
  posted_at: number
}
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
  usersWorksList: IWorkEntity[],
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
    console.log('USER_ID: ' + userId)
    console.log('PATH: ' + path)
    this.setState({ userId, loading: true })
    await API.get(API_GATEWAY.NAME, path, {})
      .then(res => {
        console.log(res)
        this.setState({
          userId: res.user_id,
          userName: res.user_name,
          userSummary: res.user_summary,
          postedWorkIdList: res.posted_work_id_list,
          usersWorksList: res.usersWorksList,
        })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }
  private goToEditPage = () => {
    this.props.history.push(`/mypage/edit/${this.state.userId}`)
  }
  private goToDescriptionPage = (workId: string, userId: string) => {
    this.props.history.push(`/work-description/${workId}/${userId}`)
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
                    <Button
                      color='inherit'
                      variant='outlined'
                      onClick={() => this.goToEditPage()}
                    >プロフィールを編集する</Button>
                  </Grid>
                  <Grid item sm={9}>
                    <Typography>{this.state.userSummary}</Typography>
                  </Grid>
                </Grid>
                <Box mt={5}></Box>
                {this.state.usersWorksList.map(item => (
                  <Container>
                    <Card
                      key={item.work_id}
                      variant='outlined'
                      onClick={() => this.goToDescriptionPage(item.work_id, item.user_id)}
                    >
                      <CardContent>
                        <Typography variant='h6'>{item.title}</Typography>
                        <Grid container>
                          <Grid xs={6} item>
                            <Typography variant='body2' color='textSecondary'>投稿者：{item.user_name}</Typography>
                          </Grid>
                          <Grid xs={6} item>
                            <Typography
                              variant='body2'
                              color='textSecondary'
                            >投稿日時：{new Date(item.posted_at * 1000).toLocaleDateString()}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
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