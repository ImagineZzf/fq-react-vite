import userStore from '@/store/user'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import style from './index.module.less'

export default () => {

  const { count } = userStore

  useEffect(() => {
    console.log(11111111)
  }, [])
  
  return (
    <div>
      <Button type="primary" onClick={() => userStore.count++}>按钮</Button>
      <p className={[style.p, style.test]}>{count}</p>
    </div>
  )
}
