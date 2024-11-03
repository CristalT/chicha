import { onMounted, ref } from "vue"
import useToast from "./useToast"
import { Article } from "../types"

const total = ref(0)
export default function useCart() {
    const toast = useToast()

    function getStoredCart() {
        const storedCart = localStorage.getItem('cart')
        return storedCart ? JSON.parse(storedCart) : {}
    }

    function storeCart(cart: Record<string, Article & { qty: number }>) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    function addToCart(item: Article) {
        const cart = getStoredCart()
        cart[item.id] = item
        storeCart(cart)
        calcTotal(cart)
        toast.success('Artículo agregado al carrito.')
    }

    function calcTotal(cart: object) {
        total.value = Object.values(cart).reduce((acc, item) => {
            acc += Number(item.qty ?? 0) * Number(item.price)
            return acc
        }, 0)
    }

    onMounted(() => {
        calcTotal(getStoredCart())
    })

    return { addToCart, calcTotal, total }
}