import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SaleModal from "./SaleModal.vue";
import { defineComponent } from "vue";

const article = {
    code: 'test',
    description: 'test description',
    price: 10,
    articleId: 1,
    fob: 5
}

const component = defineComponent({
    components: {
        SaleModal
    },
    setup() {
        return { article }
    },
    template: '<div><SaleModal v-model="article" visible /></div>'
})
describe('SaleModal Component', () => {
    it ('shows article description', () => {
        const wrapper = mount(component)
        expect(wrapper.find('header').text()).toBe('test description')
    })

    it('shows article code', () => {
        const wrapper = mount(component)
        expect(wrapper.findAll('h3').at(0)?.text()).toBe('Código: test')
    })

    it('shows article price', () => {
        const wrapper = mount(component)
        expect(wrapper.findAll('h3').at(1)?.text()).toBe('Precio: $ 10')
    })

    it ('shows input for quantity', () => {
        const wrapper = mount(component)
        expect(wrapper.find('input').exists()).toBeTruthy()
    })

    it ('emits addToCart event with the passed quantity', async () => {
        const wrapper = mount(SaleModal, { props: {
            visible: true,
            modelValue: article
        }})
        await wrapper.find('input').setValue(2)
        const addToCartButton = wrapper.findAll('button').at(1)
        await addToCartButton?.trigger('click')
        
        expect(wrapper.emitted()['addToCart'][0]).toEqual([{ article, qty: 2 }])
    })
})