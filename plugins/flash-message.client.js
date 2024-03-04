export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("flashMessage", {
    show(message, messageType = "info") {
      sessionStorage.setItem("flashMessage", message);
      sessionStorage.setItem("flashMessageType", messageType);
      // Trigger something that listens for these changes, or directly update a store/state
    },
    clear() {
      sessionStorage.removeItem("flashMessage");
      sessionStorage.removeItem("flashMessageType");
    },
  });
});
