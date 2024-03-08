<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-3xl font-bold mb-8 text-center">All our Posts</h1>
    <div v-if="posts.length === 0" class="text-center text-gray-500">
      No post to display.
    </div>
    <div v-else>
      <div
        v-for="post in posts"
        :key="post.id"
        class="mb-10 p-5 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
        <p class="text-gray-600 text-sm mb-4">
          published on {{ new Date(post.created_at).toLocaleDateString() }} at
          {{ new Date(post.created_at).toLocaleTimeString() }}
        </p>
        <!-- Affichage correct des listes Markdown -->
        <div
          class="text-gray-800 markdown"
          v-html="parseMarkdown(post.content)"></div>
        <!-- Fin de l'affichage correct des listes Markdown -->
        <button
          v-if="authStore.isLoggedIn"
          @click="deletePost(post.id)"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-150 ease-in-out">
          Delete
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
      // Clean and render Markdown content
      content: DOMPurify.sanitize(parseMarkdown(post.content)),
    }));
  } catch (error) {
    console.error("Error while fetching posts:", error);
  }
}

function parseMarkdown(content) {
  const htmlContent = md.render(content);
  // Ajoutez les balises UL et LI pour les listes à puces
  return htmlContent
    .replace(/<ul>/g, "<ul class='list-disc ml-8'>")
    .replace(/<li>/g, "<li class='mb-2'>");
}

async function deletePost(postId) {
  try {
    const config = useRuntimeConfig();
    await axios.delete(`${config.public.apiUrl}/api/posts/${postId}`);
    posts.value = posts.value.filter((post) => post.id !== postId);
    showMessage("Post deleted successfully", "success");
  } catch (error) {
    showMessage("Error while deleting post", "error");
  }
}
</script>
