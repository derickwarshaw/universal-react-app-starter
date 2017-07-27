import { Home, About, NotFound } from '../pages';

export const routes =  [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  {
    component: NotFound,
  }
];

export const redirects = [
  {
    from: '/home',
    to: '/',
    status: 301
  }
];
