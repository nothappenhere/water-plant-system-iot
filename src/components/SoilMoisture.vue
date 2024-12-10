<script setup>
import { ref, onMounted, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

import {
  soilChartOptions,
  getMaxSoil,
  getMinSoil,
  getSevenLastSoilData,
  formattedSevenLastSoilData,
  maxSoil,
  minSoil,
  formattedMaxSoilFullDate,
  formattedMinSoilFullDate,
} from "@/composables/SoilChart.js";

const minMax = ref({
  isToggled: true,
  toggledMinMax() {
    this.isToggled = !this.isToggled;
  },
});

// watch untuk memantau perubahan data dan memperbarui chartOptions
watch([soilChartOptions, formattedSevenLastSoilData], () => {
  soilChartOptions.value.series[0].data = formattedSevenLastSoilData.value;
});

onMounted(async () => {
  // fetchSensors();
  await getMaxSoil();
  await getMinSoil();
  await getSevenLastSoilData();
});
</script>

<template>
  <!-- Soil Moisture Chart -->
  <div
    class="max-w-[75rem] w-full bg-white rounded-2xl shadow border-gray-400 border mx-auto mb-20 mt-6"
  >
    <!-- Show Min/Max Temperature -->
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-if="minMax.isToggled"
    >
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-primary-500 text-center"
      >
        {{ formattedMaxSoilFullDate || "Loading..." }}
        <i class="fa-solid fa-arrow-up ms-2"></i>
      </div>

      <span class="flex items-center justify-center">
        <i
          class="fa-solid fa-repeat hidden md:inline-flex text-xl text-gray-700 hover:text-gray-900"
        ></i>
      </span>

      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{
            maxSoil ? maxSoil.soil_moisture.toFixed(2) : "Loading..."
          }}&percnt;
        </h5>
        <p class="text-base font-normal text-gray-500 text-center">
          Maximum humidity ever recorded
        </p>
      </div>
    </div>

    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-else
    >
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-[#DFA301] text-center"
      >
        {{ formattedMinSoilFullDate || "Loading..." }}
        <i class="fa-solid fa-arrow-up ms-2"></i>
      </div>

      <span class="flex items-center justify-center">
        <i
          class="fa-solid fa-repeat hidden md:inline-flex text-xl text-gray-700 hover:text-gray-900"
        ></i>
      </span>

      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{
            minSoil ? minSoil.soil_moisture.toFixed(2) : "Loading..."
          }}&percnt;
        </h5>
        <p class="text-base font-normal text-gray-500 text-center">
          Minimum humidity ever recorded
        </p>
      </div>
    </div>

    <!-- Show Chart -->
    <div id="column-chart" class="px-2.5 my-3">
      <VueApexCharts
        :type="soilChartOptions.chart.type"
        :options="soilChartOptions"
        :series="soilChartOptions.series"
        :height="soilChartOptions.chart.height"
        :width="soilChartOptions.chart.width"
      />
    </div>

    <div
      class="grid grid-cols-1 items-center border-gray-400 border-t rounded-b-2xl justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0"
    >
      <div class="flex justify-center items-center pt-5">
        <!-- Button -->
        <span
          class="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
          type="button"
        >
          Last seven recorded data
        </span>
      </div>
    </div>
  </div>
</template>
