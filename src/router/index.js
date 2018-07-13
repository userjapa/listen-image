import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/pages/Home')
const Create = () => import('@/pages/Create')
const Preview = () => import('@/pages/Preview')

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          name: 'Create',
          path: '',
          component: Create
        },
        {
          name: 'Preview',
          path: '/preview',
          component: Preview
        }
      ]
    }
  ]
})
