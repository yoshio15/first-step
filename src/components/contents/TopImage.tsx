import React from 'react';
import TopImg from '../../static/top.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  size: {
    width: '100%'
  }
})

const TopImage: React.FC = () => {
  const classes = useStyle()
  return (
    <div>
      <img src={TopImg} alt="Top Image" className={classes.size} />
    </div>
  )
}

export default TopImage