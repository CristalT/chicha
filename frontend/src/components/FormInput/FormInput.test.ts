import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormInput from './FormInput.vue'

describe('FormInput Component', () => {
    it('renders the passed label', () => {
        const wrapper = mount(FormInput, { props: {
            label: 'test'
        }})

        const label = wrapper.find('label')

        expect(label.exists()).toBeTruthy()
        expect(label.find('.label').text()).toBe('test')
    })

    it('renders with the passed placeholder', async () => {
        const wrapper = mount(FormInput, { attrs: { placeholder: 'test'}})
        expect(wrapper.find('input').attributes()).toHaveProperty('placeholder', 'test')
    })

    it('converts input text to upper case', async () => {
        const wrapper = mount(FormInput)
        await wrapper.find('input').setValue('text')

        expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['TEXT'])
    })
})