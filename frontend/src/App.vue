<script setup lang="ts">
import { ref } from 'vue'

import Toolbar from './components/Toolbar.vue'
import Article from './components/Article.vue'

const isArticleVisible = ref(false)
const articleModalTitle = ref('')

function newArticle() {
  articleModalTitle.value = 'Nuevo artículo'
  isArticleVisible.value = true
}

function closeArticleModal() {
  isArticleVisible.value = false
}

const options = [
  { label: 'Nuevo', action: newArticle }
]
</script>
<template>
  <Toolbar :options />
  <table>
    <thead>
      <tr>
        <th>Código</th>
        <th>Descripción</th>
        <th>Stock</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">aaa</td>
        <td>aaa</td>
        <td class="center">aaa</td>
        <td class="text-right">aaa</td>
      </tr>
    </tbody>
  </table>

  <Article :title="articleModalTitle" :visible="isArticleVisible" @cancel="closeArticleModal" />
</template>


