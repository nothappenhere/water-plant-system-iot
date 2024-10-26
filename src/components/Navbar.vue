<script setup>
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/img/logo.png";

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-white border-gray-200 md:border-b border-b-2 font-poppins">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <!-- Logo Icon -->
      <RouterLink to="/" class="flex items-center space-x-3">
        <img :src="logo" class="h-10" alt="wps-logo" />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap select-none hidden sm:inline"
          >Water Plant System</span
        >
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap select-none sm:hidden"
          >WPS</span
        >
      </RouterLink>

      <!-- CTA -->
      <div class="flex md:order-2 space-x-3 md:space-x-0">
        <a
          href="https://github.com/nothappenhere/water-plant-system-iot"
          target="_blank"
        >
          <button
            type="button"
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-2 text-center"
          >
            <i class="fa-brands fa-github text-xl"></i>
          </button>
        </a>
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0"
        >
          <li>
            <RouterLink
              to="/"
              :class="[
                isActiveLink('/')
                  ? 'md:bg-primary-700 md:hover:bg-gray-800 md:text-white bg-blue-700 text-white'
                  : 'md:hover:bg-gray-800 md:hover:text-white md:text-black hover:bg-gray-200',
                'block',
                'py-2',
                'px-3',
                'md:py-1',
                'text-gray-900',
                'rounded',
              ]"
              aria-current="page"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/temp"
              :class="[
                isActiveLink('/temp')
                  ? 'md:bg-primary-700 md:hover:bg-gray-800 md:text-white bg-blue-700 text-white'
                  : 'md:hover:bg-gray-800 md:hover:text-white md:text-black hover:bg-gray-200',
                'block',
                'py-2',
                'px-3',
                'md:py-1',
                'text-gray-900',
                'rounded',
              ]"
              >Temperature</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/hum"
              :class="[
                isActiveLink('/hum')
                  ? 'md:bg-primary-700 md:hover:bg-gray-800 md:text-white bg-blue-700 text-white'
                  : 'md:hover:bg-gray-800 md:hover:text-white md:text-black hover:bg-gray-200',
                'block',
                'py-2',
                'px-3',
                'md:py-1',
                'text-gray-900',
                'rounded',
              ]"
              >Humidity</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/w-lvl"
              :class="[
                isActiveLink('/w-lvl')
                  ? 'md:bg-primary-700 md:hover:bg-gray-800 md:text-white bg-blue-700 text-white'
                  : 'md:hover:bg-gray-800 md:hover:text-white md:text-black hover:bg-gray-200',
                'block',
                'py-2',
                'px-3',
                'md:py-1',
                'text-gray-900',
                'rounded',
              ]"
              >W-Level</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
