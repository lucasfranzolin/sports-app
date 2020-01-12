/** @format */

import NotFound from './pages/NotFound'
import Users from './pages/Users'
import UsersNew from './pages/Users/New'

const routes = [
  {
    path: '/notfound',
    component: NotFound,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/users/new',
    component: UsersNew,
  },
]

export default routes
