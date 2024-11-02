<script setup lang="ts">
import { CreateArticle, GetArticles } from '../../wailsjs/go/main/App'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import type { Article } from '../types'
import ArticleModal from '../components/ArticleModal.vue'
import Toolbar from '../components/Toolbar.vue'
import useToast from '../composables/useToast';
import FormInput from '../components/FormInput.vue'


const toast = useToast()

const options = [
  { label: 'Nuevo', action: newArticle }
]

const articles = ref<Article[]>([])
const params = reactive({
  orderBy: 'description',
  orderType: 'asc',
  terms: ''
})
const isArticleModalVisible = ref(false)
const articleModalTitle = ref('')
const article = ref<Article>({
  id: 0,
  code: '',
  description: '',
  stock: 0,
  fob: 0,
  price: 0
})

let deb: any
async function getArticles() {
  clearTimeout(deb)

  deb = setTimeout(() => {

    GetArticles(params.orderBy, params.orderType, params.terms)
      .then(response => articles.value = response)
      .catch((err) => console.log('error', err))
  }, 1000)
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

  console.log(article.value)
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
  CreateArticle(article).then(() => {
    isArticleModalVisible.value = false
    toast.success('Artículo creado correctamente.')
    getArticles()
  }).catch((err) => {
    toast.error('Error al crear artículo')
  })
}

function closeArticleModal() {
  isArticleModalVisible.value = false
}

onMounted(() => {

  getArticles()
}) 
</script>
<template>
  <div class="search-input">
    <FormInput v-model="params.terms" placeholder="Buscar ..." @update:modelValue="getArticles" />
  </div>

  <table>
    <thead>
      <tr>
        <th @click="setOrderBy('code')" :class="{ underline: params.orderBy === 'code' }">Código</th>
        <th @click="setOrderBy('description')" :class="{ underline: params.orderBy === 'description' }">Descripción</th>
        <th @click="setOrderBy('stock')" :class="{ underline: params.orderBy === 'stock' }">Stock</th>
        <th @click="setOrderBy('price')" :class="{ underline: params.orderBy === 'price' }">Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(article, key) of articles" :key="key">
        <td class="text-center" style="width: 200px;">{{ article.code }}</td>
        <td>{{ article.description }}</td>
        <td class="text-center" style="width: 100px">{{ article.stock }}</td>
        <td class="text-right" style="width: 150px;">{{ article.price }}</td>
      </tr>
    </tbody>
  </table>
  <Toolbar class="bottom-bar" :options />

  <ArticleModal :title="articleModalTitle" :visible="isArticleModalVisible" v-model="article"
    @cancel="closeArticleModal" @save="save" />
</template>

<style lang="css" scoped>
.search-input {
  padding: 8px;
  position: sticky;
  top: 0;
}

table thead {
  position: sticky;
  top: 55px;
  background-color: #000;
  color: #fff;

  & tr th {
    padding: 8px;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

table tbody tr td {
  border: 1px solid #aaa;
  padding: 8px;

}

.bottom-bar {
  border-top: 1px solid #000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  bottom: 0
}
</style>