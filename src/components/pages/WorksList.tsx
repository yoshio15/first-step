import React from 'react'
import Store from '../../store/index'

class WorksList extends React.Component {
  render() {
    console.log(Store.getState().store)
    return (
      <h2>みんなの作品一覧</h2>
    )
  }
}

export default WorksList