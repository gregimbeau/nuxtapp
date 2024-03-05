// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn, checkAuthStatus } = useAuth();
  await checkAuthStatus();

  if (!isLoggedIn.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
