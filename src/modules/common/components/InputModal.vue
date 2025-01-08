<template>
  <!-- modal background -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  ></div>

  <dialog class="modal modal-bottom sm:modal-middle" :open="isOpen">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-if="subtitle" class="py-4">{{ subtitle }}</p>
      <form method="dialog" @submit.prevent="handleSubmit">
        <div>
          <input
            ref="inputRef"
            type="text"
            class="input input-bordered w-full"
            :placeholder="placeholder"
            v-model="input"
          />
        </div>

        <div class="modal-action">
          <!-- <div> -->
          <button type="button" @click="onClose" class="btn">Close</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
          <!-- </div> -->
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

type Props = {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  placeholder?: string;
};

const input = ref('');
const inputRef = ref<HTMLInputElement>();

const props = withDefaults(defineProps<Props>(), {
  title: 'Nuevo Proyecto',
  placeholder: 'Nombre del proyecto',
});

watch(props, ({ isOpen }) => {
  if (isOpen) {
    inputRef.value?.focus();
  }
});

const emits = defineEmits<{
  onSumit: [string];
  onClose: [void];
}>();

const handleSubmit = () => {
  const value = input.value.trim();

  if (!value) {
    inputRef.value?.focus();
    return;
  }

  emits('onSumit', value);
  emits('onClose');
  input.value = '';
};

const onClose = () => {
  emits('onClose');
  input.value = '';
};
</script>
