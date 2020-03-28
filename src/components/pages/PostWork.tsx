import React from 'react'
import { Link } from 'react-router-dom'
import { API } from 'aws-amplify'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Container, Paper, Grid, TextField, Button, Box, Icon } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Create from '@material-ui/icons/Create';
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
  }
})

interface Props extends WithStyles<typeof styles> { }
interface State {
  title: string,
  discription: string,
  fileName: string,
  file: File | undefined
}

class PostWork extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  state: State = {
    title: '',
    discription: '',
    fileName: '',
    file: undefined
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
  private handleDiscriptionInput = (e: any) => { this.setState({ discription: e.target.value }) }
  private postWork = () => {
    console.log(JSON.stringify(this.state))
    const request = {}
    API.post(API_GATEWAY.NAME, PATHS.POST.NEW_WORK_PATH, request)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
  }
  render() {
    const { classes } = this.props
    return (
      <Container>
        <h2>作品を投稿</h2>
        <Grid container justify='center'>
          <Grid sm={11} item>
            <Paper>
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
                    value={this.state.discription}
                    onChange={this.handleDiscriptionInput}
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
                        to='work-list'
                      >戻る</Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.postWork}
                      >
                        <Create />投稿する
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.spacer}></div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(PostWork)