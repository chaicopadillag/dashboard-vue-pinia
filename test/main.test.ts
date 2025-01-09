/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

vi.mock('@/router', () => ({
  default: 'router',
}));

vi.mock('pinia', async (pinia) => {
  const mockPinia: any = await pinia();
  return {
    ...mockPinia,
    createPinia: vi.fn(() => 'pinia'),
  };
});

describe('test main.ts', () => {
  const vue = require('vue');

  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createAppSpy = vi.fn(() => ({
    use: useSpy,
    mount: mountSpy,
  }));

  vue.createApp = createAppSpy;

  it('Main mount app', async () => {
    await import('../src/main');

    expect(createAppSpy).toHaveBeenCalled();
    expect(useSpy).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');
    expect(useSpy).toHaveBeenCalledWith('router');
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
