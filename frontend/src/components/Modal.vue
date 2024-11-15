<script setup lang="ts">
import { computed, watch } from 'vue';

const props = defineProps<{ visible: boolean, title: string }>()
const isVisible = computed(() => props.visible)
const emit = defineEmits(['close'])

function closeOnEscKeyPressed(e: KeyboardEvent) {
    if (e.code === 'Escape') {
        emit('close')
    }
}

function bootListeners(imVisible: boolean) {
    if (imVisible) {
        document.addEventListener('keyup', closeOnEscKeyPressed)
    } else {
        document.removeEventListener('keyup', closeOnEscKeyPressed)
    }
}

watch(isVisible, (val) => {
    bootListeners(val)
})
</script>
<template>

    <div class="modal" v-if="visible">
        <article>
            <header>
                {{  title }}
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer"></slot>
            </footer>
        </article>
    </div>
</template>

<style lang="css" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

article {
    position: relative;
    box-shadow: 6px 6px 20px #101010;
    background-color: #fff;
    height: 460px;
    width: 80vw;
    border-radius: 3px;
}

main {
    overflow-y: scroll;
    height: calc(100% - 100px);
    padding: 16px;
}

header {
    border-bottom: 1px solid #000;
    padding: 8px;
    text-align: center;
}

footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #000;
    padding: 8px;
    justify-content: space-between;
    display: flex;
    box-sizing: border-box;
    align-items: center;
}
</style>