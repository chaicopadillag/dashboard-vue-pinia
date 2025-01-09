<template>
  <BreadCrumbs :title="project?.name ?? 'No Name'" />
</template>

<script lang="ts" setup>
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { ref, watch } from 'vue';
import type { ProjectType } from '../interfaces/projects.interface';
import { useProjectsStore } from '../store/projects.store';

const props = defineProps<{ id: string }>();
const project = ref<ProjectType | undefined>(undefined);
const store = useProjectsStore();

watch(
  () => props.id,
  (id) => {
    project.value = store.findProjectById(id);
  },
  {
    immediate: true,
  },
);
</script>
