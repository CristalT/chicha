import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import FormInput from './FormInput.vue'

describe('FormInput Component', () => {
    it('renders the passed label', () => {
        const wrapper = mount(FormInput, { props: {
            label: 'test'
        }})

        const label = wrapper.find('label')

        expect(label.exists()).toBeTruthy()
    })
})