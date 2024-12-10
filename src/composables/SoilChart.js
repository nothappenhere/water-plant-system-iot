import { ref } from "vue";
import ApexCharts from "apexcharts";
import axios from "axios";
import moment from "moment-timezone";

let maxSoil = ref(null);
// GET maximum temperature
async function getMaxSoil() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/soil/max"
    );
    if (response.data.length > 0) {
      maxSoil.value = response.data[0];

      // Format timestamp untuk maxSoil
      formatTimestamp(maxSoil.value.timestamp, "max");
    } else {
      maxSoil.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let minSoil = ref(null);
// GET minimum temperature
async function getMinSoil() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/soil/min"
    );
    if (response.data.length > 0) {
      minSoil.value = response.data[0];

      // Format timestamp untuk minSoil
      formatTimestamp(minSoil.value.timestamp, "min");
    } else {
      minSoil.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let sevenLastSoilData = ref([]);
let formattedSevenLastSoilData = ref([]);
// GET seven last data temperature
async function getSevenLastSoilData() {
  try {
    const response = await axios.get("http://localhost:8000/api/sensors/soil");
    if (response.data.length) {
      sevenLastSoilData.value = response.data;

      // Format data untuk chart
      formattedSevenLastSoilData.value = sevenLastSoilData.value.map(
        (data) => ({
          x: moment(data.timestamp)
            .tz("Asia/Jakarta")
            .format("DD MMM YYYY, HH:mm:ss"),
          y: parseFloat(data.soil_moisture), // Nilai kelembapan
        })
      );
    } else {
      sevenLastSoilData.value = [];
      formattedSevenLastSoilData.value = [];
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let formattedMaxSoilFullDate = ref("");
let formattedMinSoilFullDate = ref("");
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
    formattedMaxSoilFullDate.value = `${day} ${fullMonth} ${year}`;
  } else if (type === "min") {
    formattedMinSoilFullDate.value = `${day} ${fullMonth} ${year}`;
    // formattedMinSoilPartialDate.value = `${day} ${month} ${year}, ${time}`;
  } else if (type === "all") {
    // Format full date and time for each data point
    const formattedDate = `${day} ${month} ${year}, ${time}`;
    formattedSevenLastSoilData.value.push(formattedDate); // Push formatted date
  }
}

const soilChartOptions = ref({
  colors: ["#264653", "#386641"],
  series: [
    {
      name: "Humidity",
      color: "#386641",
      data: [],
    },
  ],
  chart: {
    type: "bar",
    height: "450px",
    width: "100%",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
      borderRadiusApplication: "end",
      borderRadius: 6,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },
  states: {
    hover: {
      filter: {
        type: "darken",
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  grid: {
    show: true,
    strokeDashArray: 10,
    padding: {
      left: 2,
      right: 2,
      top: -14,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -25,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
    },
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    show: false,
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      },
    },
  },
  fill: {
    opacity: 1,
  },
});

if (
  document.getElementById("column-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const chart = new ApexCharts(
    document.getElementById("column-chart"),
    soilChartOptions
  );
  chart.render();
}

export {
  soilChartOptions,
  getMaxSoil,
  getMinSoil,
  getSevenLastSoilData,
  formattedSevenLastSoilData,
  maxSoil,
  minSoil,
  formattedMaxSoilFullDate,
  formattedMinSoilFullDate,
};
