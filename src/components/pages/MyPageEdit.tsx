import React from 'react'
import * as H from 'history'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Container, Grid, TextField, Button, Box, Card, CardActions, CardContent, Typography, createStyles, CircularProgress, Backdrop } from '@material-ui/core'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import API from '../../utils/api'
import { PATHS, MESSAGES, DIALOG_MESSAGES, DIALOG_TITLE, DIALOG_EXEC_MSG } from '../../constants/config'
import { formatRequestForUserInfo } from '../../utils/formatter'
import LoadingArea from '../parts/LoadingArea'
import ConfirmDialog from '../parts/ConfirmDialog'

const styles = (theme: Theme): StyleRules => createStyles({
  subTitle: {
    fontWeight: 'bold'
  },
  iconImg: {
    cursor: 'pointer'
  },
  cancelBtn: {
    marginRight: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
})
interface IWorkEntity {
  work_id: string,
  title: string,
  description: string,
  user_id: string,
  user_name: string,
  posted_at: number
}
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
  userIconImg: string,
  postedWorkIdList: string[],
  userIconUrl: string,
  defaultUserIconUrl: string,
  file: File | undefined,
  fileType: string,
  usersWorksList: IWorkEntity[],
  loading: boolean,
  isValidatedUserName: boolean,
  userNameErrorMsg: string,
  isValidatedUserSummary: boolean,
  userSummaryErrorMsg: string,
  isOpen: boolean,
  postLoading: boolean,
}
class MyPageEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  state: IState = {
    userId: '',
    userName: '',
    userSummary: '',
    userIconImg: '',
    postedWorkIdList: [],
    userIconUrl: '',
    defaultUserIconUrl: '',
    file: undefined,
    fileType: '',
    usersWorksList: [],
    loading: false,
    isValidatedUserName: true,
    userNameErrorMsg: '',
    isValidatedUserSummary: true,
    userSummaryErrorMsg: '',
    isOpen: false,
    postLoading: false,
  }
  componentDidMount() {
    this.getUser()
  }
  async getUser() {
    const userId = this.props.match.params.id
    const path = `${PATHS.GET.USER_PATH}/${userId}`
    this.setState({ loading: true })
    const response = await API.API_GATEWAY.get(path)
    console.log(response)
    this.setState({
      userId: response.user_id,
      userName: response.user_name,
      userSummary: response.user_summary,
      postedWorkIdList: response.posted_work_id_list,
      usersWorksList: response.usersWorksList,
      loading: false,
      userIconUrl: PATHS.ICONS_FOLDER_URL + '/' + response.user_id
    })
  }
  private handleUserSummaryInput = (e: any) => { this.setState({ userSummary: e.target.value }) }
  private goBackToMyPage = () => { this.props.history.push(`/mypage/${this.state.userId}`) }
  private isValidateInputs = () => {
    let isOkUserName;
    let isOkUserSummary;
    if (this.state.userName.length == 0 || this.state.userName.length > 30) {
      this.setState((state, props) => ({
        isValidatedUserName: false,
        userNameErrorMsg: MESSAGES.USER_NAME_IS_TOO_LONG
      }))
      isOkUserName = false
    } else {
      this.setState({ isValidatedUserName: true })
      isOkUserName = true
    }
    if (this.state.userSummary.length == 0 || this.state.userSummary.length > 400) {
      this.setState({
        isValidatedUserSummary: false,
        userSummaryErrorMsg: MESSAGES.USER_SUMMARY_IS_TOO_LONG
      })
      isOkUserSummary = false
    } else {
      this.setState({ isValidatedUserSummary: true })
      isOkUserSummary = true
    }
    return isOkUserName && isOkUserSummary;
  }
  private updateUserProfile = async () => {
    this.setState({ isOpen: false, postLoading: true })
    if (!this.isValidateInputs()) {
      this.setState({ postLoading: false })
      return;
    }
    // ユーザ情報の更新
    await this.updateUserInfoToDynamo()
    // アイコンファイルに変更がある場合
    if (this.state.file) {
      const url = await this.getPresignedUrl()
      console.log(`URL: ${url}`)
      await this.uploadFileToS3(url)
    }
    this.setState({ postLoading: false })
    this.goBackToMyPage()
  }
  private getPresignedUrl = async () => {
    const path = `${PATHS.GET.S3_PRESIGNED_URL_FOR_USER_ICON_PATH}/${this.state.userId}/${this.state.fileType}`
    return await API.API_GATEWAY.get(path)
  }
  private updateUserInfoToDynamo = async () => {
    const request = formatRequestForUserInfo(this.state)
    console.log(`REQUEST: ${JSON.stringify(request)}`)
    await API.API_GATEWAY.post(PATHS.POST.UPDATE_USER_PATH, request)
  }
  private uploadFileToS3 = async (url: string) => {
    const file = this.state.file
    const option = { headers: { 'Content-Type': this.state.fileType } }
    await API.S3.put(url, file, option)
  }
  private fileHandler = (e: any) => {
    e.persist()
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL
    const iconUrl = createObjectURL(file)
    const userIconFileName = this.state.userId + '.' + file.name.split('.').pop()
    this.setState({
      userIconUrl: iconUrl,
      file: file,
      fileType: file.type,
      userIconImg: userIconFileName
    })
  }
  private clickFileUploadBtn = () => {
    document.getElementById('file-input')!.click()
  }
  render() {
    const { classes } = this.props
    console.log(this.state)
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={9}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              {this.state.loading && <LoadingArea />}
              <Box mt={3}></Box>
              {!this.state.loading &&
                <div>
                  <CardContent>
                    <Grid container justify='center'>
                      <Grid item>
                        <img
                          src={`${PATHS.ICONS_FOLDER_URL}/${this.state.userId}`}
                          width='32'
                          height='32'
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant='h6'>{this.state.userName} プロフィール編集</Typography>
                      </Grid>
                    </Grid>
                    <Box mt={3}></Box>
                    <Grid container>
                      <Grid item sm={2}>
                        <Grid container justify='center'>
                          <img
                            src={this.state.userIconUrl}
                            width='104'
                            height='104'
                            className={classes.iconImg}
                            onClick={() => this.clickFileUploadBtn()}
                          />
                          <input
                            id="file-input"
                            type="file"
                            value=""
                            style={{ display: "none" }}
                            onChange={this.fileHandler}
                          />
                        </Grid>
                      </Grid>
                      <Grid item sm={10}>
                        <Typography className={classes.subTitle}>ユーザ名</Typography>
                        {/** 一旦ユーザー名は変更出来ないように **/}
                        <TextField
                          required
                          fullWidth
                          rows="10"
                          variant="outlined"
                          margin="normal"
                          value={this.state.userName}
                          disabled
                          helperText="※ ユーザ名は変更できません。"
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Box mt={5}></Box>
                        <Typography className={classes.subTitle}>自己紹介</Typography>
                        <TextField
                          required
                          fullWidth
                          multiline
                          rows="10"
                          variant="outlined"
                          margin="normal"
                          placeholder="自己紹介文を入力して下さい。 ※400文字以内"
                          value={this.state.userSummary}
                          onChange={this.handleUserSummaryInput}
                          error={!this.state.isValidatedUserSummary}
                          helperText={!this.state.isValidatedUserSummary ? this.state.userSummaryErrorMsg : ''}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      direction='row'
                      justify='flex-end'
                    >
                      <Button
                        color='primary'
                        variant='outlined'
                        onClick={() => this.goBackToMyPage()}
                        className={classes.cancelBtn}
                      >キャンセル</Button>
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => { this.setState({ isOpen: true }) }}
                      >保存</Button>
                      <ConfirmDialog
                        isOpen={this.state.isOpen}
                        handleClose={() => this.setState({ isOpen: false })}
                        execute={() => this.updateUserProfile()}
                        title={DIALOG_TITLE.EDIT_PROFILE}
                        message={DIALOG_MESSAGES.EDIT_PROFILE}
                        execMsg={DIALOG_EXEC_MSG.EDIT_PROFILE}
                      />
                      <Backdrop className={classes.backdrop} open={this.state.postLoading}>
                        <CircularProgress color='inherit' />
                      </Backdrop>
                    </Grid>
                  </CardActions>
                </div>
              }
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(MyPageEdit);
