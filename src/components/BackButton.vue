<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { tempHumid } from "@/composables/useTempHumid"; // Path ke file composable

// Mengakses informasi tentang route yang sedang aktif
const route = useRoute();

// Fungsi computed untuk mengecek path aktif
const activePath = computed(() => route.path);
</script>

<template>
  <section v-if="activePath === '/tempHum'">
    <div class="container flex justify-between m-auto py-6 md:px-12 px-5">
      <RouterLink
        to="/"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        <i class="fas fa-arrow-left mr-2 mt-1"></i> Back to Homepage
      </RouterLink>
      <div class="flex flex-col items-center justify-center">
        <h1
          class="md:text-3xl font-bold text-lg text-gray-900 select-none hidden md:inline-flex"
        >
          ({{ tempHumid.suhuCelcius || "Loading..." }}&deg;C &#8776;
          {{ tempHumid.suhuFahrenheit || "Loading..." }}&deg;F)
          &VerticalSeparator;&VerticalSeparator; ({{
            tempHumid.kelembapan || "Loading..."
          }}%)
        </h1>
        <p class="text-gray-600">Current Temperature & Humidity</p>
      </div>
      <RouterLink
        to="/soil"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        Next to Soil Moist <i class="fas fa-arrow-right ml-2 mt-1"></i>
      </RouterLink>
    </div>
  </section>

  <section v-else-if="activePath === '/soil'">
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
        Soil Moisture
      </h1>
      <RouterLink
        to="/hum"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        Next to W-Lvl <i class="fas fa-arrow-right ml-2 mt-1"></i>
      </RouterLink>
    </div>
  </section>
</template>
