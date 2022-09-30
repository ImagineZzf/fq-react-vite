import { ReactElement } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import loadable from '@loadable/component'

// 懒加载页面组件
const loadView = (view: string): ReactElement => {
  const PageComponent = loadable(() => import(`../pages/${view}`))
  return <PageComponent />
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: loadView('Index')
  },
  {
    path: '/test',
    element: loadView('Test') // 测试用的页面
  }
]

export default () => useRoutes(routes)
