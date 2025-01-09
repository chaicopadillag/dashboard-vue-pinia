import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { fakeProjects } from '../../../mocks/projects-mock-data';

describe('projects.store.ts', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('should return deafult projects state with pinia', () => {
    const {
      noProjects,
      projects,
      projectTaskMetrics,
      addNewProject,
      addNewTask,
      findProjectById,
      toggleCompletedTask,
    } = useProjectsStore();

    expect(noProjects).toBeTruthy();
    expect(projects).toHaveLength(0);
    expect(projectTaskMetrics).toHaveLength(0);
    expect(addNewProject).toBeInstanceOf(Function);
    expect(addNewTask).toBeInstanceOf(Function);
    expect(findProjectById).toBeInstanceOf(Function);
    expect(toggleCompletedTask).toBeInstanceOf(Function);
  });

  it('should add new project', () => {
    const store = useProjectsStore();
    store.addNewProject('New Project');
    expect(store.projects).toHaveLength(1);
    expect(store.projects.at(0)?.name).toBe('New Project');
    expect(store.projects.at(0)).toEqual({
      id: expect.any(String),
      name: 'New Project',
      tasks: [],
    });
  });

  it('should load state from local storage', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const store = useProjectsStore();
    expect(store.projects).toHaveLength(3);
    expect(store.projects.at(0)).toEqual({
      id: fakeProjects[0].id,
      name: fakeProjects[0].name,
      tasks: expect.any(Array),
    });
  });

  it('should find project by id', () => {
    const store = useProjectsStore();
    store.addNewProject('New Project');
    const project = store.findProjectById(store.projects.at(0)!.id);

    expect(project).toEqual({
      id: store.projects.at(0)!.id,
      name: store.projects.at(0)!.name,
      tasks: [],
    });
  });

  it('should add new task to project', () => {
    const store = useProjectsStore();
    store.addNewProject('New Project');
    store.addNewTask(store.projects.at(0)!.id, 'New Task');

    expect(store.projects.at(0)?.tasks).toHaveLength(1);
    expect(store.projects.at(0)?.tasks.at(0)).toEqual({
      id: expect.any(String),
      name: 'New Task',
    });
  });

  it('should toggle completed task', () => {
    const store = useProjectsStore();
    store.addNewProject('New Project');
    store.addNewTask(store.projects.at(0)!.id, 'New Task');
    store.toggleCompletedTask(store.projects.at(0)!.id, store.projects.at(0)!.tasks.at(0)!.id);

    expect(store.projects.at(0)?.tasks.at(0)?.completedAt).toBeTruthy();
  });
});
