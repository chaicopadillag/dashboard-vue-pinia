import FabButton from '@/modules/common/components/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('<FabButton/>', () => {
  it('should render FabButton', async () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.props()).toEqual({
      position: 'bottom-right',
    });
    expect(wrapper.find('button').classes()).includes('bottom-right');
  });

  it('should render FabButton with custom position', async () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'bottom-left',
      },
    });
    expect(wrapper.props()).toEqual({
      position: 'bottom-left',
    });
    expect(wrapper.find('button').classes()).includes('bottom-left');
  });

  it('should emit click event', async () => {
    const wrapper = shallowMount(FabButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
