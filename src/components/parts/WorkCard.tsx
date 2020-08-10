import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Typography, Card, CardContent, createStyles } from '@material-ui/core'
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { PATHS } from '../../constants/config'

export interface WorkItemI {
  workId: string;
  userId: string;
  title: string;
  userName: string;
  postedAt: string;
}
interface PropsI extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
  item: WorkItemI;
}
const styles = (): StyleRules => createStyles({
  workCard: {
    cursor: 'pointer'
  },
  userIcon: {
    borderRadius: '50%',
  },
  userIconArea: {
    marginRight: '10px'
  },
  textArea: {
    height: '100%'
  }
})
const filterTitleLength = (title: String) => {
  const MAX_TITLE_LENGTH = 32
  return title.length > MAX_TITLE_LENGTH ?
    title.slice(0, MAX_TITLE_LENGTH) + ' ...' : title
}
const WorkCard: React.FC<PropsI> = (props: PropsI) => {
  const { classes, item } = props
  const history = useHistory()
  const goToDescriptionPage = () => {
    console.log('goToDescriptionPage')
    history.push(`/work-description/${item.workId}/${item.userId}`)
  }
  return (
    <Card
      key={item.workId}
      className={classes.workCard}
      variant='outlined'
      onClick={() => goToDescriptionPage()}
    >
      <CardContent style={{paddingBottom: '16px'}}>
        <Grid container>
          <Grid className={classes.userIconArea} item>
            <img
              src={`${PATHS.ICONS_FOLDER_URL}/${item.userId}`}
              className={classes.userIcon} width='80' height='80'
            />
          </Grid>
          <Grid item>
            <Grid
              container
              direction='column'
              justify='space-evenly'
              className={classes.textArea}
            >
              <Typography variant='h6'>{filterTitleLength(item.title)}</Typography>
              <Typography variant='body2' color='textSecondary'>
                by {item.userName}, at {item.postedAt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(WorkCard)
