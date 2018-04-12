import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '@/components/Table'
import Editpost from '@/components/Editpost'
import fullCalendar from '@/components/todo'
import editor from '@/components/EditorMd'


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
      },
      {
        path: '/fullCalendar',
        name: 'fullCalendar',
        component: fullCalendar
      },
      {
        path: '/editor',
        name: 'editor',
        component: editor
      }
    ]
  })

export default router

