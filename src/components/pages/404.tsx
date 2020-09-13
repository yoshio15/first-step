
import React from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import { Button, Grid, Container, Box, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotFoundImg from '../../static/not_found.png'

const useStyle = makeStyles(theme => ({}))

const NotFound: React.FC = () => {
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
                  // width='170px'
                  // height='50px'
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => goToWorksListPage()}
              >作品一覧画面へ</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default withRouter(NotFound);
