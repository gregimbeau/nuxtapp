// composables/useFlashMessage.js

import { ref } from "vue";

const message = ref("");
const messageType = ref("info");
const isVisible = ref(false);

export function useFlashMessage() {
  function showMessage(content, type = "info") {
    message.value = content;
    messageType.value = type;
    isVisible.value = true;

    setTimeout(() => {
      isVisible.value = false;
    }, 6000);
  }

  return { message, messageType, isVisible, showMessage };
}
