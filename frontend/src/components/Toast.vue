<script setup lang="ts">
import useToast from '../composables/useToast'

const { notifications } = useToast()

</script>

<template>
    <Teleport to="body">

        <div class="toast">
            <div class="notification" v-for="(notification, key) of notifications" :key="key">
                {{ notification.message }}
            </div>
        </div>
    </Teleport>
</template>

<style lang="css" scoped>
.toast {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
}

.toast .notification {
    padding: 10px 20px;
    border-radius: 3px;
    box-shadow: 1px 1px 20px rgba(0,0,0,0.5);
    color: white;
    background-color: green;
}
</style>