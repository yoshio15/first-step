import React from 'react'
import * as H from 'history'
import { Container, Paper, Grid, TextField, Button, Box, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { API } from 'aws-amplify'
import { PATHS, API_GATEWAY } from '../../constants/config'

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
  usersWorksList: IWorkEntity[]
}
class MyPageEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  state: IState = {
    userId: '',
    userName: '',
    userSummary: '',
    postedWorkIdList: [],
    userIconUrl: '',
    usersWorksList: []
  }
  componentDidMount() {
    this.getUser()
  }
  async getUser() {
    const userId = this.props.match.params.id
    const path = `${PATHS.GET.USER_PATH}/${userId}`
    console.log('USER_ID: ' + userId)
    console.log('PATH: ' + path)
    await API.get(API_GATEWAY.NAME, path, {})
      .then(res => {
        console.log(res)
        this.setState({
          userId: res.user_id,
          userName: res.user_name,
          userSummary: res.user_summary,
          postedWorkIdList: res.posted_work_id_list,
          usersWorksList: res.usersWorksList
        })
        console.log(typeof res.icon_binary)
        const decodedIconBinary = Buffer.from(res.icon_binary, 'base64');
        console.log(decodedIconBinary)
        const blob = new Blob([decodedIconBinary], { type: 'application/octet-binary' })
        console.log(blob)
        // Blobデータから、それを表示可能なURLを生成する.
        const url = (window.URL || window.webkitURL).createObjectURL(blob)
        console.log(url)
        this.setState({ userIconUrl: url })
      })
      .catch(err => {
        console.log(err)
      })
  }
  private handleUserNameInput = (e: any) => { this.setState({ userName: e.target.value }) }
  private handleUserSummaryInput = (e: any) => { this.setState({ userSummary: e.target.value }) }
  private goBackToMyPage = () => { this.props.history.push(`/mypage/${this.state.userId}`) }
  private updateUserProfile = () => {}
  render() {
    console.log(this.state)
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={9}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              <CardContent>
                <Grid container justify='center'>
                  <Grid item>
                    <img src={this.state.userIconUrl} width='32' height='32' />
                  </Grid>
                  <Grid item>
                    <Typography variant='h6'>{this.state.userName} プロフィール編集</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}></Box>
                <Grid container>
                  <Grid item sm={2}>
                    <img src={this.state.userIconUrl} width='104' height='104' />
                  </Grid>
                  <Grid item sm={10}>
                    <Typography>ユーザ名</Typography>
                    <TextField
                      required
                      fullWidth
                      rows="10"
                      variant="outlined"
                      margin="normal"
                      value={this.state.userName}
                      onChange={this.handleUserNameInput}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Box mt={3}></Box>
                    <Typography>自己紹介</Typography>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows="10"
                      variant="outlined"
                      margin="normal"
                      value={this.state.userSummary}
                      onChange={this.handleUserSummaryInput}
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => this.goBackToMyPage()}
                  >キャンセル</Button>
                  <Button
                    color='primary'
                    variant='outlined'
                  >保存</Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default MyPageEdit;