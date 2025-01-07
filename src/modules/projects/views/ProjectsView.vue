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
        <!-- row 1 -->
        <tr>
          <th>1</th>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr>
      </tbody>
    </table>
    <InputModal
      :is-open="isOpen"
      @on-sumit="onAddProject"
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

const isOpen = ref(false);
const isShow = ref(false);

const onAddProject = (value: string) => {
  console.log({ value });
};
</script>
