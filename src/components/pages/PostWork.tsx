import React from 'react'
import { Link } from 'react-router-dom'
import * as H from 'history'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Container, Card, CardContent, Grid, TextField, Button, Box, CircularProgress, Backdrop } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Create from '@material-ui/icons/Create';
import ConfirmDialog from '../parts/ConfirmDialog'
import Store from '../../store/index'
import { getUniqueId } from '../../utils/common'
import API from '../../utils/api'
import { PATHS, MESSAGES, DIALOG_MESSAGES, DIALOG_TITLE, DIALOG_EXEC_MSG } from '../../constants/config'

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
  backBtn: {
    marginRight: theme.spacing(2)
  },
  spacer: {
    width: '100%',
    height: '10px'
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
  loading: boolean,
  isValidatedTitle: boolean,
  titleErrorMsg: string,
  isValidatedDescription: boolean,
  descriptionErrorMsg: string,
  isValidatedFile: boolean,
  fileErrorMsg: string
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
    loading: false,
    isValidatedTitle: true,
    titleErrorMsg: '',
    isValidatedDescription: true,
    descriptionErrorMsg: '',
    isValidatedFile: true,
    fileErrorMsg: ''
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
    return {
      body: {
        workId,
        userId: Store.getState().store.id,
        userName: Store.getState().store.user,
        title: this.state.title,
        description: this.state.description,
      }
    }
  }
  private openDialog = () => this.setState({ isOpen: true })
  private isValidateInputs = () => {
    let isOkTitle;
    let isOkDescription;
    let isOkFile;
    if (this.state.title.length == 0 || this.state.title.length > 50) {
      this.setState((state, props) => ({
        isValidatedTitle: false,
        titleErrorMsg: MESSAGES.TITLE_IS_TOO_LONG
      }))
      isOkTitle = false
    } else {
      this.setState({ isValidatedTitle: true })
      isOkTitle = true
    }
    if (this.state.description.length == 0 || this.state.description.length > 400) {
      this.setState({
        isValidatedDescription: false,
        descriptionErrorMsg: MESSAGES.DESCRIPTION_IS_TOO_LONG
      })
      isOkDescription = false
    } else {
      this.setState({ isValidatedDescription: true })
      isOkDescription = true
    }
    if (this.state.fileName.split('.').pop() !== 'html') {
      this.setState({
        isValidatedFile: false,
        fileErrorMsg: MESSAGES.BAD_FILE_TYPE
      })
      isOkFile = false
    } else {
      this.setState({ isValidatedFile: true })
      isOkFile = true
    }
    return isOkTitle && isOkDescription && isOkFile;
  }
  private postWork = async () => {
    this.setState({ isOpen: false, loading: true })
    if (!this.isValidateInputs()) {
      this.setState({ loading: false })
      return
    }
    const workId = getUniqueId()
    const request = await this.generateRequest(workId)
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
    const option = { headers: { 'Content-Type': 'text/html' } }
    return API.S3.put(url, this.state.file, option)
  }
  private getPrisignedUrlForUploadToS3 = (workId: string) => {
    return API.API_GATEWAY.get(`${PATHS.GET.S3_PRESIGNED_URL_PATH}/${workId}`)
  }
  private postMetaInfoToDynamo = (request: any) => {
    return API.API_GATEWAY.post(PATHS.POST.NEW_WORK_PATH, request)
  }
  componentDidMount() { }
  render() {
    const { classes } = this.props
    return (
      <Container>
        <Box mt={5}></Box>
        <Grid container justify='center'>
          <Grid sm={9} item>
            <Card variant='outlined'>
              <CardContent>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="作品タイトル（50文字以内）"
                  variant="outlined"
                  value={this.state.title}
                  onChange={this.handleTitleInput}
                  error={!this.state.isValidatedTitle}
                  helperText={!this.state.isValidatedTitle ? this.state.titleErrorMsg : ''}
                />
                <Box mt={2}></Box>
                <TextField
                  required
                  fullWidth
                  label="作品の説明（400文字以内）"
                  multiline
                  rows="10"
                  variant="outlined"
                  margin="normal"
                  value={this.state.description}
                  onChange={this.handleDescriptionInput}
                  error={!this.state.isValidatedDescription}
                  helperText={!this.state.isValidatedDescription ? this.state.descriptionErrorMsg : ''}
                />
                <Box mt={2}></Box>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                >
                  <Grid md={9} item>
                    <TextField
                      required
                      disabled
                      fullWidth
                      margin="normal"
                      label="HTMLファイル（.html）"
                      variant="outlined"
                      value={this.state.fileName}
                      error={!this.state.isValidatedFile}
                      helperText={!this.state.isValidatedFile ? this.state.fileErrorMsg : ''}
                    />
                  </Grid>
                  <Grid md={2} item>
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
                      />
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={2}></Box>
                <Grid
                  container
                  direction='row'
                  justify='flex-end'
                >
                  <Button
                    className={classes.backBtn}
                    variant="contained"
                    component={Link}
                    to='works-list'
                  >戻る</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.openDialog}
                  ><Create />投稿する</Button>
                </Grid>
                <Backdrop className={classes.backdrop} open={this.state.loading}>
                  <CircularProgress color='inherit' />
                </Backdrop>
                <ConfirmDialog
                  isOpen={this.state.isOpen}
                  handleClose={() => this.setState({ isOpen: false })}
                  execute={this.postWork}
                  title={DIALOG_TITLE.POST_WORK}
                  message={DIALOG_MESSAGES.POST_WORK}
                  execMsg={DIALOG_EXEC_MSG.POST_WORK}
                />
                <div className={classes.spacer}></div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(PostWork)
