import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { computed, ref } from 'vue';
import type { ProjectType } from '../interfaces/projects.interface';

export const useProjectsStore = defineStore('projectsStore', () => {
  const projects = ref(useLocalStorage<ProjectType[]>('projects', []));

  const addNewProject = (name: string) => {
    projects.value.push({
      id: uuid(),
      name,
      tasks: [],
    });
  };

  return {
    projects: computed(() => projects.value),
    noProjects: computed(() => projects.value.length === 0),
    addNewProject,
  };
});
