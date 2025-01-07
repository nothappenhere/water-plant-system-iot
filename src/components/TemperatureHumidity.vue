<script setup>
import { ref, onMounted, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import {
  TempChartOptions,
  getMaxTemp,
  getMinTemp,
  getSevenLastTempData,
  sevenDataCelciusDegree,
  sevenDataFahrenheitDegree,
  formattedSevenLastTempData,
  maxTemp,
  minTemp,
  formattedMaxTempFullDate,
  formattedMinTempFullDate,
} from "@/utility/tempChart";
import {
  humidChartOptions,
  getMaxHumid,
  getMinHumid,
  getSevenLastHumidData,
  formattedSevenLastHumidData,
  maxHumid,
  minHumid,
  formattedMaxHumidFullDate,
  formattedMinHumidFullDate,
} from "@/utility/humidChart";

// State untuk toggle
const minMax = ref({
  isToggled: true,
  toggledMinMax() {
    this.isToggled = !this.isToggled;
  },
});

// watch untuk memperbarui chart options saat data berubah
watch(
  [
    TempChartOptions,
    sevenDataCelciusDegree,
    sevenDataFahrenheitDegree,
    formattedSevenLastTempData,
  ],
  () => {
    TempChartOptions.value.xaxis.categories = [
      ...formattedSevenLastTempData.value,
    ].reverse();
    TempChartOptions.value.series = [
      {
        name: "Temperature (°F)",
        data: [...sevenDataFahrenheitDegree.value].reverse(),
        color: "#7E3BF2",
      },
      {
        name: "Temperature (°C)",
        data: [...sevenDataCelciusDegree.value].reverse(),
        color: "#1A56DB",
      },
    ];
  },
  { immediate: true } // Memastikan watch langsung dipanggil saat mounted
);

watch(
  [humidChartOptions, formattedSevenLastHumidData],
  () => {
    humidChartOptions.value.series[0].data = [
      ...formattedSevenLastHumidData.value,
    ].reverse();
  },
  { immediate: true } // Memastikan watch langsung dipanggil saat mounted
);

// Ambil data saat komponen dimuat
onMounted(async () => {
  // Paralelkan pemanggilan data agar lebih cepat
  await Promise.all([
    getMaxTemp(),
    getMinTemp(),
    getSevenLastTempData(),
    getMaxHumid(),
    getMinHumid(),
    getSevenLastHumidData(),
  ]);
});
</script>

<template>
  <!-- Temperature Chart -->
  <div
    class="max-w-[75rem] w-full bg-white rounded-2xl shadow border-gray-400 border mx-auto"
  >
    <!-- Show Max Temperature -->
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-if="minMax.isToggled"
    >
      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{ maxTemp ? maxTemp.temperature_C : "Loading..." }}&deg;C &#8776;
          {{ maxTemp ? maxTemp.temperature_F : "Loading..." }}&deg;F
        </h5>
        <p class="text-base font-normal text-gray-600 text-center">
          Highest temperature recorded
        </p>
      </div>

      <span class="flex items-center justify-center">
        <i
          class="fa-solid fa-repeat text-xl hidden md:inline-flex text-gray-700 hover:text-gray-900"
        ></i>
      </span>

      <div
        class="flex items-center justify-center md:px-2.5 md:py-0.5 text-base font-semibold text-center"
      >
        {{ formattedMaxTempFullDate || "Loading..." }}
        <i class="fa-regular fa-clock ms-2"></i>
      </div>
    </div>
    <!-- Show Min Temperature -->
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-else
    >
      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{ minTemp ? minTemp.temperature_C : "Loading..." }}&deg;C &#8776;
          {{ minTemp ? minTemp.temperature_F : "Loading..." }}&deg;F
        </h5>
        <p class="text-base font-normal text-gray-600 text-center">
          Lowest temperature recorded
        </p>
      </div>

      <span class="flex items-center justify-center">
        <i
          class="fa-solid fa-repeat text-xl text-gray-700 hover:text-gray-900"
        ></i>
      </span>

      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-center"
      >
        {{ formattedMinTempFullDate || "Loading..." }}
        <i class="fa-regular fa-clock ms-2"></i>
      </div>
    </div>

    <!-- Show Chart -->
    <div
      id="labels-chart"
      class="px-2.5 my-5"
      v-if="sevenDataCelciusDegree.length && sevenDataFahrenheitDegree.length"
    >
      <VueApexCharts
        :type="TempChartOptions.chart.type"
        :options="TempChartOptions"
        :series="TempChartOptions.series"
        :height="TempChartOptions.chart.height"
        :width="TempChartOptions.chart.width"
      />
    </div>

    <div
      class="grid grid-cols-1 items-center border-gray-400 border-t rounded-b-2xl justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0"
    >
      <div class="flex justify-center items-center pt-5">
        <!-- Button -->
        <span
          class="text-sm font-medium text-gray-600 hover:text-gray-900 text-center inline-flex items-center"
          type="button"
        >
          Last seven temperature data
        </span>
      </div>
    </div>
  </div>

  <!-- Humidity Chart -->
  <div
    class="max-w-[75rem] w-full bg-white rounded-2xl shadow border-gray-400 border mx-auto mb-20 mt-6"
  >
    <!-- Show Max Humidity -->
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-if="minMax.isToggled"
    >
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-center"
      >
        <i class="fa-regular fa-clock me-2"></i>
        {{ formattedMaxHumidFullDate || "Loading..." }}
      </div>

      <span class="flex items-center justify-center">
        <i
          class="fa-solid fa-repeat text-xl text-gray-700 hover:text-gray-900"
        ></i>
      </span>

      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{ maxHumid ? maxHumid.humidity : "Loading..." }}&percnt;
        </h5>
        <p class="text-base font-normal text-gray-600 text-center">
          Highest humidity recorded
        </p>
      </div>
    </div>
    <!-- Show Min Humidity -->
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-else
    >
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-center"
      >
        <i class="fa-regular fa-clock me-2"></i>
        {{ formattedMinHumidFullDate || "Loading..." }}
      </div>

      <span class="flex items-center justify-center">
        <i
          class="fa-solid fa-repeat text-xl text-gray-700 hover:text-gray-900"
        ></i>
      </span>

      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{ minHumid ? minHumid.humidity : "Loading..." }}&percnt;
        </h5>
        <p class="text-base font-normal text-gray-600 text-center">
          Lowest humidity recorded
        </p>
      </div>
    </div>

    <!-- Show Chart -->
    <div
      id="column-chart"
      class="px-2.5 my-3"
      v-if="formattedSevenLastHumidData.length"
    >
      <VueApexCharts
        :type="humidChartOptions.chart.type"
        :options="humidChartOptions"
        :series="humidChartOptions.series"
        :height="humidChartOptions.chart.height"
        :width="humidChartOptions.chart.width"
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
          Last seven humidity data
        </span>
      </div>
    </div>
  </div>
</template>
