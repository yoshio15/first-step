import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button} from '@material-ui/core'

interface PropsI {
  children?: React.ReactNode;
  userId: string;
}
const EditProfileButton: React.FC<PropsI> = (props: PropsI) => {
  const { userId } = props
  const history = useHistory()
  const goToEditPage = () => history.push(`/mypage/edit/${userId}`)
  return (
    <Button
      size='small'
      variant='outlined'
      onClick={() => goToEditPage()}
    >プロフィールを編集する</Button>
  )
}

export default EditProfileButton