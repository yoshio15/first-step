import React from 'react'
import { Link } from 'react-router-dom'
import * as H from 'history'
import { Container, Grid, Box, Typography, Card, CardContent, Button, createStyles, CircularProgress, LinearProgress, Fade } from '@material-ui/core'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import Store from '../../store/index'
import { PATHS } from '../../constants/config'
import API from '../../utils/api'

const styles = (): StyleRules => createStyles({
  workCard: {
    cursor: 'pointer'
  },
  userIcon: {
    borderRadius: '50%',
  },
  userName: {
    position: 'relative',
    zIndex: 1
  }
})
// Stateとして保持するリストのインターフェース
interface ResponseListI {
  workId: string,
  title: string,
  description: string,
  userId: string,
  userName: string,
  userIconImg: string,
  postedAt: string
}
// DBから取得するリストのインターフェース
interface ResponseI {
  work_id: string,
  title: string,
  description: string,
  user_id: string,
  user_name: string,
  user_icon_img: string,
  posted_at: number
}
interface StateI {
  loading: boolean,
  worksToDisplay: number,
  itemList: ResponseListI[]
}
interface PropsI extends WithStyles<typeof styles> {
  history: H.History
}
class WorksList extends React.Component<PropsI, StateI> {
  constructor(props: PropsI) {
    super(props)
  }
  private INITIAL_WORKS_TO_DISPLAY = 5
  private ADDITIONAL_WORKS_TO_DISPLAY = 5
  state: StateI = {
    loading: false,
    worksToDisplay: this.INITIAL_WORKS_TO_DISPLAY,
    itemList: []
  }
  componentDidMount() {
    this.getItemList()
  }
  async getItemList() {
    this.setState({ loading: true })
    const response = await API.API_GATEWAY.get(PATHS.GET.WORKS_LIST_PATH)
    const itemList = this.formatResponse(response)
    this.setState({ itemList, loading: false })
  }
  formatResponse(res: any): ResponseListI[] {
    return res.map((item: ResponseI) => {
      return {
        workId: item.work_id,
        title: item.title,
        description: item.description,
        userId: item.user_id,
        userName: item.user_name,
        userIconImg: item.user_icon_img,
        postedAt: (new Date(item.posted_at * 1000)).toLocaleDateString()
      }
    })
  }
  goToDescriptionPage(workId: string, userId: string) {
    this.props.history.push(`/work-description/${workId}/${userId}`)
  }
  countUpWorksToDisplay() {
    this.setState({ worksToDisplay: this.state.worksToDisplay + this.ADDITIONAL_WORKS_TO_DISPLAY })
  }

  render() {
    console.log(Store.getState().store)
    const { classes } = this.props
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={9}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              <Fade in={this.state.loading} unmountOnExit>
                <LinearProgress />
              </Fade>
              <CardContent>
                <Box mt={3}></Box>
                <Fade in={this.state.loading} unmountOnExit>
                  <Grid container justify='center'>
                    <Grid xs={1} item>
                      <CircularProgress />
                    </Grid>
                  </Grid>
                </Fade>
                {this.state.itemList.slice(0, this.state.worksToDisplay).map(item => (
                  <Grid justify='center'>
                    <Grid xs={12} item>
                      <Card key={item.workId} className={classes.workCard} variant='outlined' onClick={() => this.goToDescriptionPage(item.workId, item.userId)}>
                        <CardContent>
                          <Grid container>
                            <Grid sm={2} item>
                              <img src={`${PATHS.ICONS_FOLDER_URL}/${item.userId}`} className={classes.userIcon} width='80' height='80' />
                            </Grid>
                            <Grid sm={10} item>
                              <Typography variant='h6'>{item.title}</Typography>
                              {/* Todo: ユーザプロフィールページへのリンクが効かない問題 */}
                              <Link to={`/mypage/${item.userId}`} className={classes.userName}>
                                <Typography variant='body2' color='textSecondary'>投稿者：{item.userName}</Typography>
                              </Link>
                              <Typography variant='body2' color='textSecondary'>投稿日時：{item.postedAt}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Box mb={1}></Box>
                    </Grid>
                  </Grid>
                ))}
                <Box mb={2}></Box>
                {this.state.itemList.length > this.state.worksToDisplay &&
                  <Button
                    variant='outlined'
                    fullWidth={true}
                    onClick={() => this.countUpWorksToDisplay()}
                  >もっと見る</Button>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(WorksList)