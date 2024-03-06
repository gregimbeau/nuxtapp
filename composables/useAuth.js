import { useAuthStore } from "@/stores/auth";
export function useAuth() {
  const authStore = useAuthStore();
  const { showMessage } = useFlashMessage(); 

  // Fonction pour déterminer si on est côté client
  const isClient = () => typeof window !== "undefined";

  const login = async (credentials) => {
    try {
      await authStore.login(credentials);
      showMessage("Login successful!", "success");
    } catch (error) {
      showMessage(
        "Login failed. Please check your credentials and try again.",
        "error"
      );
    }
  };

  const logout = () => {
    authStore.logout();
    showMessage("You've been logged out successfully.", "info");
  };

  const checkAuthStatus = () => {
    authStore.checkAuthStatus();
  };

  return {
    isLoggedIn: authStore.isLoggedIn,
    login,
    logout,
    checkAuthStatus,
  };
}
