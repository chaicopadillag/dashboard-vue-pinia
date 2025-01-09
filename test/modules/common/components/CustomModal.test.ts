import CustomModal from '@/modules/common/components/CustomModal.vue';
import { mount } from '@vue/test-utils';

describe('<CustomModal/>', () => {
  it('should render default component with slots sections', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<div class="header">Header Content</div>',
        body: '<div class="body">Body Content</div>',
        acctions: '<div class="footer">Footer Content</div>',
      },
    });
    expect(wrapper.find('.modal').exists()).toBeTruthy();
    expect(wrapper.find('.modal-box').exists()).toBeTruthy();
    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
    expect(wrapper.find('.header').exists()).toBeTruthy();
    expect(wrapper.find('.header').text()).toBe('Header Content');
    expect(wrapper.find('.body').exists()).toBeTruthy();
    expect(wrapper.find('.body').text()).toBe('Body Content');
    expect(wrapper.find('.footer').exists()).toBeTruthy();
    expect(wrapper.find('.footer').text()).toBe('Footer Content');
  });

  it('should render component with open attribute', () => {
    const wrapper = mount(CustomModal, {
      props: {
        isOpen: true,
      },
    });
    expect(wrapper.find('.modal').attributes('open')).toBeDefined();
  });

  it('should open and close modal', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        isOpen: false,
      },
    });
    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
    await wrapper.setProps({ isOpen: true });
    expect(wrapper.find('.modal').attributes('open')).toBeDefined();
    await wrapper.setProps({ isOpen: false });
    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
  });
});
