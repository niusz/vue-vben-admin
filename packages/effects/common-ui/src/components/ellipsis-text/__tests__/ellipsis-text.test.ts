import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { EllipsisText } from '..';

describe('ellipsis-text.vue', () => {
  it('renders the correct content and truncates text', async () => {
    const wrapper = mount(EllipsisText, {
      props: {
        line: 1,
        title: 'Test Title',
      },
      slots: {
        default: 'This is a very long text that should be truncated.',
      },
    });

    expect(wrapper.text()).toContain('This is a very long text');
    // 检查 ellipsis 是否应用了正确的 class
    const ellipsis = wrapper.find('.truncate');
    expect(ellipsis.exists()).toBe(true);
  });

  it('expands text on click if expand is true', async () => {
    const wrapper = mount(EllipsisText, {
      props: {
        expand: true,
        line: 1,
      },
      slots: {
        default: 'This is a very long text that should be truncated.',
      },
    });

    const ellipsis = wrapper.find('.truncate');
    await ellipsis.trigger('click');
    expect(wrapper.emitted('expandChange')).toBeTruthy();
  });
});