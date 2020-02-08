import React from 'react'
import {Box} from '@material-ui/core'
import TopImage from '../contents/TopImage'
import Characteristic from '../contents/Characteristic'

const Top: React.FC = () => {
  return (
    <div>
    <TopImage></TopImage>
    <Box mt={5}></Box>
    <Characteristic></Characteristic>
    </div>
  )
}

export default Top