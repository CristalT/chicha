<script setup lang="ts">
import { CreateArticle, GetArticles, UpdateArticle } from '../../wailsjs/go/main/App'
import { computed, onMounted, reactive, ref } from 'vue'
import ArticleModal from '../components/ArticleModal.vue'
import useToast from '../composables/useToast';
import { FormInput, Button } from '../components/ui'
import useCart from '../composables/useCart'
import { SaleModal } from '../components/SaleModal';
import Layout from '../components/Layout.vue';
import { main } from '../../wailsjs/go/models';
import { CartIcon, AddIcon } from '../components/Icons';


const toast = useToast()
const { addToCart, total } = useCart()

let currentRowIndex = 0

const articles = ref<main.Article[]>([])
const searchInput = ref<HTMLInputElement>()
const params = reactive({
  orderBy: 'description',
  orderType: 'asc',
  terms: ''
})
const isArticleModalVisible = ref(false)
const isAddToCartModalVisible = ref(false)
const articleModalTitle = ref('')
const article = ref<main.Article>({
  code: '',
  description: '',
  stock: 0,
  fob: 0,
  price: 0
})
const sale = ref<main.Sale>({
  articleId: 0,
  code: '',
  description: '',
  qty: 0,
  fob: 0,
  price: 0
})

const someModalIsVisible = computed(() => isArticleModalVisible.value || isAddToCartModalVisible.value);

async function getArticles() {
  currentRowIndex = 0
  await GetArticles(params.orderBy, params.orderType, params.terms)
    .then(response => articles.value = response)
    .catch((err) => console.log('error', err))
}

function showAddToCart(item: main.Article) {
  if (!item.id) return;
  isAddToCartModalVisible.value = true
  sale.value = {
    articleId: item.id,
    code: item.code,
    description: item.description,
    fob: item.fob,
    price: item.price,
  }
}

function newArticle() {
  article.value = {
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
function save(article: main.Article) {
  if (article.id) {
    UpdateArticle(article).then(() => {
      isArticleModalVisible.value = false
      toast.success('Artículo guardado correctamente.')
      getArticles()
    }).catch((err) => {
      toast.error('Error al crear artículo')
    })
  } else {
    CreateArticle(article).then(() => {
      isArticleModalVisible.value = false
      toast.success('Artículo creado correctamente.')
      getArticles()
    }).catch((err) => {
      toast.error(`Error al crear artículo. ${err}`)
    })
  }
}

function addItemToCart({ article, qty }: { article: main.Sale, qty: number }) {
  const sale = {
    articleId: article.articleId,
    code: article.code,
    description: article.description,
    qty,
    fob: article.fob,
    price: article.price
  }

  addToCart(sale)
  isAddToCartModalVisible.value = false
  searchInput.value?.focus()
  searchInput.value?.select()
}

function closeArticleModal() {
  isArticleModalVisible.value = false
  getArticles()
}

function openEdit(item: main.Article) {
  article.value = item
  articleModalTitle.value = 'Editar artículo'
  isAddToCartModalVisible.value = false
  isArticleModalVisible.value = true
}

onMounted(() => {
  // table navigation throw keyboard arrows
  const table = document.getElementById('articles-table')
  const rows = table?.getElementsByTagName('tr')!

  window.addEventListener('keyup', (e) => {
    if (someModalIsVisible.value) return;
    e.preventDefault()
    if (e.key === "ArrowDown" && currentRowIndex < rows.length - 1) {
      currentRowIndex++;
    } else if (e.key === "ArrowUp" && currentRowIndex > 1) {
      currentRowIndex--;
    } else if (e.key === 'Enter') {
      const article = articles.value[currentRowIndex - 1];
      if (article) {
        showAddToCart(article)
      }
    }

    // Remove highlight from all rows
    for (let i = 1; i < rows.length; i++) {
      rows[i].style.backgroundColor = ''; // Clear the background color
    }

    // Highlight the current row
    if (currentRowIndex >= 1 && currentRowIndex < rows.length) {
      rows[currentRowIndex].style.backgroundColor = '#fea7f8'; // Highlight color
    }
  })

  // autofocus search input writing something
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = Number(e.key)

    const isNumber = key >= 48 && key <= 57
    const isLetter = e.code === `Key${e.key.toUpperCase()}`
    const isBackspace = e.code === 'Backspace'


    if (someModalIsVisible.value) return;

    if (isLetter || isNumber || isBackspace) { // detects only letters and numbers
      searchInput.value?.focus()
    }
  })

  getArticles()
})


</script>
<template>
  <Layout>
    <template #header>
      <div class="search-box">

        <FormInput autofocus autocomplete="off" ref="searchInput" v-model="params.terms" placeholder="Buscar ..."
          @update:modelValue="getArticles" />
      </div>
    </template>
    <table id="articles-table">
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

    <template #footer>

      <div>

        <Button variant="secondary" @click="newArticle">
          <AddIcon /> Nuevo artículo
        </Button>
      </div>

      <div>

        <Button @click="$router.push({ name: 'sale' })">
          <CartIcon /> Carrito: $ {{ total }}
        </Button>
      </div>

    </template>

  </Layout>


  <SaleModal v-model="sale" :visible="isAddToCartModalVisible" @addToCart="addItemToCart"
    @close="isAddToCartModalVisible = false" @edit="openEdit" />
  <ArticleModal :title="articleModalTitle" :visible="isArticleModalVisible" v-model="article"
    @cancel="closeArticleModal" @save="save" />
</template>

<style lang="css" scoped>
.search-box {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: right;

  & ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;
  }
}
</style>