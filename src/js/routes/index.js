import { Home, About, NotFound } from '../pages';

export default {
    routes: [
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
    ],
    redirects: [
        {
            from: '/home',
            to: '/',
            status: 301
        }
    ]
}
