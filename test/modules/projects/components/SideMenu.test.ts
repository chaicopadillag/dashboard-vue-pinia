import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { fakeProjects } from '../../../mocks/projects-mock-data';

describe('<SideMenu/>', () => {
  let wrapper: any;
  let store: any;
  beforeEach(() => {
    wrapper = mount(SideMenu, {
      global: {
        stubs: ['RouterLink'],
        plugins: [
          createTestingPinia({
            initialState: {
              projects: [],
            },
          }),
        ],
      },
    });

    store = useProjectsStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the component', () => {
    expect(wrapper.find('aside').exists()).toBeTruthy();
    expect(wrapper.html()).toContain('No hay proyectos');
    expect(wrapper.find('.menu').exists()).toBeFalsy();
  });

  it('should render the component with projects in sidemenu', async () => {
    store.projects = fakeProjects;
    store.noProjects = false;
    // store.$patch({ projects: fakeProjects, noProjects: false });
    console.log(store.projects);

    await nextTick();
    // await wrapper.vm.$nextTick();

    expect(wrapper.html()).not.toContain('No hay proyectos');
    expect(wrapper.find('.menu').exists()).toBeTruthy();
    fakeProjects.forEach((project) => {
      expect(wrapper.html()).toContain(project.id);
    });
  });
});
