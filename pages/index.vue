<template>
  <div>
  <FlashMessage />
  </div>
  <section class="text-center py-10 bg-cover bg-center relative custom-background">
    <div class="absolute inset-0 bg-gray-50 bg-opacity-50"></div> <!-- Optional: overlay to improve text readability -->
    <div class="container mx-auto relative z-10">
      <CTAComponent />
      <p class="my-5"></p>
      <div class="flex flex-col lg:flex-row items-stretch">
        <GridComponent class="w-full lg:w-2/3 xl:w-3/4 flex-grow flex-shrink-0 basis-0 mr-0 lg:mr-20" />
        <div class="h-2 bg-gray-300 my-4 lg:my-0 lg:h-auto md:w-0.5 mx-20 ml-10"></div>
        <Card class="flex-shrink-0 basis-auto ml-0 lg: mx-auto" />
      </div>
    </div>
  </section>
</template>

<script setup>
import FlashMessage from '~/components/FlashMessage.vue';
</script>


<style>
body {
  margin: 0;
  padding: 0;
}
.custom-background {
  background-image: url('https://source.unsplash.com/random');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* Subtract the total height of other elements from 100vh */
  min-height: calc(100vh - 10vh - 20px); 
  box-sizing: border-box;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-background {
    /* Reduce the subtracted value if your header/footer is smaller on mobile */
    min-height: calc(100vh - 5vh - 10px);
  }

  .text-center {
    padding: 5vh 5%; /* Adjust padding for smaller screens */
    font-size: calc(12px + 1vw); /* Example of responsive font size */
  }

  .container {
    padding: 0 4%; /* Adjust container padding on smaller screens */
  }

  /* Adjust flex layout for smaller screens */
  .flex-col, .flex-row {
    flex-direction: column;
  }
}

/* Consider additional breakpoints as needed */
@media (max-width: 480px) {
  /* Further adjustments for very small screens */
}

</style>
