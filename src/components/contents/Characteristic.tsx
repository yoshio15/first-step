import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  layout: {
    textAlign: "center"
  }
})

const Characteristic: React.FC = () => {
  const classes = useStyle()
  return (
    <Container>
      <Typography variant="h5" className={classes.layout}>プログラミング初学者向けポートフォリオ公開プラットフォーム</Typography>
      <Box my={2}></Box>
      <Typography variant="h4" className={classes.layout}>『First-Step』</Typography>
      <Box my={3}></Box>
      <Typography variant ="subtitle1" className={classes.layout}>First-Stepはあなたの作成したWebページを全世界に公開するサービスです。</Typography>
      <Typography variant ="subtitle1" className={classes.layout}>初めてコーディングしたHTML/CSSを公開して多くの人にみてもらいましょう。</Typography>
    </Container>
  )
}

export default Characteristic