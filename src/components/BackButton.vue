<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { currentSensorValue } from "@/utility/currentSensorValue";

// Mengakses informasi tentang route yang sedang aktif
const route = useRoute();
// Fungsi computed untuk mengecek path aktif
const activePath = computed(() => route.path);
</script>

<template>
  <section v-if="activePath === '/tempHumid'">
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
          ({{ currentSensorValue.celciusDegree || "Loading..." }}&deg;C &#8776;
          {{ currentSensorValue.fahrenheitDegree || "Loading..." }}&deg;F)
          &VerticalSeparator;&VerticalSeparator; ({{
            currentSensorValue.humidityPercent || "Loading..."
          }}&percnt;)
        </h1>
        <p class="text-gray-600">Current Temperature & Humidity</p>
      </div>

      <RouterLink
        to="/soilMoist"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        Next to Soil Moist <i class="fas fa-arrow-right ml-2 mt-1"></i>
      </RouterLink>
    </div>
  </section>

  <section v-else-if="activePath === '/soilMoist'">
    <div class="container flex justify-between m-auto py-6 md:px-12 px-5">
      <RouterLink
        to="/tempHumid"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        <i class="fas fa-arrow-left mr-2 mt-1"></i> Back to Temp & Hum
      </RouterLink>

      <div class="flex flex-col items-center justify-center">
        <h1
          class="md:text-3xl font-bold text-lg text-gray-900 select-none hidden md:inline-flex"
        >
          ({{ currentSensorValue.soilMoistPercent || "Loading..." }}&percnt;)
        </h1>
        <p class="text-gray-600">Current Soil Moisture</p>
      </div>

      <RouterLink
        to="/waterLvl"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        Next to W-Lvl <i class="fas fa-arrow-right ml-2 mt-1"></i>
      </RouterLink>
    </div>
  </section>

  <section v-else-if="activePath === '/waterLvl'">
    <div class="container flex justify-between m-auto py-6 md:px-12 px-5">
      <RouterLink
        to="/soilMoist"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        <i class="fas fa-arrow-left mr-2 mt-1"></i> Back to Soil Moist
      </RouterLink>

      <div class="flex flex-col items-center justify-center">
        <h1
          class="md:text-3xl font-bold text-lg text-gray-900 select-none hidden md:inline-flex"
        >
          ({{ currentSensorValue.waterLevel || "Loading..." }})
        </h1>
        <p class="text-gray-600">Current Water Level</p>
      </div>

      <RouterLink
        to="/"
        class="text-primary-500 hover:text-primary-700 flex items-center"
      >
        Next to Homepage <i class="fas fa-arrow-right ml-2 mt-1"></i>
      </RouterLink>
    </div>
  </section>
</template>
