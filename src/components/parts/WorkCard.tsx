import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Typography, Card, CardContent, createStyles } from '@material-ui/core'
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { PATHS } from '../../constants/config'

interface WorkItemI {
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
  // userName: {
  //   position: 'relative',
  //   zIndex: 1
  // }
})
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
      <CardContent>
        <Grid container>
          <Grid sm={2} item>
            <img
              src={`${PATHS.ICONS_FOLDER_URL}/${item.userId}`}
              className={classes.userIcon} width='80' height='80'
            />
          </Grid>
          <Grid sm={10} item>
            <Typography variant='h6'>{item.title}</Typography>
            {/* Todo: ユーザプロフィールページへのリンクが効かない問題 */}
            <Link to={`/mypage/${item.userId}`} className={classes.userName}>
              <Typography variant='body2' color='textSecondary'>
                投稿者：{item.userName}
              </Typography>
            </Link>
            <Typography variant='body2' color='textSecondary'>
              投稿日時：{item.postedAt}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(WorkCard)