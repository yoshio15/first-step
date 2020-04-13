import React from 'react'
import * as H from 'history'
import { Container, Grid, Box, Typography, Card, CardContent, ButtonBase, createStyles } from '@material-ui/core'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import { API } from 'aws-amplify'
import Store from '../../store/index'
import { PATHS, API_GATEWAY } from '../../constants/config'

const styles = (): StyleRules => createStyles({
  workCard: {
    cursor: 'pointer'
  }
})
// Stateとして保持するリストのインターフェース
interface ResponseListI {
  workId: string,
  title: string,
  description: string,
  userId: string,
  userName: string,
  postedAt: string
}
// DBから取得するリストのインターフェース
interface ResponseI {
  work_id: string,
  title: string,
  description: string,
  user_id: string,
  user_name: string,
  posted_at: number
}
interface StateI {
  itemList: ResponseListI[]
}
interface PropsI extends WithStyles<typeof styles> {
  history: H.History
}
class WorksList extends React.Component<PropsI, StateI> {
  constructor(props: PropsI) {
    super(props)
  }
  state: StateI = {
    itemList: []
  }
  componentDidMount() {
    this.getItemList()
  }
  async getItemList() {
    const apiName = API_GATEWAY.NAME;
    const path = PATHS.GET.WORKS_LIST_PATH;
    const option = {}
    let responseList!: ResponseListI[];
    await API.get(apiName, path, option)
      .then(response => {
        console.log(response)
        responseList = this.formatResponse(response)
        console.log(responseList)
      }).catch(error => {
        console.log(error)
      });
    this.setState({ itemList: responseList })
  }
  formatResponse(res: any): ResponseListI[] {
    return res.map((item: ResponseI) => {
      return {
        workId: item.work_id,
        title: item.title,
        description: item.description,
        userId: item.user_id,
        userName: item.user_name,
        postedAt: (new Date(item.posted_at * 1000)).toLocaleDateString()
      }
    })
  }
  goToDescriptionPage(workId: string) {
    // Todo: SignUpを参考にページ遷移処理を追加
    console.log('goToDescriptionPage ID: ' + workId)
    this.props.history.push(`/work-description/${workId}`)
  }

  render() {
    console.log(Store.getState().store)
    const {classes} = this.props
    return (
      <Container>
        <h2>みんなの作品一覧</h2>
        {this.state.itemList.map(item => (
          <Grid container justify='center'>
            {/* <ButtonBase> */}
              <Grid xs={7} item>
                <Card key={item.workId} className={classes.workCard} variant='outlined' onClick={ () => this.goToDescriptionPage(item.workId)}>
                  <CardContent>
                    <Typography variant='h6'>{item.title}</Typography>
                    {/* <div>{item.description}</div> */}
                    <Grid container>
                      <Grid xs={3} item>
                        <Typography variant='body2' color='textSecondary'>投稿者：{item.userName}</Typography>
                      </Grid>
                      <Grid xs={3} item>
                        <Typography variant='body2' color='textSecondary'>投稿日時：{item.postedAt}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Box mb={1}></Box>
              </Grid>
            {/* </ButtonBase> */}
          </Grid>
        ))}
      </Container>
    )
  }
}

export default withStyles(styles)(WorksList)