import {createRouter, createWebHashHistory} from 'vue-router'

export default createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'Index',
            component: ()=>import('../view/index')
        },
        {
            path: '/help',
            name: 'Help',
            component: ()=>import('../view/helper')
        }
    ]
})
