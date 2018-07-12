import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/pages/Home')
const Create = () => import('@/pages/Create')

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
        }
      ]
    }
  ]
})
