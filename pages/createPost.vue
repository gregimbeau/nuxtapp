<template>
  <FlashMessage />

  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-2xl font-bold mb-6 text-center">Create new post</h1>
    <div class="bg-white shadow-md rounded-lg p-6">
      <form
        @submit.prevent="post.id ? updatePost() : submitPost()"
        class="space-y-4">
        <input
          v-model="post.title"
          type="text"
          placeholder="Title"
          required
          class="block w-full border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        <div class="toolbar flex space-x-2 mt-2">
          <!-- Bouton Gras -->
          <button @click="addMarkdown('**', '**')" class="toolbar-button">
            <!-- Icône Gras SVG -->
            <svg
              class="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.54 11.59C16.83 11.15 17.81 9.97 17.81 8.5C17.81 6.57 16.24 5 14.31 5H7V19H15.25C17.18 19 18.75 17.43 18.75 15.5C18.75 13.64 17.5 12.22 15.54 11.59ZM9.5 7.5H14.31C15.19 7.5 15.94 8.25 15.94 9.13C15.94 10.01 15.19 10.75 14.31 10.75H9.5V7.5ZM14.06 16.5H9.5V13.25H14.06C14.94 13.25 15.69 14 15.69 14.88C15.69 15.76 14.94 16.5 14.06 16.5Z" />
            </svg>
          </button>

          <!-- Bouton Italique -->
          <button @click="addMarkdown('*', '*')" class="toolbar-button">
            <!-- Icône Italique SVG -->
            <svg
              class="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 4V6H11.57L8.14 18H6V20H14V18H12.43L15.86 6H18V4H10Z" />
            </svg>
          </button>

          <!-- Bouton Lien -->
          <button @click="addLink" class="toolbar-button">
            <!-- Icône Lien SVG -->
            <svg
              class="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.59 13.41L9.17 14.83L12 17.66L14.83 14.83L13.41 13.41L12 14.83L10.59 13.41ZM8 9H6V11H8V9ZM16 9H18V11H16V9ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z" />
            </svg>
          </button>

          <!-- Sélecteur de Couleur -->
          <input
            type="color"
            v-model="selectedColor"
            @change="applyColor"
            class="color-picker" />

          <!-- Bouton Retour à la ligne -->
          <button @click="addLineBreak" class="toolbar-button">
            <!-- Icône Retour à la ligne SVG -->
            <svg
              class="icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M3 12H21M12 5L12 19" />
            </svg>
          </button>
        </div>

        <textarea
          ref="textareaRef"
          v-model="post.content"
          placeholder="Markdown content"
          required
          class="mt-2 block w-full border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          rows="10"></textarea>
        <div class="mt-4">
          <label class="block mb-2">Content preview:</label>
          <div
            v-html="renderedMarkdown"
            class="markdown-preview p-4 border border-gray-300 rounded-md"></div>
        </div>
        <button
          type="submit"
          class="mt-4 w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {{ post.id ? "Update" : "Publish" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { useFlashMessage } from "@/composables/useFlashMessage";
import { useAuthStore } from "@/stores/auth";

// Initialisation de markdown-it avec l'option HTML activée
const md = new MarkdownIt({ html: true, breaks: true });
const { showMessage } = useFlashMessage();
const authStore = useAuthStore();
const textareaRef = ref(null);
const selectedColor = ref("#000000");

const post = ref({
  id: null,
  title: "",
  content: "",
});

const renderedMarkdown = computed(() => md.render(post.value.content));
function addLineBreak() {
  if (!textareaRef.value) return;

  const start = textareaRef.value.selectionStart;
  const end = textareaRef.value.selectionEnd;

  post.value.content =
    post.value.content.substring(0, start) +
    "<br>" +
    post.value.content.substring(end);

  // Mettre à jour la position du curseur
  textareaRef.value.focus();
  const newPos = start + 4; // 4 pour la longueur de "<br>"
  textareaRef.value.setSelectionRange(newPos, newPos);
}

function applyColor() {
  if (!textareaRef.value) return;

  const color = selectedColor.value;
  const start = textareaRef.value.selectionStart;
  const end = textareaRef.value.selectionEnd;
  const selectedText = post.value.content.substring(start, end);

  // Utilisez la syntaxe HTML pour appliquer la couleur
  const coloredText = `<span style="color: ${color};">${selectedText}</span>`;

  // Insertion du texte coloré
  post.value.content =
    post.value.content.substring(0, start) +
    coloredText +
    post.value.content.substring(end);

  // Focus et ajustement de la position du curseur
  textareaRef.value.focus();
  const newPos = start + coloredText.length;
  textareaRef.value.setSelectionRange(newPos, newPos);
}

function addMarkdown(before, after) {
  if (!textareaRef.value) return;

  const start = textareaRef.value.selectionStart;
  const end = textareaRef.value.selectionEnd;
  const textBefore = post.value.content.substring(0, start);
  const textAfter = post.value.content.substring(end);
  const selectedText = post.value.content.substring(start, end);

  post.value.content = textBefore + before + selectedText + after + textAfter;

  // Mettre à jour la position du curseur
  textareaRef.value.focus();
  textareaRef.value.setSelectionRange(
    start + before.length,
    end + before.length
  );
}

function addLink() {
  if (!textareaRef.value) return;

  const url = prompt("Enter link URL:", "http://");
  if (url) {
    const start = textareaRef.value.selectionStart;
    const end = textareaRef.value.selectionEnd;
    const selectedText = post.value.content.substring(start, end) || "lien";

    addMarkdown(`[${selectedText}](`, `${url})`);
    textareaRef.value.focus();
    const newPos = start + selectedText.length + url.length + 4; // 4 pour les caractères supplémentaires
    textareaRef.value.setSelectionRange(newPos, newPos);
  }
}

async function submitPost() {
  try {
    const config = useRuntimeConfig();
    const response = await axios.post(`${config.public.apiUrl}/api/posts`, {
      title: post.value.title,
      content: post.value.content,
    });

    post.value = { ...post.value, id: response.data.postId };
    showMessage("Post created successfully", "success");
  } catch (error) {
    showMessage("Error while creating post", "error");
  }
}

async function updatePost() {
  try {
    const config = useRuntimeConfig();
    await axios.put(`${config.public.apiUrl}/api/posts/${post.value.id}`, {
      title: post.value.title,
      content: post.value.content,
    });

    showMessage("Post updated successfully", "success");
  } catch (error) {
    showMessage("Error while updating post", "error");
  }
}
</script>

<style>
.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f3f4f6; /* Gris clair */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toolbar-button:hover {
  background-color: #e5e7eb; /* Gris un peu plus foncé */
}

.icon {
  width: 20px;
  height: 20px;
  fill: #4b5563; /* Gris foncé */
}

.color-picker {
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
}

.markdown-preview ul {
  list-style-type: disc; /* Utilisez disc, circle, ou square selon le style souhaité */
  margin-left: 20px; /* Ajustez l'indentation des listes */
}

.markdown-preview li {
  margin-bottom: 5px; /* Espacement entre les éléments de la liste */
}

.markdown-preview a {
  color: #0645ad; /* Couleur des liens */
  text-decoration: none; /* Optionnel: supprime le soulignement */
}

.markdown-preview a:hover {
  text-decoration: underline; /* Optionnel: ajoute un soulignement au survol */
}

/* Style pour les éléments colorés dans les listes */
.markdown-preview span[style] {
  font-style: italic; /* Exemple pour appliquer un style spécifique aux spans avec style */
}
</style>
