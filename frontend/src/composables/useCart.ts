import { onMounted, ref } from "vue"
import useToast from "./useToast"
import { main } from "../../wailsjs/go/models"

const total = ref(0)
export default function useCart() {
    const toast = useToast()

    function getStoredCart(): Record<main.Sale['articleId'], main.Sale> {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : {}
    }

    function storeCart(cart: Record<string, main.Sale>) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    function addToCart(item: main.Sale) {
        const cart = getStoredCart()
        cart[item.articleId] = item
        storeCart(cart)
        calcTotal(cart)
        toast.success('Artículo agregado al carrito.')
    }

    function removeFromCart(item: main.Sale) {
        const cart = getStoredCart()
        delete cart[item.articleId]
        storeCart(cart)
        calcTotal(cart)
        return getStoredCart()
    }

    function calcTotal(cart: object) {
        total.value = Object.values(cart).reduce((acc, item) => {
            acc += Number(item.qty ?? 0) * Number(item.price)
            return acc
        }, 0)
    }

    function finishCart() {
        storeCart({})
        calcTotal(getStoredCart())
    }

    onMounted(() => {
        calcTotal(getStoredCart())
    })

    return { addToCart, calcTotal, total, getStoredCart, finishCart, removeFromCart }
}