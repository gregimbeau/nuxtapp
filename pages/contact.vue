<template>
  <div class="flex flex-col items-center justify-start mt-10 p-4">
    <div
      class="container relative bg-white shadow-md rounded px-4 sm:px-8 pt-6"
      style="width: 90vw; max-width: 90vh; max-height: 80vh">
      <!-- Dropdowns for various sections -->
      <template v-for="section in sections" :key="section.name">
        <div class="mb-4">
          <button
            class="text-lg sm:text-xl font-bold w-full text-left"
            @click="toggleDropdown(section.name)">
            {{ section.title }}
          </button>
          <transition
            name="dropdown"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave">
            <div v-show="dropdowns[section.name]" class="overflow-hidden">
              <div
                class="mt-2 border-l-4 p-4 transition-transform transform origin-top"
                :class="section.style">
                <p class="text-sm sm:text-base">{{ apiData[section.name] }}</p>
              </div>
            </div>
          </transition>
        </div>
      </template>

      <!-- Display the logo SVG once, outside and after the loop -->
      <a href="http://www.perdu.com" target="_blank" rel="noopener noreferrer">
        <div v-html="apiData.logoSvg"></div>
      </a>
      <p><br /></p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

// Fetch API data
const { data: apiData } = await useFetch("/api/whoweare");

// State for tracking which dropdown is open
const dropdowns = ref({
  aboutUs: false,
  disclaimer: false,
  termsAndConditions: false,
  ourVision: false,
  contactUs: false,
});

// Section configuration
const sections = [
  { name: "aboutUs", title: "About Us", style: "bg-blue-100 border-blue-500 text-blue-700" },
  { name: "disclaimer", title: "Disclaimer", style: "bg-yellow-100 border-yellow-500 text-yellow-700" },
  { name: "termsAndConditions", title: "Terms and Conditions", style: "bg-red-100 border-red-500 text-red-700" },
  { name: "ourVision", title: "Our Vision", style: "bg-purple-100 border-purple-500 text-purple-700" },
  { name: "contactUs", title: "Contact Us", style: "bg-green-100 border-green-500 text-green-700" },
];

// Toggle dropdown logic
const toggleDropdown = (dropdown) => {
  dropdowns.value = { ...dropdowns.value, [dropdown]: !dropdowns.value[dropdown] };
  Object.keys(dropdowns.value).forEach(key => {
    if (key !== dropdown) dropdowns.value[key] = false;
  });
};

// Transition logic for all dropdowns
const applyTransition = (el, { opacityStart, opacityEnd, heightStart, heightEnd }) => {
  el.style.opacity = opacityStart;
  el.style.height = heightStart;
  nextTick(() => {
    el.style.transition = "height 0.5s ease, opacity 0.5s ease";
    el.style.opacity = opacityEnd;
    el.style.height = heightEnd;
  });
};

const beforeEnter = (el) => applyTransition(el, { opacityStart: "0", opacityEnd: "1", heightStart: "0", heightEnd: `${el.scrollHeight}px` });

const enter = (el, done) => {
  applyTransition(el, { opacityStart: "0", opacityEnd: "1", heightStart: "0", heightEnd: `${el.scrollHeight}px` });
  setTimeout(done, 500); // Ensure transition completes
};

const leave = (el, done) => {
  applyTransition(el, { opacityStart: "1", opacityEnd: "0", heightStart: `${el.scrollHeight}px`, heightEnd: "0" });
  setTimeout(done, 500); // Ensure transition completes
};
</script>


<style scoped>
/* Initial state for the dropdown content */
.dropdown-content {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  transform-origin: top;
}
</style>
