const { authRoutes } = require('../modules/auth/auth.routes')
const { Router } = require('express')
const router = Router()

const routes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/tasks',
        route: taskRoutes,
        middleware: [AuthGuard],
    },
]

routes.forEach((route) => {
    router.use(route.path, route.middleware, route.route)
})

module.exports = {
    routes,
}
