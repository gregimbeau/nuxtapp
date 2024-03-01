<template>
  <div class="relative flex items-center group">
    <div MyLogo @mouseover="displayDropdown">Menu</div>

    <transition name="fade">
      <div
        v-if="showDropdown"
        class="dropdown-content absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col z-50"
        @mouseleave="hideDropdown">
        <NuxtLink
          to="/"
          class="dropdown-item px-3 py-2 flex items-center text-black hover:bg-[#12b488] hover:text-white rounded-t-lg">
          <!-- Home Icon -->
          <svg
            class="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 9.5V22h18V9.5L12 3 3 9.5z"></path>
          </svg>
          Home
        </NuxtLink>
        <!-- Separator -->
        <div class="border-t border-gray-300"></div>
        <NuxtLink
          v-if="!isLoggedIn"
          to="/login"
          class="dropdown-item flex items-center">
          <svg
            class="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.364 6.364L15.172 20M19 12H3"></path>
          </svg>
          Se connecter
        </NuxtLink>

        <div class="border-t border-gray-300"></div>

        <div v-if="isLoggedIn">
          <a href="#" class="dropdown-item" @click.prevent="logout"
            >Se déconnecter</a
          >
          <NuxtLink to="/profile" class="dropdown-item">Profil</NuxtLink>
        </div>
        <NuxtLink
          to="/contact"
          class="dropdown-item px-3 py-2 flex items-center text-black hover:bg-[#12b488] hover:text-white">
          <!-- Pencil Icon -->
          <svg
            class="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7L2 20.172V22h1.828L17 8.828l-1.828-1.828z"></path>
          </svg>
          Who we are
        </NuxtLink>
        <!-- Separator -->
        <div class="border-t border-gray-300"></div>

        <!-- Liens factices -->
        <div class="flex rounded-b-lg">
          <!-- Lien pour les vidéos -->
          <a
            href="#"
            class="flex-1 dropdown-item flex items-center justify-center bg-gray-200 rounded-bl-lg">
            <svg
              class="h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Vidéos
          </a>

          <!-- Lien pour les news -->
          <a
            href="#"
            class="flex-1 dropdown-item flex items-center justify-center bg-gray-200 rounded-br-lg">
            <svg
              class="h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path
                d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="12 2 12 9 15 9"></polyline>
            </svg>
            News
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const isLoggedIn = ref(false); // Gère l'état de connexion

const showDropdown = ref(false);
const router = useRouter();

const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 500); // Ajoute un délai de 500 ms avant de cacher le menu
};

const displayDropdown = () => {
  showDropdown.value = true;
};
const logout = () => {
  isLoggedIn.value = false;
  router.push("/login");
};
</script>

<style scoped>
.group {
  /* Assurez-vous que cet élément est bien positionné à droite */
  margin-left: auto; /* Pour pousser l'élément à droite si c'est dans un flex container */
}

.dropdown-content {
  top: 100%; /* Se positionne en dessous de l'élément déclencheur */
  transform: translateX(-71%); /* Déplace le menu vers la gauche pour s'aligner avec le bord droit de l'élément parent */
  width: max-content;
  z-index: 50;
}


.dropdown-item {
  padding: 8px 12px;
  color: black;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #12b488;
  color: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
