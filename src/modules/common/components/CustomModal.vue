<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  ></div>

  <dialog class="modal" :open="isOpen">
    <div class="modal-box w-11/12 max-w-5xl">
      <div>
        <slot name="header" />
      </div>

      <div>
        <slot name="body" />
      </div>

      <div>
        <slot name="acctions" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ isOpen?: boolean }>(), {
  isOpen: false,
});
</script>
