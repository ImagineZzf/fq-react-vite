import { Button } from 'antd'
import style from './index.module.less'
import { useMount, useReactive } from 'ahooks'

export default () => {

  const state = useReactive({
    page: 0
  })

  useMount(() => {
    console.log(11111111)
  })
  
  return (
    <>
      <Button type="primary" onClick={() => state.page++}>按钮1</Button>
      <p className={[style.p, style.test]}>{state.page}</p>
    </>
  )
}
