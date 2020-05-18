import React from 'react'
import { Container, Paper, Grid, TextField, Button, Box, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { API } from 'aws-amplify'
import { PATHS, API_GATEWAY } from '../../constants/config'

interface IProps {
  match: {
    params: { id: string }
  }
}
interface IState {
  userId: string,
  userName: string,
  userSummary: string,
  postedWorkIdList: string[],
  userIconUrl: string
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
    userIconUrl: ''
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
          postedWorkIdList: res.posted_work_id_list
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
  render() {
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={7}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              <CardContent>
                <Grid container>
                  <Grid item sm={12}>
                    <Typography variant='h6'>マイページ</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}></Box>
                <Grid container>
                  <Grid item sm={3}>
                    <img src={this.state.userIconUrl} />
                    <Typography>{this.state.userName}</Typography>
                  </Grid>
                  <Grid item sm={9}>
                    <Typography>{this.state.userSummary}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }

}

export default MyPage