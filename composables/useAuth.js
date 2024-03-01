import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#imports";

export function useAuth() {
  const router = useRouter();
  const isLoggedIn = ref(false);
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiUrl;

  const login = async (credentials) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }
      const data = await response.json();
      console.log("Connexion réussie:", data);
      localStorage.setItem("isLoggedIn", "true");
      isLoggedIn.value = true;

      // Dispatch a custom event after successful login
      window.dispatchEvent(
        new CustomEvent("auth-change", { detail: { isLoggedIn: true } })
      );

      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert(
        "Erreur lors de la connexion. Veuillez vérifier vos informations d'identification et réessayer."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    isLoggedIn.value = false;

    // Dispatch a custom event after logout
    window.dispatchEvent(
      new CustomEvent("auth-change", { detail: { isLoggedIn: false } })
    );

    router.push("/login");
  };

  const checkAuthStatus = () => {
    isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  };

  return { isLoggedIn, login, logout, checkAuthStatus };
}
