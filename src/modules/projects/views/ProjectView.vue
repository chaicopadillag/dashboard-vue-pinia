<template>
  <div class="w-full">
    <section>
      <BreadCrumbs :title="project?.name ?? 'No Name'" />
    </section>
    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Completada</th>
              <th>Tarea</th>
              <th>Completa en</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="task in project?.tasks" :key="task.id">
              <th></th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr>
              <th></th>
              <td>
                <input
                  type="text"
                  placeholder="Nueva tarea"
                  class="input input-bordered w-full hover:input-primary focus:input-primary"
                  v-model="inputTask"
                  @keypress.enter="addNewTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { ProjectType } from '../interfaces/projects.interface';
import { useProjectsStore } from '../store/projects.store';

const router = useRouter();
const props = defineProps<{ id: string }>();
const project = ref<ProjectType | undefined>(undefined);
const store = useProjectsStore();
const inputTask = ref('');

watch(
  () => props.id,
  (id) => {
    project.value = store.findProjectById(id);
    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);

const addNewTask = () => {
  const task = inputTask.value.trim();
  if (!task) {
    return;
  }
  store.addNewTask(props.id, task);
  inputTask.value = '';
};
</script>
