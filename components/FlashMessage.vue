<template>
  <div v-if="isVisible" class="flash-message" :class="messageType">
    {{ message }}
  </div>
</template>

<script setup>
import { useFlashMessage } from '@/composables/useFlashMessage';

// Destructure the needed reactive properties from the composable
const { message, messageType, isVisible } = useFlashMessage();
</script>

<style scoped>
.flash-message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: #ffffff;
  text-align: center;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 12px;
  z-index: 1000; /* Ensure it's above other content */
}
.info { background-color: #007bff; }
.success { background-color: #28a745; }
.error { background-color: #dc3545; }
</style>
