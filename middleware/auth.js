// middleware/auth.js

export default defineNuxtRouteMiddleware((to, from) => {
  const pinia = usePinia();
  const authStore = useAuthStore(pinia);

  authStore.checkAuthStatus();

  if (!authStore.isLoggedIn && to.path !== "/login") {
    return navigateTo("/login");
  }
});
