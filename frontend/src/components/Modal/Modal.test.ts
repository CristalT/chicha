import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Modal from "./Modal.vue";
import { nextTick } from "vue";

describe("Modal Component", () => {
    it ('shows title', () => {
        const wrapper = mount(Modal, {
            props: {
                visible: true,
                title: 'test'
            }
        })
        expect(wrapper.find('header').text()).toBe('test')
    })

    it('closes on escape key', async () => {
        const wrapper = mount(Modal, {
            props: {
                visible: false,
                title: 'test'
            }
        })

        await wrapper.setProps({
            visible: true
        })

        const event = new KeyboardEvent('keyup', { code: 'Escape' })
        document.dispatchEvent(event)

        expect(wrapper.emitted()['close'][0]).toBeTruthy()
    })

})