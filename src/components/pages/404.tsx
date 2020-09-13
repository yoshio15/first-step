
import React from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import { Button, Grid, Container, Box, Card, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotFoundImg from '../../static/not_found.png'

const useStyle = makeStyles(theme => ({}))

const NotFound: React.FC = () => {
  const classes = useStyle()
  const history = useHistory()
  const goToWorksListPage = () => history.push('/works-list')
  return (
    <Container>
      <Box mt={5}></Box>
      <Grid container justify='center'>
        <Grid sm={9} item>
          <Card variant='outlined'>
            <CardContent>
              <Grid container justify='center'>
                <Grid item>
                  <img
                    src={NotFoundImg}
                    alt='NotFound'
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container justify='center'>
                <Grid item>
                  <Button
                    size='large'
                    variant='outlined'
                    color='primary'
                    onClick={() => goToWorksListPage()}
                  >作品一覧画面に戻る</Button>
                  <Box mt={4}></Box>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withRouter(NotFound);
