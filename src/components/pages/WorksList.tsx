import React from 'react'
import { Container, Paper, Grid, Box } from '@material-ui/core'
import { API } from 'aws-amplify'
import Store from '../../store/index'
import { PATHS, API_GATEWAY } from '../../constants/config'

interface ResponseListI {
  workId: string,
  title: string,
  description: string,
  userId: string,
  userName: string
}
interface ResponseI {
  work_id: string,
  title: string,
  description: string,
  user_id: string,
  user_name: string
}
interface StateI {
  itemList: ResponseListI[]
}
class WorksList extends React.Component {
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
        userName: item.user_name
      }
    })
  }
  render() {
    console.log(Store.getState().store)
    return (
      <Container>
        <h2>みんなの作品一覧</h2>
        {this.state.itemList.map(item => (
          <Grid container justify='center'>
            <Grid xs={11} item>
              <Paper key={item.workId}>
                <h3>{item.title}</h3>
                <div>{item.description}</div>
                <div>{item.userName}</div>
              </Paper>
              <Box mb={1}></Box>
            </Grid>
          </Grid>
        ))}
      </Container>
    )
  }
}

export default WorksList