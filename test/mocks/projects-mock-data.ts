import type { ProjectType } from '@/modules/projects/interfaces/projects.interface';

export const fakeProjects: ProjectType[] = [
  {
    id: '8cf42a93-67bc-4385-b343-18068cd5994a',
    name: 'Aprender Vue 3',
    tasks: [
      {
        id: '5fccd442-f0a8-4746-9bed-ff958679db7b',
        name: 'Instalar Vue 3',
        completedAt: new Date(),
      },
      {
        id: 'e5ea4355-cd2b-4d5c-8e95-6fd9f6ce4366',
        name: 'Aprender Vue Router',
      },
      {
        id: '1f44754b-bb96-4522-bbec-30a0921d7c9a',
        name: 'Aprender Vuex',
      },
    ],
  },
  {
    id: 'bbe2d55e-ccf5-44ae-b230-7b82e2bf5c4c',
    name: 'Aprender Tailwind CSS',
    tasks: [
      {
        id: 'be9b691d-28c5-4040-bff4-3272cc75198d',
        name: 'Instalar Tailwind CSS',
      },
      {
        id: '191091ca-3593-4a25-92f6-a9553529504d',
        name: 'Aprender Tailwind JIT',
      },
    ],
  },
  {
    id: 'e0d42f1a-f1d1-4e7a-868d-3e204c4faa4e',
    name: 'Aprender Vite',
    tasks: [
      {
        id: 'b54013ee-dfdf-4b82-9d02-3141d67ae288',
        name: 'Instalar Vite',
      },
      {
        id: '241e77c9-dce0-48e4-8679-19e4ab4e80c4',
        name: 'Aprender Vite 2',
      },
    ],
  },
];
