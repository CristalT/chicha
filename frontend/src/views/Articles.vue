<script setup lang="ts">
import { CreateArticle, GetArticles } from '../../wailsjs/go/main/App'
import { onMounted, reactive, ref } from 'vue'
import type { Article } from '../types'
import ArticleModal from '../components/ArticleModal.vue'
import useToast from '../composables/useToast';
import FormInput from '../components/FormInput.vue'
import Button from '../components/Button.vue'
import useCart from '../composables/useCart'
import ShowArticleModal from '../components/ShowArticleModal.vue';
import CartModal from '../components/CartModal.vue'

const toast = useToast()
const { addToCart, total } = useCart()

const articles = ref<Article[]>([])
const params = reactive({
  orderBy: 'description',
  orderType: 'asc',
  terms: ''
})
const isArticleModalVisible = ref(false)
const isAddToCartModalVisible = ref(false)
const isCartModalVisible = ref(false)
const articleModalTitle = ref('')
const article = ref<Article>({
  id: 0,
  code: '',
  description: '',
  stock: 0,
  fob: 0,
  price: 0
})

async function getArticles() {
  GetArticles(params.orderBy, params.orderType, params.terms)
    .then(response => articles.value = response)
    .catch((err) => console.log('error', err))
}

function showAddToCart(item: Article) {
  isAddToCartModalVisible.value = true
  article.value = item
  article.value.qty = 1
}

function newArticle() {
  article.value = {
    id: 0,
    code: '',
    description: '',
    stock: 0,
    fob: 0,
    price: 0
  }
  articleModalTitle.value = 'Nuevo artículo'
  isArticleModalVisible.value = true
}

function setOrderBy(column: string) {
  if (params.orderBy === column) {
    params.orderType = params.orderType === 'asc' ? 'desc' : 'asc'
  }
  params.orderBy = column

  articles.value = []

  getArticles()
}
function save(article: Article) {
  // @ts-ignore
  CreateArticle(article).then(() => {
    isArticleModalVisible.value = false
    toast.success('Artículo creado correctamente.')
    getArticles()
  }).catch((err) => {
    toast.error('Error al crear artículo')
  })
}

function addItemToCart(item: Article) {
  addToCart(item)
  isAddToCartModalVisible.value = false
}

function closeArticleModal() {
  isArticleModalVisible.value = false
}

function onFinishCart() {
  getArticles()
  isCartModalVisible.value = false
}

onMounted(() => {
  getArticles()
}) 
</script>
<template>
  <header>
    <FormInput autofocus v-model="params.terms" placeholder="Buscar ..." @update:modelValue="getArticles" />
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th @click="setOrderBy('code')" :class="{ underline: params.orderBy === 'code' }">Código</th>
          <th @click="setOrderBy('description')" :class="{ underline: params.orderBy === 'description' }">Descripción
          </th>
          <th @click="setOrderBy('stock')" :class="{ underline: params.orderBy === 'stock' }">Stock</th>
          <th @click="setOrderBy('price')" :class="{ underline: params.orderBy === 'price' }">Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, key) of articles" :key="key" @click="showAddToCart(article)">
          <td class="text-center" style="width: 200px;">{{ article.code }}</td>
          <td>{{ article.description }}</td>
          <td class="text-center" style="width: 100px">{{ article.stock }}</td>
          <td class="text-right price" style="width: 150px;">{{ article.price }}</td>
        </tr>
      </tbody>
    </table>
  </main>


  <footer>
    <nav>
      <ul>
        <li>

          <Button variant="secondary" label="Nuevo Artículo" @click="newArticle" />
        </li>

      </ul>
    </nav>
    <nav>
      <ul>
        <li>
          <Button :label="`Carrito: $ ${total}`" @click="isCartModalVisible = true" />
        </li>
      </ul>
    </nav>

  </footer>

  <CartModal :visible="isCartModalVisible" @close="isCartModalVisible = false" @finish="onFinishCart" />
  <ShowArticleModal v-model="article" :visible="isAddToCartModalVisible" @addToCart="addItemToCart"
    @close="isAddToCartModalVisible = false" />
  <ArticleModal :title="articleModalTitle" :visible="isArticleModalVisible" v-model="article"
    @cancel="closeArticleModal" @save="save" />
</template>

<style lang="css" scoped>
header {
  position: fixed;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

main {
  top: 65px;
  overflow-y: scroll;
  height: calc(100vh - 130px);
  position: fixed;
  width: 100%;
}

table thead {
  position: sticky;
  top: 0;
  background-color: #3f1055;
  color: #fff;
  z-index: 10;

  & tr th {
    padding: 8px;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

table tbody tr {
  cursor: pointer;
  transition: all .1s ease;

  &:hover {
    background-color: #ccc;
  }

  & td {
    border: 1px solid #aaa;
    padding: 8px;
    position: relative;

    &.price::before {
      content: '$';
      position: absolute;
      left: 10px;
    }
  }
}


footer {
  background-color: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-between;

  & nav {
    padding: 8px;
    display: flex;
    justify-content: right;
    position: sticky;
    top: 0;

    & ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 8px;
    }
  }
}
</style>