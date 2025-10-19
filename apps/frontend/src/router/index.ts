import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModuleDetails from '@/views/ModuleDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create-module',
      name: 'create-module',
      // route level code-splitting
      // this generates a separate chunk (CreateModule.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateModule.vue'),
    },
    {
      path: '/modules/:id',
      name: 'module-detail',
      component: ModuleDetails,
    },
    {
      path: '/create-module',
      name: 'create-module',
      component: () => import('../views/CreateModule.vue'),
    },
  ],
})

export default router
