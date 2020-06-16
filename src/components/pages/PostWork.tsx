import React from 'react'
import { Link } from 'react-router-dom'
import { API } from 'aws-amplify'
import axios from 'axios'
import * as H from 'history'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Container, Paper, Grid, TextField, Button, Box, Fade, LinearProgress, CircularProgress, Backdrop } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Create from '@material-ui/icons/Create';
import PostDialog from '../parts/PostDialog'
import Store from '../../store/index'
import { PATHS, API_GATEWAY } from '../../constants/config'

const styles = (theme: Theme): StyleRules => createStyles({
  subTitle: {
    marginLeft: '15px'
  },
  label: {
    textAlign: 'center'
  },
  button: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  buttonWrapper: {
    textAlign: 'center',
    position: 'relative'
  },
  spacer: {
    width: '100%',
    height: '15px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
})

interface Props extends WithStyles<typeof styles> {
  history: H.History
}
interface State {
  workId: string,
  title: string,
  description: string,
  fileName: string,
  file: File | undefined,
  isOpen: boolean,
  loading: boolean
}

class PostWork extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  state: State = {
    workId: '',
    title: '',
    description: '',
    fileName: '',
    file: undefined,
    isOpen: false,
    loading: false
  }
  private clickFileUploadBtn = () => {
    document.getElementById('file-input')!.click()
  }
  private fileHandler = (e: any) => {
    e.persist() // イベントへの参照をコード内で保持
    console.log(e)
    console.log(e.target.files[0])
    this.setState({
      fileName: e.target.files[0].name,
      file: e.target.files[0]
    })
  }
  private handleTitleInput = (e: any) => { this.setState({ title: e.target.value }) }
  private handleDescriptionInput = (e: any) => { this.setState({ description: e.target.value }) }
  private generateRequest = async (workId: string) => {
    const userIconImg = await this.getUserIconImg()
    console.log('①USER_ICON_IMG' + userIconImg)
    return {
      body: {
        workId,
        userIconImg,
        userId: Store.getState().store.id,
        userName: Store.getState().store.user,
        title: this.state.title,
        description: this.state.description,
      }
    }
  }
  private getUniqueId = () => {
    return Math.floor(1000 * Math.random()).toString(16) + Date.now().toString(16)
  }
  private openDialog = () => this.setState({ isOpen: true })
  private postWork = async () => {
    this.setState({ isOpen: false, loading: true }) // ダイアログを閉じてバックドロップを表示
    const workId = this.getUniqueId()
    const request = await this.generateRequest(workId)
    console.log('②REQUEST: ' + JSON.stringify(request))
    this.setState({ workId })
    Promise.all([
      this.postMetaInfoToDynamo(request),
      this.getPrisignedUrlForUploadToS3(workId).then((url) => this.uploadFileToS3(url))
    ]).then(_res => {
      this.props.history.push('works-list')
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }
  private uploadFileToS3 = (url: string) => {
    return new Promise((resolve, reject) => {
      const file = this.state.file
      console.log(file)
      axios
        .put(url, file, { headers: { 'Content-Type': 'text/html' } })
        .then(res => {
          console.log(res)
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject()
        })

    })
  }
  private getPrisignedUrlForUploadToS3 = (workId: string) => {
    return new Promise<string>((resolve, reject) => {
      const option = {}
      const path = `${PATHS.GET.S3_PRESIGNED_URL_PATH}/${workId}`
      console.log('PATH: ' + path)
      API.get(API_GATEWAY.NAME, path, option)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  }
  private postMetaInfoToDynamo = (request: any) => {
    return new Promise((resolve, reject) => {
      API.post(API_GATEWAY.NAME, PATHS.POST.NEW_WORK_PATH, request)
        .then(response => {
          console.log(response)
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
  private getUserIconImg = () => {
    return new Promise((resolve, reject) => {
      const option = {}
      const path = `${PATHS.GET.USER_ICOM_IMG_PATH}/${Store.getState().store.id}`
      console.log(`GetUserIconImg Path: ${path}`)
      API.get(API_GATEWAY.NAME, path, option)
        .then(res => {
          console.log(res)
          resolve(res.user_icon_img)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
  componentDidMount() {
    console.log(this.getUniqueId())
  }
  render() {
    const { classes } = this.props
    return (
      <Container>
        <h2>作品を投稿</h2>
        <Grid container justify='center'>
          <Grid sm={11} item>
            <Paper>
              <Box mt={3}></Box>
              <Grid container >
                <Grid item sm={8}>
                  <h3 className={classes.subTitle}>自分の作品を投稿する</h3>
                </Grid>
              </Grid>
              <hr></hr>
              <Box mt={2}></Box>
              <Grid container>
                <Grid item sm={3}>
                  <h4 className={classes.label}>投稿のタイトル</h4>
                </Grid>
                <Grid item sm={8}>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    label="投稿タイトル"
                    variant="outlined"
                    value={this.state.title}
                    onChange={this.handleTitleInput}
                  />
                </Grid>
              </Grid>
              <Box mt={2}></Box>
              <Grid container>
                <Grid item sm={3}>
                  <h4 className={classes.label}>作品の説明</h4>
                </Grid>
                <Grid sm={8}>
                  <TextField
                    required
                    fullWidth
                    label="作品の説明"
                    multiline
                    rows="10"
                    variant="outlined"
                    margin="normal"
                    value={this.state.description}
                    onChange={this.handleDescriptionInput}
                  />
                </Grid>
              </Grid>
              <Box mt={2}></Box>
              <Grid container>
                <Grid item sm={3}>
                  <h4 className={classes.label}>ファイル添付</h4>
                </Grid>
                <Grid item sm={6}>
                  <TextField required disabled fullWidth margin="normal" label="添付ファイル" variant="outlined" value={this.state.fileName} />
                </Grid>
                <Grid container justify='center' xs={3}>
                  <Grid item className={classes.buttonWrapper}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      startIcon={<AttachFileIcon />}
                      onClick={this.clickFileUploadBtn}
                    >ファイル添付
                    <input
                        id="file-input"
                        type="file"
                        value=""
                        style={{ display: "none" }}
                        onChange={this.fileHandler}
                      // onClick={e => { e.persist(); e.target.value = '' }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={2}></Box>
              <Grid container justify='flex-end'>
                <Grid item sm={3}>
                  <Grid container justify='space-evenly'>
                    <Grid item>
                      <Button
                        variant="contained"
                        component={Link}
                        to='works-list'
                      >戻る</Button>
                    </Grid>
                    <Grid item>
                      {/* Todo 押下時にダイアログを表示、入力値バリデーション */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.openDialog}
                      >
                        <Create />投稿する
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Backdrop className={classes.backdrop} open={this.state.loading}>
                <CircularProgress color='inherit' />
              </Backdrop>
              <PostDialog
                isOpen={this.state.isOpen}
                handleClose={() => this.setState({ isOpen: false })}
                execute={this.postWork}
              />
              <div className={classes.spacer}></div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(PostWork)