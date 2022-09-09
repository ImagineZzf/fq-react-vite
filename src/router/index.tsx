import { useRoutes, RouteObject } from "react-router-dom";
import Home from '@/pages/Index'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  }
]

export default useRoutes(routes)
