import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '@/components/Table'
import Editpost from '@/components/Editpost'


Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'Table',
        component: Table
      },
      {
        path: '/editpost/:postid',
        name: 'Editpost',
        component: Editpost
      }
    ]
  })

export default router

