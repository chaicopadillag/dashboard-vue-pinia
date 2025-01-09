import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { computed, ref } from 'vue';
import type { ProjectType } from '../interfaces/projects.interface';

export const useProjectsStore = defineStore('projectsStore', () => {
  const projectList = ref(useLocalStorage<ProjectType[]>('projects', []));

  const projects = computed(() => projectList.value);
  const noProjects = computed(() => projectList.value.length === 0);
  const findProjectById = (id: string) => projects.value.find((project) => project.id === id);

  const addNewProject = (name: string) => {
    projectList.value.push({
      id: uuid(),
      name,
      tasks: [],
    });
  };

  const addNewTask = (projectId: string, taskName: string) => {
    const project = projectList.value.find((project) => project.id === projectId);
    if (project) {
      project.tasks.push({
        id: uuid(),
        name: taskName,
      });
    }
  };

  return {
    projects,
    noProjects,
    findProjectById,
    addNewProject,
    addNewTask,
  };
});
