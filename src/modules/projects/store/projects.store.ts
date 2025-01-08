import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { computed, ref } from 'vue';
import type { ProjectType } from '../types/projects.interface';

export const useProjectsStore = defineStore('projectsStore', () => {
  const projects = ref<ProjectType[]>([
    {
      id: uuid(),
      name: 'Project 1',
      description: 'Description for project 1',
      tasks: [
        {
          id: uuid(),
          name: 'Task 1',
          description: 'Description for task 1',
          completedAt: new Date(),
        },
        {
          id: uuid(),
          name: 'Task 2',
          description: 'Description for task 2',
        },
      ],
    },
    {
      id: uuid(),
      name: 'Project 2',
      description: 'Description for project 2',
      tasks: [
        {
          id: uuid(),
          name: 'Task 1',
          description: 'Description for task 1',
        },
        {
          id: uuid(),
          name: 'Task 2',
          description: 'Description for task 2',
        },
      ],
    },
  ]);

  const addNewProject = (name: string) => {
    projects.value.push({
      id: uuid(),
      name,
      tasks: [],
    });
  };

  return {
    projects: computed(() => projects.value),
    addNewProject,
  };
});
