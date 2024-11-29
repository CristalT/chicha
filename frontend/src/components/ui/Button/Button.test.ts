import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Component', () => {
    it('renders the passed label', () => {
        const wrapper = mount(Button, { props: {
            label: 'test'
        }})

        const label = wrapper.find('span')

        expect(label.exists()).toBeTruthy()
        expect(label.text()).toBe('test')
    })

    it('renders with secondary variant', () => {
        const wrapper = mount(Button, { props: {
            label: 'test',
            variant: 'secondary'
        }}) 

        expect(wrapper.find('.secondary').exists()).toBeTruthy()
    })

    it('renders with primary variant', () => {
        const wrapper = mount(Button, { props: {
            label: 'test',
            variant: 'primary'
        }})

        expect(wrapper.find('.primary').exists()).toBeTruthy()
    })

    it('renders with tertiary variant', () => {
        const wrapper = mount(Button, { props: {
            label: 'test',
            variant: 'tertiary'
        }})

        expect(wrapper.find('.tertiary').exists()).toBeTruthy()
    })

    it('renders with the passed content', () => {
        const wrapper = mount(Button, { slots: {
            default: 'test'
        }})

        expect(wrapper.find('button').text()).toBe('test')
    })
})
