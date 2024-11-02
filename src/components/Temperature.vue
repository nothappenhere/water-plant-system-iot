<script setup>
// import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from "apexcharts";
import axios from "axios";

let sensors = ref([]);
let maxTemp = ref(null);
let minTemp = ref(null);
let formattedFullDate = ref("");
let formattedPartialDate = ref("");

async function fetchSensors() {
  const response = await axios.get("http://localhost:8000/api/sensors");
  sensors.value = response.data;
}

// GET maximum temperature
async function getMaxTemp() {
  const response = await axios.get(
    "http://localhost:8000/api/sensors/max/temp"
  );
  if (response.data.length > 0) {
    maxTemp.value = response.data[0];

    formatTimestamp(maxTemp.value.timestamp);
  } else {
    maxTemp.value = null;
  }
}

// GET minimum temperature
async function getMinTemp() {
  const response = await axios.get(
    "http://localhost:8000/api/sensors/min/temp"
  );
  if (response.data.length > 0) {
    minTemp.value = response.data[0];
    formatTimestamp(minTemp.value.timestamp);
  } else {
    minTemp.value = null;
  }
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getUTCDate()).padStart(2, "0"); // Mengambil hari dan menambahkan 0 di depan jika kurang dari 10
  const fullMonth = date.toLocaleString("default", { month: "long" });
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getUTCMonth()]; // Mengambil bulan dalam format singkat
  const year = date.getUTCFullYear(); // Mengambil tahun
  const time = date.toUTCString().split(" ")[4]; // Mengambil waktu dalam format HH:MM:SS

  formattedFullDate.value = `${day} ${fullMonth} ${year}`;
  formattedPartialDate.value = `${day} ${month} ${year}, ${time}`;
}

const minMax = ref({
  isToggled: true,
  toggledMinMax() {
    this.isToggled = !this.isToggled;
    console.log(this.isToggled);
  },
});

const chartOptions = ref({
  // set the labels option to true to show the labels on the X and Y axis
  xaxis: {
    show: true,
    categories: [
      "01 Feb, 00:44:34",
      "02 Feb, 00:44:34",
      "03 Feb, 00:44:34",
      "04 Feb, 00:44:34",
      "05 Feb, 00:44:34",
      "06 Feb, 00:44:34",
      "07 Feb, 00:44:34",
    ],
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
      formatter: function (value) {
        return "$" + value;
      },
    },
  },
  series: [
    {
      name: "Maximum Temperature",
      data: [150, 141, 145, 152, 135, 125],
      color: "#1A56DB",
    },
    {
      name: "Minimum Temperature",
      data: [43, 13, 65, 12, 42, 73],
      color: "#7E3BF2",
    },
  ],
  chart: {
    sparkline: {
      enabled: false,
    },
    height: "100%",
    width: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  legend: {
    show: false,
  },
  grid: {
    show: true,
    strokeDashArray: 10,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
});

if (
  document.getElementById("labels-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("labels-chart"),
    chartOptions
  );
  chart.render();
}

onMounted(() => {
  fetchSensors();
  getMaxTemp();
  getMinTemp();
});
</script>

<template>
  <div
    class="max-w-[75rem] w-full bg-white rounded-2xl shadow dark:bg-gray-800 border-gray-400 border mx-auto"
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
          {{ maxTemp ? maxTemp.temperature_C : "Loading..." }}&deg;C
          <span class="text-primary-700">&#8776;</span>
          {{ maxTemp ? maxTemp.temperature_F : "Loading..." }}&deg;F
        </h5>
        <p class="text-base font-normal text-gray-500 text-center">
          Max Temperature
        </p>
      </div>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-primary-500 text-center"
      >
        {{ formattedFullDate || "Loading..." }}
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
          Min Temperature
        </p>
      </div>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-red-500 text-center"
      >
        {{ formattedFullDate || "Loading..." }}
        <i class="fa-solid fa-arrow-down ms-2"></i>
      </div>
    </div>

    <!-- Show Chart -->
    <div id="labels-chart" class="px-2.5">
      <VueApexCharts
        :type="chartOptions.chart.type"
        :options="chartOptions"
        :series="chartOptions.series"
        :height="chartOptions.chart.height"
        :width="chartOptions.chart.width"
      />
    </div>

    <div
      class="grid grid-cols-1 items-center border-gray-400 border-t rounded-b-2xl justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0"
    >
      <div class="flex justify-between items-center pt-5">
        <!-- Button -->
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="lastDaysdropdown"
          data-dropdown-placement="bottom"
          class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
          type="button"
        >
          Last 7 days
          <svg
            class="w-2.5 m-2.5 ms-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div
          id="lastDaysdropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Yesterday</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Today</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Last 7 days</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Last 30 days</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Last 90 days</a
              >
            </li>
          </ul>
        </div>
        <a
          href="#"
          class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
        >
          Sales Report
          <svg
            class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
