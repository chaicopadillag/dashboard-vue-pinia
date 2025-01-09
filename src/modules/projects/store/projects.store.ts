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

  const projectTaskMetrics = computed(() =>
    projects.value.map((project) => {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter((task) => task.completedAt).length;
      const completionRate = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
      return {
        id: project.id,
        name: project.name,
        completedTasks,
        totalTasks,
        completionRate: Math.round(completionRate),
      };
    }),
  );

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

  const toggleCompletedTask = (projectId: string, taskId: string) => {
    const project = projectList.value.find((project) => project.id === projectId);
    if (project) {
      const task = project.tasks.find((task) => task.id === taskId);
      if (task) {
        task['completedAt'] = task['completedAt'] ? undefined : new Date();
      }
    }
  };

  return {
    projects,
    projectTaskMetrics,
    noProjects,
    findProjectById,
    addNewProject,
    addNewTask,
    toggleCompletedTask,
  };
});
