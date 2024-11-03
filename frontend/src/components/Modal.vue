<script setup lang="ts">
import { computed, watch } from 'vue';

const props = defineProps<{ visible: boolean }>()
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
        <slot></slot>
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
</style>