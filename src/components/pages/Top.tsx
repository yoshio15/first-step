import React from 'react'
import { Box } from '@material-ui/core'
import TopImage from '../contents/TopImage'
import Characteristic from '../contents/Characteristic'
import Usage from '../contents/Usage'

const Top: React.FC = () => {
  return (
    <div>
      <TopImage></TopImage>
      <Box mt={5}></Box>
      <Characteristic></Characteristic>
      <Box mt={5}></Box>
      <Usage></Usage>
    </div>
  )
}

export default Top