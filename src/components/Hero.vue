<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import mockup from "@/assets/img/mockup.jpg";

defineProps({
  title: {
    type: String,
    default: "Water Plant System: Automate Your Garden's Care",
  },
  subtitle: {
    type: String,
    default:
      "Water Plant System automates watering to keep plants vibrant. With moisture sensors and real-time controls, your plants get optimal care, whether you’re home or away.",
  },
});
</script>

<template>
  <section class="bg-zinc-100">
    <div
      class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <div class="mr-auto ml-5 place-self-center lg:col-span-7">
        <h1
          class="max-w-2xl mb-3 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl"
        >
          {{ title }}
        </h1>
        <p
          class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl"
        >
          {{ subtitle }}
        </p>
        <RouterLink
          to="/tempHumid"
          class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-500"
        >
          Get started
          <svg
            class="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </RouterLink>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img :src="mockup" alt="hero-mockup" />
      </div>
    </div>
  </section>
</template>
