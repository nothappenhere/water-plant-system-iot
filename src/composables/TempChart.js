import { ref } from "vue";
import ApexCharts from "apexcharts";
import axios from "axios";
import moment from "moment-timezone";

let maxTemp = ref(null);
// GET maximum temperature
async function getMaxTemp() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/dht/temp/max"
    );
    if (response.data.length > 0) {
      maxTemp.value = response.data[0];

      // Format timestamp untuk maxTemp
      formatTimestamp(maxTemp.value.timestamp, "max");
    } else {
      maxTemp.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let minTemp = ref(null);
// GET minimum temperature
async function getMinTemp() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/dht/temp/min"
    );
    if (response.data.length > 0) {
      minTemp.value = response.data[0];

      // Format timestamp untuk minTemp
      formatTimestamp(minTemp.value.timestamp, "min");
    } else {
      minTemp.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let sevenLastTempData = ref([]);
let sevenTempDataC = ref([]);
let sevenTempDataF = ref([]);
// GET seven last data temperature
async function getSevenLastTempData() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/dht/temp"
    );
    if (response.data.length) {
      sevenLastTempData.value = response.data;
      sevenTempDataC.value = [];
      sevenTempDataF.value = [];
      formattedSevenLastTempData.value = [];

      // Process the data
      sevenLastTempData.value.forEach((data) => {
        sevenTempDataC.value.push(data.temperature_C);
        sevenTempDataF.value.push(data.temperature_F);

        formatTimestamp(data.timestamp, "all");
      });
    } else {
      sevenLastTempData.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let formattedMaxTempFullDate = ref("");
let formattedMinTempFullDate = ref("");
let formattedSevenLastTempData = ref([]);
// Formatted date
function formatTimestamp(timestamp, type) {
  // Cek apakah timestamp sudah dalam UTC atau sudah di zona waktu lokal
  const momentTimestamp = moment(timestamp).isValid()
    ? moment(timestamp).tz("Asia/Jakarta", true)
    : moment.utc(timestamp).tz("Asia/Jakarta");

  const day = String(momentTimestamp.date()).padStart(2, "0"); // Mengambil hari
  const fullMonth = momentTimestamp.format("MMMM"); // Mengambil bulan penuh
  const month = momentTimestamp.format("MMM"); // Mengambil bulan singkat (contoh: Jan, Feb, Mar)
  const year = momentTimestamp.year(); // Mengambil tahun
  const time = momentTimestamp.format("HH:mm:ss"); // Mengambil waktu dalam format HH:mm:ss

  if (type === "max") {
    formattedMaxTempFullDate.value = `${day} ${fullMonth} ${year}`;
  } else if (type === "min") {
    formattedMinTempFullDate.value = `${day} ${fullMonth} ${year}`;
    // formattedMinTempPartialDate.value = `${day} ${month} ${year}, ${time}`;
  } else if (type === "all") {
    // Format full date and time for each data point
    const formattedDate = `${day} ${month} ${year}, ${time}`;
    formattedSevenLastTempData.value.push(formattedDate); // Push formatted date
  }
}

const TempChartOptions = ref({
  // set the labels option to true to show the labels on the X and Y axis
  xaxis: {
    show: true,
    categories: formattedSevenLastTempData.value.length
      ? [...formattedSevenLastTempData.value].reverse()
      : ["No Data"],
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
    tickAmount: 2,
    min: 0,
    max: 100,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500",
      },
      formatter: function (value) {
        return `${value}°C`;
      },
    },
  },
  series: [
    {
      name: "Temperature (°F)",
      data: sevenTempDataF.value.length
        ? [...sevenTempDataF.value].reverse()
        : [0],
      color: "#7E3BF2",
    },
    {
      name: "Temperature (°C)",
      data: sevenTempDataC.value.length
        ? [...sevenTempDataC.value].reverse()
        : [0],
      color: "#1A56DB",
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
    y: {
      formatter: function (value, { seriesIndex }) {
        if (seriesIndex === 0) {
          return `${value}°F`; // Data untuk Fahrenheit
        } else if (seriesIndex === 1) {
          return `${value}°C`; // Data untuk Celsius
        }
        return value; // Jika tidak sesuai
      },
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
    enabled: true,
  },
  stroke: {
    width: 6,
  },
  legend: {
    show: true,
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
    TempChartOptions
  );
  chart.render();
}

export {
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
};
