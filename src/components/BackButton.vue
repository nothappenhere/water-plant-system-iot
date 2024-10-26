<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div class="container flex justify-between m-auto py-6 md:px-12 px-5">
      <RouterLink
        to="/"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        <i class="fas fa-arrow-left mr-2 mt-1"></i> Back to Homepage
      </RouterLink>
      <h1
        class="md:text-3xl font-bold text-lg text-gray-900 select-none hidden md:inline-flex"
      >
        Temperature
      </h1>
      <RouterLink
        to="/hum"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        Next to Humidity <i class="fas fa-arrow-right ml-2 mt-1"></i>
      </RouterLink>
    </div>
  </section>
</template>
