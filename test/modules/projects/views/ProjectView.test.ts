/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { mount } from '@vue/test-utils';
import type { Mock } from 'vitest';
import { useRouter } from 'vue-router';
import { fakeProjects } from '../../../mocks/projects-mock-data';

vi.mock('vue-router');
vi.mock('@/modules/projects/store/projects.store');

describe('<ProjectView/>', () => {
  it('should render component', () => {
    const projectView = fakeProjects[0];

    (useProjectsStore as any).mockReturnValue({
      findProjectById: () => projectView,
    });

    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.table').exists()).toBeTruthy();
    expect(wrapper.findAll('.table tbody tr.hover').length).toBe(projectView.tasks.length);
  });

  it('should redirect to / page if project not found', () => {
    (useProjectsStore as any).mockReturnValue({
      findProjectById: () => undefined,
    });

    const replaceSpy = vi.fn();
    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    });

    mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/');
  });
});
