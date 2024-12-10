<script setup>
// import { RouterLink } from "vue-router";
import { ref, onMounted, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

import {
  TempChartOptions,
  getMaxTemp,
  getMinTemp,
  getSevenLastTempData,
  sevenTempDataC,
  sevenTempDataF,
  formattedSevenLastTempData,
  maxTemp,
  minTemp,
  formattedMaxTempFullDate,
  formattedMinTempFullDate,
} from "@/composables/TempChart.js";
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
} from "@/composables/humidChart.js";

const minMax = ref({
  isToggled: true,
  toggledMinMax() {
    this.isToggled = !this.isToggled;
  },
});

// watch untuk memantau perubahan data dan memperbarui chartOptions
watch(
  [
    TempChartOptions,
    sevenTempDataC,
    sevenTempDataF,
    formattedSevenLastTempData,
    humidChartOptions,
    formattedSevenLastHumidData,
  ],
  () => {
    TempChartOptions.value.xaxis.categories = [
      ...formattedSevenLastTempData.value,
    ].reverse();
    TempChartOptions.value.series = [
      {
        name: "Temperature (°F)",
        data: [...sevenTempDataF.value].reverse(),
        color: "#7E3BF2",
      },
      {
        name: "Temperature (°C)",
        data: [...sevenTempDataC.value].reverse(),
        color: "#1A56DB",
      },
    ];

    humidChartOptions.value.series[0].data = formattedSevenLastHumidData.value;
  }
);

onMounted(async () => {
  // fetchSensors();
  await getMaxTemp();
  await getMinTemp();
  await getSevenLastTempData();

  await getMaxHumid();
  await getMinHumid();
  await getSevenLastHumidData();
});
</script>

<template>
  <!-- Temperature Chart -->
  <div
    class="max-w-[75rem] w-full bg-white rounded-2xl shadow border-gray-400 border mx-auto"
  >
    <!-- Show Min/Max Temperature -->
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-if="minMax.isToggled"
    >
      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{ maxTemp ? maxTemp.temperature_C.toFixed(2) : "Loading..." }}&deg;C
          <span class="text-primary-700">&#8776;</span>
          {{ maxTemp ? maxTemp.temperature_F.toFixed(2) : "Loading..." }}&deg;F
        </h5>
        <p class="text-base font-normal text-gray-500 text-center">
          Maximum temperature ever recorded
        </p>
      </div>
      <span
        ><i
          class="fa-solid fa-repeat hidden md:inline-flex text-xl mt-3 mr-[2.90rem] text-gray-700 hover:text-gray-900"
        ></i
      ></span>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-primary-500 text-center"
      >
        {{ formattedMaxTempFullDate || "Loading..." }}
        <i class="fa-solid fa-arrow-up ms-2"></i>
      </div>
    </div>
    <div
      class="flex justify-between p-4 md:p-6 pb-0 md:pb-0 select-none cursor-pointer"
      @click="minMax.toggledMinMax"
      v-else
    >
      <div>
        <h5
          class="leading-none text-lg md:text-3xl font-bold text-gray-900 text-center"
        >
          {{ minTemp ? minTemp.temperature_C : "Loading..." }}&deg;C
          <span class="text-primary-700">&#8776;</span>
          {{ minTemp ? minTemp.temperature_F : "Loading..." }}&deg;F
        </h5>
        <p class="text-base font-normal text-gray-500 text-center">
          Minimum temperature ever recorded
        </p>
      </div>
      <span
        ><i
          class="fa-solid fa-repeat hidden md:inline-flex text-xl mt-3 mr-[2.55rem] text-center text-gray-700 hover:text-gray-900"
        ></i
      ></span>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-[#DFA301] text-center"
      >
        {{ formattedMinTempFullDate || "Loading..." }}
        <i class="fa-solid fa-arrow-up ms-2"></i>
      </div>
    </div>

    <!-- Show Chart -->
    <div
      id="labels-chart"
      class="px-2.5 my-5"
      v-if="sevenTempDataC.length && sevenTempDataF.length"
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
          class="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
          type="button"
        >
          Last seven recorded data
        </span>
      </div>
    </div>
  </div>

  <!-- Humidity Chart -->
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
        {{ formattedMaxHumidFullDate || "Loading..." }}
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
          {{ maxHumid ? maxHumid.humidity.toFixed(2) : "Loading..." }}&percnt;
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
        {{ formattedMinHumidFullDate || "Loading..." }}
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
          {{ minHumid ? minHumid.humidity.toFixed(2) : "Loading..." }}&percnt;
        </h5>
        <p class="text-base font-normal text-gray-500 text-center">
          Minimum humidity ever recorded
        </p>
      </div>
    </div>

    <!-- Show Chart -->
    <div
      id="column-chart"
      class="px-2.5 my-3"
      v-if="sevenTempDataC.length && sevenTempDataF.length"
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
          Last seven recorded data
        </span>

        <!-- <div data-dial-init class="flex group">
          <div
            id="speed-dial-menu-horizontal"
            class="flex items-center hidden me-4 space-x-2 rtl:space-x-reverse"
          >
            <button
              type="button"
              data-tooltip-target="tooltip-share"
              data-tooltip-placement="top"
              class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"
                />
              </svg>
              <span class="sr-only">Share</span>
            </button>
            <div
              id="tooltip-share"
              role="tooltip"
              class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Share
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              type="button"
              data-tooltip-target="tooltip-print"
              data-tooltip-placement="top"
              class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z" />
                <path
                  d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"
                />
              </svg>
              <span class="sr-only">Print</span>
            </button>
            <div
              id="tooltip-print"
              role="tooltip"
              class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Print
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              type="button"
              data-tooltip-target="tooltip-download"
              data-tooltip-placement="top"
              class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"
                />
                <path
                  d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Download</span>
            </button>
            <div
              id="tooltip-download"
              role="tooltip"
              class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Download
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              type="button"
              data-tooltip-target="tooltip-copy"
              data-tooltip-placement="top"
              class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path
                  d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"
                />
                <path
                  d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"
                />
              </svg>
              <span class="sr-only">Copy</span>
            </button>
            <div
              id="tooltip-copy"
              role="tooltip"
              class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Copy
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-horizontal"
            aria-controls="speed-dial-menu-horizontal"
            aria-expanded="false"
            class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              class="w-5 h-5 transition-transform group-hover:rotate-45"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span class="sr-only">Open actions menu</span>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
