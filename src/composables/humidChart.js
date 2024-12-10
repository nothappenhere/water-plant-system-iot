import { ref } from "vue";
import ApexCharts from "apexcharts";
import axios from "axios";
import moment from "moment-timezone";

let maxHumid = ref(null);
// GET maximum temperature
async function getMaxHumid() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/dht/humid/max"
    );
    if (response.data.length > 0) {
      maxHumid.value = response.data[0];

      // Format timestamp untuk maxHumid
      formatTimestamp(maxHumid.value.timestamp, "max");
    } else {
      maxHumid.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let minHumid = ref(null);
// GET minimum temperature
async function getMinHumid() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/dht/humid/min"
    );
    if (response.data.length > 0) {
      minHumid.value = response.data[0];

      // Format timestamp untuk minHumid
      formatTimestamp(minHumid.value.timestamp, "min");
    } else {
      minHumid.value = null;
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let sevenLastHumidData = ref([]);
let formattedSevenLastHumidData = ref([]);
// GET seven last data temperature
async function getSevenLastHumidData() {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/sensors/dht/humid"
    );
    if (response.data.length) {
      sevenLastHumidData.value = response.data;

      // Format data untuk chart
      formattedSevenLastHumidData.value = sevenLastHumidData.value.map(
        (data) => ({
          x: moment(data.timestamp)
            .tz("Asia/Jakarta")
            .format("DD MMM YYYY, HH:mm:ss"),
          y: parseFloat(data.humidity), // Nilai kelembapan
        })
      );
    } else {
      sevenLastHumidData.value = [];
      formattedSevenLastHumidData.value = [];
    }
  } catch (error) {
    console.error("Error fetching API: ", error);
  }
}

let formattedMaxHumidFullDate = ref("");
let formattedMinHumidFullDate = ref("");
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
    formattedMaxHumidFullDate.value = `${day} ${fullMonth} ${year}`;
  } else if (type === "min") {
    formattedMinHumidFullDate.value = `${day} ${fullMonth} ${year}`;
    // formattedMinHumidPartialDate.value = `${day} ${month} ${year}, ${time}`;
  } else if (type === "all") {
    // Format full date and time for each data point
    const formattedDate = `${day} ${month} ${year}, ${time}`;
    formattedSevenLastHumidData.value.push(formattedDate); // Push formatted date
  }
}

const humidChartOptions = ref({
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
    offsetY: -20,
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
    humidChartOptions
  );
  chart.render();
}

export {
  humidChartOptions,
  getMaxHumid,
  getMinHumid,
  getSevenLastHumidData,
  formattedSevenLastHumidData,
  maxHumid,
  minHumid,
  formattedMaxHumidFullDate,
  formattedMinHumidFullDate,
};
