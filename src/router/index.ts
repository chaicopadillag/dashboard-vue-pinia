import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: ProjectsLayout,
      children: [
        {
          path: '',
          name: 'projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue'),
        },
        {
          path: 'projects/:id',
          props: true,
          name: 'project',
          component: () => import('@/modules/projects/views/ProjectView.vue'),
        },
      ],
    },
  ],
});

export default router;
