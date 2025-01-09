<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Projects</h2>
    <p v-if="store.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>
    <ul v-else class="menu">
      <template v-for="projec in store.projects">
        <li v-if="projec.tasks.length > 0" :key="projec.id">
          <details open>
            <summary>
              <RouterLink :to="`/projects/${projec.id}`">
                {{ projec.name }}
              </RouterLink>
            </summary>
            <ul>
              <li v-for="task in projec.tasks" :key="task.id">
                <RouterLink :to="`/projects/${projec.id}`">
                  {{ task.name }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
        <li v-else :key="`${projec.id}`">
          <RouterLink :to="`/projects/${projec.id}`">
            {{ projec.name }}
          </RouterLink>
        </li>
      </template>
    </ul>
  </aside>
</template>
<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';

const store = useProjectsStore();
</script>
