<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in store.projects" :key="index">
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.tasks.length }}</td>
          <td><progress class="progress progress-primary w-56" value="10" max="100"></progress></td>
        </tr>
      </tbody>
    </table>
    <InputModal
      :is-open="isOpen"
      @on-sumit="store.addNewProject"
      v-on:on-close="isOpen = false"
      subtitle="Ingrese el nombre del proyecto"
    />

    <CustomModal :is-open="isShow">
      <template #header>
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
      </template>
      <template #body>
        <p class="py-4">Click the button below to close</p>
      </template>
      <template #acctions>
        <div class="modal-action">
          <form method="dialog">
            <button type="button" class="btn" @click="isShow = false">Close</button>
          </form>
        </div>
      </template>
    </CustomModal>

    <FabButton @click="isOpen = true">
      <AddCircle />
    </FabButton>
    <FabButton position="bottom-left" @click="isShow = true">
      <AddSquare />
    </FabButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import AddSquare from '@/modules/common/icons/AddSquare.vue';
import { useProjectsStore } from '../store/projects.store';

const store = useProjectsStore();
const isOpen = ref(false);
const isShow = ref(false);
</script>
