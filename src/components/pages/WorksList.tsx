import React from 'react'
import { Container, Paper, Grid, Box } from '@material-ui/core'
import Store from '../../store/index'

class WorksList extends React.Component {
  getItemList() {
    return [
      { id: '01', name: 'taro', msg: 'HelloWorld' },
      { id: '02', name: 'jiro', msg: 'HelloWorld' },
      { id: '03', name: 'saburo', msg: 'HelloWorld' },
      { id: '04', name: 'yonro', msg: 'HelloWorld' },
      { id: '05', name: 'goro', msg: 'HelloWorld' }
    ]
  }
  render() {
    console.log(Store.getState().store)
    return (
      <Container>
        <h2>みんなの作品一覧</h2>
        {this.getItemList().map(item => (
          <Grid container justify='center'>
            <Grid xs={6} item>
              <Paper key={item.id}>{item.name}</Paper>
              <Box mb={2}></Box>
            </Grid>
          </Grid>
        ))}
      </Container>
    )
  }
}

export default WorksList