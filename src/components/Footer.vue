<script setup>
const date = new Date();
const year = date.getFullYear();
</script>

<template>
  <footer class="bg-primary-700 shadow-xl mt-[1.6rem]">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <span class="block text-md text-white text-center"
        >&copy; {{ year }} WPS&trade;. Made with
        <span class="text-red-600">&hearts;</span> by
        <a
          href="https://www.linkedin.com/in/mhmmdrzkyakbr/"
          target="_blank"
          class="hover:underline text-zinc-300"
          >Muhammad Rizky Akbar</a
        >.</span
      >
    </div>
  </footer>
</template>
