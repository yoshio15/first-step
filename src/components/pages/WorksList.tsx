import React from 'react'
import * as H from 'history'
import { Container, Grid, Box, Card, CardContent, Button, createStyles } from '@material-ui/core'
import withStyles, { WithStyles, StyleRules } from "@material-ui/core/styles/withStyles";
import Store from '../../store/index'
import { PATHS } from '../../constants/config'
import API from '../../utils/api'
import { formatResponseForWorks } from '../../utils/formatter'
import LoadingArea from '../parts/LoadingArea'
import WorkCard from '../parts/WorkCard'

const styles = (): StyleRules => createStyles({})
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
    const itemList = formatResponseForWorks(response)
    this.setState({ itemList, loading: false })
  }
  countUpWorksToDisplay() {
    this.setState({ worksToDisplay: this.state.worksToDisplay + this.ADDITIONAL_WORKS_TO_DISPLAY })
  }

  render() {
    console.log(Store.getState().store)
    return (
      <Container>
        <Grid container justify='center'>
          <Grid item sm={9}>
            <Box mt={5}></Box>
            <Card variant='outlined'>
              {this.state.loading && <LoadingArea />}
              <CardContent>
                <Box mt={3}></Box>
                {this.state.itemList.slice(0, this.state.worksToDisplay).map(item => (
                  <Grid justify='center'>
                    <Grid xs={12} item>
                      <WorkCard item={item} />
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