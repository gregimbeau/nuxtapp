<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-3xl font-bold mb-8 text-center">Tous les Posts</h1>
    <div v-if="posts.length === 0" class="text-center text-gray-500">
      Aucun post à afficher.
    </div>
    <div v-else>
      <div
        v-for="post in posts"
        :key="post.id"
        class="mb-10 p-5 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 text-sm mb-4">
          Publié le {{ new Date(post.created_at).toLocaleDateString() }} à
          {{ new Date(post.created_at).toLocaleTimeString() }}
        </p>
        <div v-html="post.content" class="text-gray-800 markdown"></div>
        <!-- Utilisation de v-html ici -->
        <button
          v-if="authStore.isLoggedIn"
          @click="deletePost(post.id)"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-150 ease-in-out">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useFlashMessage } from "@/composables/useFlashMessage";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const md = new MarkdownIt({ html: true, breaks: true });
const authStore = useAuthStore();
const { showMessage } = useFlashMessage();
const posts = ref([]);

onMounted(async () => {
  await fetchPosts();
});

async function fetchPosts() {
  try {
    const config = useRuntimeConfig();
    const response = await axios.get(`${config.public.apiUrl}/api/posts`);
    posts.value = response.data.map((post) => ({
      ...post,
      content: DOMPurify.sanitize(md.render(post.content)), // Clean and render Markdown content
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
  }
}

async function deletePost(postId) {
  try {
    const config = useRuntimeConfig();
    await axios.delete(`${config.public.apiUrl}/api/posts/${postId}`);
    posts.value = posts.value.filter((post) => post.id !== postId);
    showMessage("Post supprimé avec succès", "success");
  } catch (error) {
    console.error("Erreur lors de la suppression du post:", error);
    showMessage("Erreur lors de la suppression du post", "error");
  }
}
</script>
