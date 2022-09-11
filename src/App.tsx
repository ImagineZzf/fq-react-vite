import { BrowserRouter } from 'react-router-dom'
import CustomRouter from '@/router'

export default () => {
  return (
    <BrowserRouter>
      <CustomRouter />
    </BrowserRouter>
  )
}