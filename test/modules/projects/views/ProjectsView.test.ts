import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { fakeProjects, fakeProjectTaskMetrics } from '../../../mocks/projects-mock-data';

describe('<ProjectsView>', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.projectTaskMetrics = fakeProjectTaskMetrics;
    // store.$patch({ projectTaskMetrics: fakeProjects });
  });

  it('should render the component', () => {
    const tableRows = wrapper.findAll('tbody tr');

    expect(tableRows.length).toBe(fakeProjects.length);

    fakeProjectTaskMetrics.forEach((project, index) => {
      const row = tableRows[index];

      const cells = row.findAll('td');
      expect(cells.length).toBe(3);
      expect(cells[0].text()).toContain(project.name);
      expect(cells[1].text()).toContain(project.totalTasks);
      expect(cells[2].text()).toContain(project.completionRate);
      expect(cells[2].find('span').text()).toEqual(project.completionRate + '%');
    });
  });
});
