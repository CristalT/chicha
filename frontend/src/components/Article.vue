<script setup lang="ts">
import FormInput from './FormInput.vue'
import Button from './Button.vue'

defineEmits(['cancel'])
defineProps<{
    visible: boolean,
    title: string
}>()
</script>
<template>
    <div class="modal" v-if="visible">
        <div class="content">
            <div class="header">
                {{ title }}
            </div>
            <div class="form">
                <FormInput label="Código" />
                <FormInput label="Descripción" />

                <div class="row gap">
                    <FormInput label="Stock" type="number" />
                    <FormInput label="Costo" type="number" />
                    <FormInput label="Precio" type="number" />
                </div>
            </div>

            <div class="footer row gap justify-end">
                <Button label="Cancelar" variant="secondary" @click="$emit('cancel')" />
                <Button label="Guardar" @click="$emit('save')" />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal .content {
    position: relative;
    box-shadow: 6px 6px 20px #101010;
    background-color: #fff;
    height: 80vh;
    width: 80vw;
    border-radius: 3px;
}

.content .header {
    font-size: 1.2rem;
    text-align: center;
    border-bottom: 1px solid #000;
    padding: 4px;
}

.content .footer {
    position: absolute;
    bottom: 0;
    padding: 6px;
    
    
    border-top: 1px solid;
    
    width: 100%;
    box-sizing: border-box;
}

.form {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>