import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/vue/home'
import TopBackstageIndex from '../components/topBackstage/index'
import login from '../components/login/login'
import messageBoard from '../components/messageBoard/messageBoard'
import list from '../components/article/list/list'
import detail from '../components/article/detail/detail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/topBackstage/index',
      name: 'topBackstageIndex',
      component: TopBackstageIndex
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/messageBoard',
      name: 'messageBoard',
      component: messageBoard
    }, {
      path: '/list',
      name: 'list',
      component: list
    }, {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
